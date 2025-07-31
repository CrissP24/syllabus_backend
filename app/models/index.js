const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  port: config.PORT,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  dialectOptions: config.dialectOptions,
  retry: config.retry,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos de autenticación
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

// Modelos geográficos
db.pais = require("./pais.model.js")(sequelize, Sequelize);
db.provincia = require("./provincia.model.js")(sequelize, Sequelize);
db.ciudad = require("./ciudad.model.js")(sequelize, Sequelize);

// Modelos académicos
db.universidad = require("./universidad.model.js")(sequelize, Sequelize);
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

// Relaciones geográficas
// País -> Provincia (1:N)
db.pais.hasMany(db.provincia, { foreignKey: 'pais_id' });
db.provincia.belongsTo(db.pais, { foreignKey: 'pais_id' });

// Provincia -> Ciudad (1:N)
db.provincia.hasMany(db.ciudad, { foreignKey: 'provincia_id' });
db.ciudad.belongsTo(db.provincia, { foreignKey: 'provincia_id' });

// Ciudad -> Universidad (1:N)
db.ciudad.hasMany(db.universidad, { foreignKey: 'ciudad_id' });
db.universidad.belongsTo(db.ciudad, { foreignKey: 'ciudad_id' });

// Relaciones académicas
// Universidad -> Facultad (1:N)
db.universidad.hasMany(db.facultad, { foreignKey: 'universidad_id' });
db.facultad.belongsTo(db.universidad, { foreignKey: 'universidad_id' });

// Facultad -> Carrera (1:N)
db.facultad.hasMany(db.carrera, { foreignKey: 'facultad_id' });
db.carrera.belongsTo(db.facultad, { foreignKey: 'facultad_id' });

// Carrera -> Asignatura (1:N)
db.carrera.hasMany(db.asignatura, { foreignKey: 'carrera_id' });
db.asignatura.belongsTo(db.carrera, { foreignKey: 'carrera_id' });

// Nivel -> Asignatura (1:N)
db.nivel.hasMany(db.asignatura, { foreignKey: 'nivel_id' });
db.asignatura.belongsTo(db.nivel, { foreignKey: 'nivel_id' });

// Relaciones de usuario con datos geográficos y académicos
// User -> País (N:1)
db.user.belongsTo(db.pais, { foreignKey: 'pais_id', as: 'pais' });
db.pais.hasMany(db.user, { foreignKey: 'pais_id' });

// User -> Provincia (N:1)
db.user.belongsTo(db.provincia, { foreignKey: 'provincia_id', as: 'provincia' });
db.provincia.hasMany(db.user, { foreignKey: 'provincia_id' });

// User -> Ciudad (N:1)
db.user.belongsTo(db.ciudad, { foreignKey: 'ciudad_id', as: 'ciudad' });
db.ciudad.hasMany(db.user, { foreignKey: 'ciudad_id' });

// User -> Universidad (N:1)
db.user.belongsTo(db.universidad, { foreignKey: 'universidad_id', as: 'universidad' });
db.universidad.hasMany(db.user, { foreignKey: 'universidad_id' });

// User -> Facultad (N:1)
db.user.belongsTo(db.facultad, { foreignKey: 'facultad_id', as: 'facultad' });
db.facultad.hasMany(db.user, { foreignKey: 'facultad_id' });

// User -> Carrera (N:1)
db.user.belongsTo(db.carrera, { foreignKey: 'carrera_id', as: 'carrera' });
db.carrera.hasMany(db.user, { foreignKey: 'carrera_id' });

// Relaciones del sistema de sílabos
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