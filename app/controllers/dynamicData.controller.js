const db = require("../models");
const externalAPIs = require("../services/externalAPIs.service");
const User = db.user;
const Universidad = db.universidad;
const Facultad = db.facultad;
const Carrera = db.carrera;
const Asignatura = db.asignatura;
const PeriodoAcademico = db.periodoAcademico;
const Nivel = db.nivel;

// Obtener universidades desde API externa
exports.getUniversities = async (req, res) => {
  try {
    const universities = await externalAPIs.getUniversities();
    
    // Guardar en base de datos para cache
    for (const university of universities) {
      await Universidad.findOrCreate({
        where: { id: university.id },
        defaults: {
          nombre: university.name,
          tipo: university.type,
          siglas: university.acronym,
          ciudad_id: university.city
        }
      });
    }

    res.status(200).json(universities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener facultades por universidad desde API
exports.getFacultiesByUniversity = async (req, res) => {
  try {
    const { universityId } = req.params;
    const faculties = await externalAPIs.getFacultiesByUniversity(universityId);
    
    // Guardar en base de datos
    for (const faculty of faculties) {
      await Facultad.findOrCreate({
        where: { id: faculty.id },
        defaults: {
          nombre: faculty.name,
          descripcion: faculty.description,
          universidad_id: universityId
        }
      });
    }

    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener carreras por facultad desde API
exports.getCareersByFaculty = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const careers = await externalAPIs.getCareersByFaculty(facultyId);
    
    // Guardar en base de datos
    for (const career of careers) {
      await Carrera.findOrCreate({
        where: { id: career.id },
        defaults: {
          nombre: career.name,
          descripcion: career.description,
          facultad_id: facultyId
        }
      });
    }

    res.status(200).json(careers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener materias por carrera desde API
exports.getSubjectsByCareer = async (req, res) => {
  try {
    const { careerId } = req.params;
    const subjects = await externalAPIs.getSubjectsByCareer(careerId);
    
    // Guardar en base de datos
    for (const subject of subjects) {
      await Asignatura.findOrCreate({
        where: { id: subject.id },
        defaults: {
          nombre: subject.name,
          creditos: subject.credits,
          horas_teoricas: subject.hours / 2,
          horas_practicas: subject.hours / 2,
          horas_autonomas: subject.hours,
          carrera_id: careerId,
          nivel_id: subject.level
        }
      });
    }

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener períodos académicos desde API
exports.getAcademicPeriods = async (req, res) => {
  try {
    const periods = await externalAPIs.getAcademicPeriods();
    
    // Guardar en base de datos
    for (const period of periods) {
      await PeriodoAcademico.findOrCreate({
        where: { codigo: period.code },
        defaults: {
          nombre: period.name,
          fecha_inicio: period.startDate,
          fecha_fin: period.endDate,
          estado: period.status
        }
      });
    }

    res.status(200).json(periods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener niveles académicos desde API
exports.getAcademicLevels = async (req, res) => {
  try {
    const levels = await externalAPIs.getAcademicLevels();
    
    // Guardar en base de datos
    for (const level of levels) {
      await Nivel.findOrCreate({
        where: { codigo: level.code },
        defaults: {
          nombre: level.name,
          descripcion: level.description,
          orden: level.order
        }
      });
    }

    res.status(200).json(levels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar asignaciones académicas de usuario
exports.updateUserAcademicAssignments = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      universidad_id,
      facultad_id,
      carrera_id
    } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Validar que las asignaciones sean coherentes
    if (facultad_id && !universidad_id) {
      return res.status(400).json({ message: "Debe seleccionar una universidad primero" });
    }

    if (carrera_id && !facultad_id) {
      return res.status(400).json({ message: "Debe seleccionar una facultad primero" });
    }

    // Actualizar usuario
    await user.update({
      universidad_id,
      facultad_id,
      carrera_id
    });

    res.status(200).json({
      message: "Asignaciones académicas actualizadas exitosamente",
      user: {
        id: user.id,
        email: user.email,
        nombres: user.nombres,
        apellidos: user.apellidos,
        universidad_id: user.universidad_id,
        facultad_id: user.facultad_id,
        carrera_id: user.carrera_id
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener asignaciones académicas completas de un usuario
exports.getUserAcademicAssignments = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: [
        { model: Universidad, as: 'universidad' },
        { model: Facultad, as: 'facultad' },
        { model: Carrera, as: 'carrera' }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sincronizar datos desde APIs externas
exports.syncFromExternalAPIs = async (req, res) => {
  try {
    console.log("🔄 Iniciando sincronización desde APIs externas...");

    const result = await externalAPIs.syncFromExternalAPIs();

    res.status(200).json({
      message: "Datos sincronizados exitosamente desde APIs externas",
      summary: result
    });
  } catch (error) {
    console.error("❌ Error en sincronización:", error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las asignaturas disponibles para un docente
exports.getAvailableSubjectsForTeacher = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByPk(userId, {
      include: [
        { model: Carrera, as: 'carrera' }
      ]
    });

    if (!user || !user.carrera_id) {
      return res.status(404).json({ message: "Usuario no tiene carrera asignada" });
    }

    // Obtener asignaturas de la carrera del docente
    const subjects = await Asignatura.findAll({
      where: { 
        carrera_id: user.carrera_id,
        estado: 'activo'
      },
      include: [
        { model: Carrera, as: 'carrera' },
        { model: Nivel, as: 'nivel' }
      ],
      order: [['nivel_id', 'ASC']]
    });

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 