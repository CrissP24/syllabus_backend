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

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

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