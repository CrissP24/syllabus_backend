const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  port: config.PORT, // Agrega el puerto explícitamente
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  dialectOptions: config.dialectOptions, // Incluye SSL y otras opciones
  retry: config.retry, // Incluye la configuración de reintentos
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos de autenticación
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

// Modelos del sistema académico
db.facultad = require("./facultad.model.js")(sequelize, Sequelize);
db.carrera = require("./carrera.model.js")(sequelize, Sequelize);
db.nivel = require("./nivel.model.js")(sequelize, Sequelize);
db.asignatura = require("./asignatura.model.js")(sequelize, Sequelize);
db.periodoAcademico = require("./periodoAcademico.model.js")(sequelize, Sequelize);
db.asignacionDocente = require("./asignacionDocente.model.js")(sequelize, Sequelize);
db.silabo = require("./silabo.model.js")(sequelize, Sequelize);
db.unidadTematica = require("./unidadTematica.model.js")(sequelize, Sequelize);
db.bibliografia = require("./bibliografia.model.js")(sequelize, Sequelize);
db.visado = require("./visado.model.js")(sequelize, Sequelize);

// Relaciones de autenticación
db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

// Relaciones del sistema académico
// Facultad -> Carrera (1:N)
db.facultad.hasMany(db.carrera, { foreignKey: 'facultad_id' });
db.carrera.belongsTo(db.facultad, { foreignKey: 'facultad_id' });

// Carrera -> Asignatura (1:N)
db.carrera.hasMany(db.asignatura, { foreignKey: 'carrera_id' });
db.asignatura.belongsTo(db.carrera, { foreignKey: 'carrera_id' });

// Nivel -> Asignatura (1:N)
db.nivel.hasMany(db.asignatura, { foreignKey: 'nivel_id' });
db.asignatura.belongsTo(db.nivel, { foreignKey: 'nivel_id' });

// User -> AsignacionDocente (1:N) - Docente
db.user.hasMany(db.asignacionDocente, { foreignKey: 'docente_id' });
db.asignacionDocente.belongsTo(db.user, { foreignKey: 'docente_id' });

// Asignatura -> AsignacionDocente (1:N)
db.asignatura.hasMany(db.asignacionDocente, { foreignKey: 'asignatura_id' });
db.asignacionDocente.belongsTo(db.asignatura, { foreignKey: 'asignatura_id' });

// PeriodoAcademico -> AsignacionDocente (1:N)
db.periodoAcademico.hasMany(db.asignacionDocente, { foreignKey: 'periodo_id' });
db.asignacionDocente.belongsTo(db.periodoAcademico, { foreignKey: 'periodo_id' });

// AsignacionDocente -> Silabo (1:1)
db.asignacionDocente.hasOne(db.silabo, { foreignKey: 'asignacion_id' });
db.silabo.belongsTo(db.asignacionDocente, { foreignKey: 'asignacion_id' });

// Silabo -> UnidadTematica (1:N)
db.silabo.hasMany(db.unidadTematica, { foreignKey: 'silabo_id' });
db.unidadTematica.belongsTo(db.silabo, { foreignKey: 'silabo_id' });

// Silabo -> Bibliografia (1:N)
db.silabo.hasMany(db.bibliografia, { foreignKey: 'silabo_id' });
db.bibliografia.belongsTo(db.silabo, { foreignKey: 'silabo_id' });

// Silabo -> Visado (1:N)
db.silabo.hasMany(db.visado, { foreignKey: 'silabo_id' });
db.visado.belongsTo(db.silabo, { foreignKey: 'silabo_id' });

db.ROLES = [
  "user",
  "admin",
  "moderator",
  "docente",
  "estudiante",
  "operador_sistema",
  "coordinador",
  "secretaria",
  "decano",
  "comision_silabos",
];

module.exports = db;