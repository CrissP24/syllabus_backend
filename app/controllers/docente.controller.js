const db = require("../models");
const User = db.user;
const AsignacionDocente = db.asignacionDocente;
const Asignatura = db.asignatura;
const Carrera = db.carrera;
const Facultad = db.facultad;
const Nivel = db.nivel;
const PeriodoAcademico = db.periodoAcademico;
const Silabo = db.silabo;
const UnidadTematica = db.unidadTematica;
const Bibliografia = db.bibliografia;
const Visado = db.visado;

// Obtener asignaciones del docente
exports.getAsignacionesDocente = async (req, res) => {
  try {
    const docenteId = req.userId; // Viene del middleware de autenticación

    const asignaciones = await AsignacionDocente.findAll({
      where: { 
        docente_id: docenteId,
        estado: 'activo'
      },
      include: [
        {
          model: Asignatura,
          include: [
            {
              model: Carrera,
              include: [Facultad]
            },
            {
              model: Nivel
            }
          ]
        },
        {
          model: PeriodoAcademico
        },
        {
          model: Silabo,
          include: [
            {
              model: Visado
            }
          ]
        }
      ],
      order: [
        [PeriodoAcademico, 'fecha_inicio', 'DESC'],
        [Asignatura, 'nombre', 'ASC']
      ]
    });

    res.status(200).json(asignaciones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener una asignación específica del docente
exports.getAsignacionById = async (req, res) => {
  try {
    const docenteId = req.userId;
    const asignacionId = req.params.id;

    const asignacion = await AsignacionDocente.findOne({
      where: { 
        id: asignacionId,
        docente_id: docenteId,
        estado: 'activo'
      },
      include: [
        {
          model: Asignatura,
          include: [
            {
              model: Carrera,
              include: [Facultad]
            },
            {
              model: Nivel
            }
          ]
        },
        {
          model: PeriodoAcademico
        },
        {
          model: Silabo,
          include: [
            {
              model: UnidadTematica,
              order: [['orden', 'ASC']]
            },
            {
              model: Bibliografia,
              order: [['tipo', 'ASC'], ['orden', 'ASC']]
            },
            {
              model: Visado
            }
          ]
        }
      ]
    });

    if (!asignacion) {
      return res.status(404).json({ message: "Asignación no encontrada" });
    }

    res.status(200).json(asignacion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener sílabo de una asignación
exports.getSilabo = async (req, res) => {
  try {
    const docenteId = req.userId;
    const asignacionId = req.params.asignacionId;

    // Verificar que la asignación pertenece al docente
    const asignacion = await AsignacionDocente.findOne({
      where: { 
        id: asignacionId,
        docente_id: docenteId,
        estado: 'activo'
      }
    });

    if (!asignacion) {
      return res.status(404).json({ message: "Asignación no encontrada" });
    }

    const silabo = await Silabo.findOne({
      where: { asignacion_id: asignacionId },
      include: [
        {
          model: UnidadTematica,
          order: [['orden', 'ASC']]
        },
        {
          model: Bibliografia,
          order: [['tipo', 'ASC'], ['orden', 'ASC']]
        },
        {
          model: Visado
        }
      ]
    });

    res.status(200).json(silabo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear o actualizar sílabo
exports.saveSilabo = async (req, res) => {
  try {
    const docenteId = req.userId;
    const asignacionId = req.params.asignacionId;
    const silaboData = req.body;

    // Verificar que la asignación pertenece al docente
    const asignacion = await AsignacionDocente.findOne({
      where: { 
        id: asignacionId,
        docente_id: docenteId,
        estado: 'activo'
      }
    });

    if (!asignacion) {
      return res.status(404).json({ message: "Asignación no encontrada" });
    }

    // Buscar sílabo existente o crear uno nuevo
    let silabo = await Silabo.findOne({
      where: { asignacion_id: asignacionId }
    });

    if (silabo) {
      // Actualizar sílabo existente
      await silabo.update(silaboData);
    } else {
      // Crear nuevo sílabo
      silabo = await Silabo.create({
        ...silaboData,
        asignacion_id: asignacionId
      });
    }

    // Manejar unidades temáticas
    if (silaboData.unidades) {
      // Eliminar unidades existentes
      await UnidadTematica.destroy({
        where: { silabo_id: silabo.id }
      });

      // Crear nuevas unidades
      for (let i = 0; i < silaboData.unidades.length; i++) {
        await UnidadTematica.create({
          silabo_id: silabo.id,
          nombre: silaboData.unidades[i].nombre,
          descripcion: silaboData.unidades[i].descripcion,
          orden: i + 1
        });
      }
    }

    // Manejar bibliografía
    if (silaboData.bibliografia) {
      // Eliminar bibliografía existente
      await Bibliografia.destroy({
        where: { silabo_id: silabo.id }
      });

      // Crear nueva bibliografía básica
      if (silaboData.bibliografia.basica) {
        for (let i = 0; i < silaboData.bibliografia.basica.length; i++) {
          if (silaboData.bibliografia.basica[i].trim()) {
            await Bibliografia.create({
              silabo_id: silabo.id,
              tipo: 'basica',
              referencia: silaboData.bibliografia.basica[i],
              orden: i + 1
            });
          }
        }
      }

      // Crear nueva bibliografía complementaria
      if (silaboData.bibliografia.complementaria) {
        for (let i = 0; i < silaboData.bibliografia.complementaria.length; i++) {
          if (silaboData.bibliografia.complementaria[i].trim()) {
            await Bibliografia.create({
              silabo_id: silabo.id,
              tipo: 'complementaria',
              referencia: silaboData.bibliografia.complementaria[i],
              orden: i + 1
            });
          }
        }
      }
    }

    // Obtener el sílabo actualizado con todas sus relaciones
    const silaboActualizado = await Silabo.findOne({
      where: { id: silabo.id },
      include: [
        {
          model: UnidadTematica,
          order: [['orden', 'ASC']]
        },
        {
          model: Bibliografia,
          order: [['tipo', 'ASC'], ['orden', 'ASC']]
        },
        {
          model: Visado
        }
      ]
    });

    res.status(200).json({
      message: "Sílabo guardado exitosamente",
      silabo: silaboActualizado
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Enviar sílabo para revisión
exports.enviarSilabo = async (req, res) => {
  try {
    const docenteId = req.userId;
    const asignacionId = req.params.asignacionId;

    // Verificar que la asignación pertenece al docente
    const asignacion = await AsignacionDocente.findOne({
      where: { 
        id: asignacionId,
        docente_id: docenteId,
        estado: 'activo'
      }
    });

    if (!asignacion) {
      return res.status(404).json({ message: "Asignación no encontrada" });
    }

    const silabo = await Silabo.findOne({
      where: { asignacion_id: asignacionId }
    });

    if (!silabo) {
      return res.status(404).json({ message: "Sílabo no encontrado" });
    }

    // Cambiar estado a 'enviado'
    await silabo.update({ estado: 'enviado' });

    res.status(200).json({ 
      message: "Sílabo enviado para revisión exitosamente",
      silabo: silabo
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener estadísticas del docente
exports.getEstadisticasDocente = async (req, res) => {
  try {
    const docenteId = req.userId;

    const estadisticas = await AsignacionDocente.findAll({
      where: { 
        docente_id: docenteId,
        estado: 'activo'
      },
      include: [
        {
          model: Silabo,
          attributes: ['estado']
        }
      ]
    });

    const totalAsignaciones = estadisticas.length;
    const silabosBorrador = estadisticas.filter(a => a.silabo && a.silabo.estado === 'borrador').length;
    const silabosEnviados = estadisticas.filter(a => a.silabo && a.silabo.estado === 'enviado').length;
    const silabosAprobados = estadisticas.filter(a => a.silabo && a.silabo.estado === 'aprobado').length;
    const silabosRechazados = estadisticas.filter(a => a.silabo && a.silabo.estado === 'rechazado').length;
    const sinSilabo = estadisticas.filter(a => !a.silabo).length;

    res.status(200).json({
      totalAsignaciones,
      silabosBorrador,
      silabosEnviados,
      silabosAprobados,
      silabosRechazados,
      sinSilabo
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 