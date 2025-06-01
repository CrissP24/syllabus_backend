module.exports = {
  HOST: "ep-royal-sound-acuhwauy-pooler.sa-east-1.aws.neon.tech",
  USER: "syllabus2025_owner", // Reemplaza "root" con el usuario correcto si es diferente
  PASSWORD: "npg_9dZ3ouCacVhN",
  DB: "syllabus2025",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 60000, // 60 segundos para adquirir conexión
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    keepAlive: true,
    connectTimeout: 120000,
  },
  retry: { // Agrega reintentos en caso de fallo
    match: [
      /ECONNRESET/,
      /ETIMEDOUT/,
      /Connection terminated unexpectedly/,
    ],
    max: 5, // Reintenta 5 veces
  },
  PORT: 5432, // Agrega el puerto de conexión
};