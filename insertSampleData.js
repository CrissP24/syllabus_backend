const db = require("./app/models");
const User = db.user;
const Role = db.role;
const Facultad = db.facultad;
const Carrera = db.carrera;
const Nivel = db.nivel;
const Asignatura = db.asignatura;
const PeriodoAcademico = db.periodoAcademico;
const AsignacionDocente = db.asignacionDocente;

async function insertSampleData() {
  try {
    console.log("🚀 Iniciando inserción de datos de ejemplo...");

    // Crear roles si no existen
    const roles = [
      { id: 1, name: "user" },
      { id: 2, name: "moderator" },
      { id: 3, name: "admin" },
      { id: 4, name: "docente" },
      { id: 5, name: "estudiante" },
      { id: 6, name: "operador_sistema" },
      { id: 7, name: "coordinador" },
      { id: 8, name: "secretaria" },
      { id: 9, name: "decano" },
      { id: 10, name: "comision_silabos" },
    ];

    for (const role of roles) {
      await Role.findOrCreate({ where: { id: role.id }, defaults: role });
    }
    console.log("✅ Roles creados");

    // Crear facultades
    const facultades = [
      { codigo: 'FCT', nombre: 'Ciencias Técnicas', descripcion: 'Facultad de Ciencias Técnicas' },
      { codigo: 'FCS', nombre: 'Ciencias Sociales', descripcion: 'Facultad de Ciencias Sociales' },
      { codigo: 'FCE', nombre: 'Ciencias Económicas', descripcion: 'Facultad de Ciencias Económicas' },
      { codigo: 'FCA', nombre: 'Ciencias Agropecuarias', descripcion: 'Facultad de Ciencias Agropecuarias' },
    ];

    for (const facultad of facultades) {
      await Facultad.findOrCreate({ where: { codigo: facultad.codigo }, defaults: facultad });
    }
    console.log("✅ Facultades creadas");

    // Crear carreras
    const carreras = [
      { codigo: 'TI', nombre: 'Tecnologías de la Información', descripcion: 'Carrera de Tecnologías de la Información', facultad_id: 1 },
      { codigo: 'SIS', nombre: 'Sistemas de Información', descripcion: 'Carrera de Sistemas de Información', facultad_id: 1 },
      { codigo: 'ADM', nombre: 'Administración de Empresas', descripcion: 'Carrera de Administración de Empresas', facultad_id: 3 },
      { codigo: 'CON', nombre: 'Contabilidad', descripcion: 'Carrera de Contabilidad', facultad_id: 3 },
    ];

    for (const carrera of carreras) {
      await Carrera.findOrCreate({ where: { codigo: carrera.codigo }, defaults: carrera });
    }
    console.log("✅ Carreras creadas");

    // Crear niveles
    const niveles = [
      { codigo: 'N1', nombre: 'Primer Semestre', descripcion: 'Primer nivel académico', orden: 1 },
      { codigo: 'N2', nombre: 'Segundo Semestre', descripcion: 'Segundo nivel académico', orden: 2 },
      { codigo: 'N3', nombre: 'Tercer Semestre', descripcion: 'Tercer nivel académico', orden: 3 },
      { codigo: 'N4', nombre: 'Cuarto Semestre', descripcion: 'Cuarto nivel académico', orden: 4 },
      { codigo: 'N5', nombre: 'Quinto Semestre', descripcion: 'Quinto nivel académico', orden: 5 },
      { codigo: 'N6', nombre: 'Sexto Semestre', descripcion: 'Sexto nivel académico', orden: 6 },
      { codigo: 'N7', nombre: 'Séptimo Semestre', descripcion: 'Séptimo nivel académico', orden: 7 },
      { codigo: 'N8', nombre: 'Octavo Semestre', descripcion: 'Octavo nivel académico', orden: 8 },
    ];

    for (const nivel of niveles) {
      await Nivel.findOrCreate({ where: { codigo: nivel.codigo }, defaults: nivel });
    }
    console.log("✅ Niveles creados");

    // Crear asignaturas
    const asignaturas = [
      { codigo: 'TI001', nombre: 'Fundamentos de Programación', descripcion: 'Introducción a la programación básica', creditos: 4, horas_teoricas: 32, horas_practicas: 32, horas_autonomas: 64, carrera_id: 1, nivel_id: 1 },
      { codigo: 'TI002', nombre: 'Programación II', descripcion: 'Programación orientada a objetos', creditos: 4, horas_teoricas: 32, horas_practicas: 32, horas_autonomas: 64, carrera_id: 1, nivel_id: 2 },
      { codigo: 'TI003', nombre: 'Bases de Datos', descripcion: 'Diseño y gestión de bases de datos', creditos: 4, horas_teoricas: 32, horas_practicas: 32, horas_autonomas: 64, carrera_id: 1, nivel_id: 3 },
      { codigo: 'TI004', nombre: 'Programación Avanzada', descripcion: 'Programación avanzada y patrones de diseño', creditos: 4, horas_teoricas: 32, horas_practicas: 32, horas_autonomas: 64, carrera_id: 1, nivel_id: 4 },
      { codigo: 'SIS001', nombre: 'Sistemas Operativos', descripcion: 'Fundamentos de sistemas operativos', creditos: 4, horas_teoricas: 32, horas_practicas: 32, horas_autonomas: 64, carrera_id: 2, nivel_id: 1 },
      { codigo: 'SIS002', nombre: 'Redes de Computadoras', descripcion: 'Fundamentos de redes y comunicaciones', creditos: 4, horas_teoricas: 32, horas_practicas: 32, horas_autonomas: 64, carrera_id: 2, nivel_id: 2 },
    ];

    for (const asignatura of asignaturas) {
      await Asignatura.findOrCreate({ where: { codigo: asignatura.codigo }, defaults: asignatura });
    }
    console.log("✅ Asignaturas creadas");

    // Crear períodos académicos
    const periodos = [
      { codigo: 'PI2025', nombre: 'Primer Período 2025', fecha_inicio: '2025-01-15', fecha_fin: '2025-07-15', estado: 'activo' },
      { codigo: 'PII2025', nombre: 'Segundo Período 2025', fecha_inicio: '2025-07-16', fecha_fin: '2025-12-15', estado: 'activo' },
      { codigo: 'PI2026', nombre: 'Primer Período 2026', fecha_inicio: '2026-01-15', fecha_fin: '2026-07-15', estado: 'activo' },
      { codigo: 'PII2026', nombre: 'Segundo Período 2026', fecha_inicio: '2026-07-16', fecha_fin: '2026-12-15', estado: 'activo' },
    ];

    for (const periodo of periodos) {
      await PeriodoAcademico.findOrCreate({ where: { codigo: periodo.codigo }, defaults: periodo });
    }
    console.log("✅ Períodos académicos creados");

    // Crear usuario docente de ejemplo
    const bcrypt = require("bcryptjs");
    const docenteUser = await User.findOrCreate({
      where: { email: 'docente@unesum.edu.ec' },
      defaults: {
        username: 'docente',
        email: 'docente@unesum.edu.ec',
        password: bcrypt.hashSync('password123', 8)
      }
    });

    // Asignar rol de docente
    const docenteRole = await Role.findOne({ where: { name: 'docente' } });
    if (docenteUser[0] && docenteRole) {
      await docenteUser[0].setRoles([docenteRole]);
    }
    console.log("✅ Usuario docente creado");

    // Crear asignaciones de ejemplo para el docente
    const asignaciones = [
      { docente_id: docenteUser[0].id, asignatura_id: 1, periodo_id: 1, paralelo: 'A' },
      { docente_id: docenteUser[0].id, asignatura_id: 2, periodo_id: 1, paralelo: 'B' },
      { docente_id: docenteUser[0].id, asignatura_id: 3, periodo_id: 2, paralelo: 'A' },
    ];

    for (const asignacion of asignaciones) {
      await AsignacionDocente.findOrCreate({
        where: {
          docente_id: asignacion.docente_id,
          asignatura_id: asignacion.asignatura_id,
          periodo_id: asignacion.periodo_id,
          paralelo: asignacion.paralelo
        },
        defaults: asignacion
      });
    }
    console.log("✅ Asignaciones de docente creadas");

    console.log("🎉 ¡Datos de ejemplo insertados exitosamente!");
    console.log("📧 Usuario docente: docente@unesum.edu.ec");
    console.log("🔑 Contraseña: password123");

  } catch (error) {
    console.error("❌ Error al insertar datos:", error);
  } finally {
    process.exit(0);
  }
}

// Ejecutar el script
insertSampleData(); 