module.exports = {
  HOST: "dpg-cvkrgi3e5dus73bt6ji0-a.oregon-postgres.render.com",
  USER: "root", // Reemplaza "root" con el usuario correcto si es diferente
  PASSWORD: "LIfjDoBnekl6DK1m2I6s2jJbeRs9LTnk",
  DB: "syllabus_41et",
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