const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["https://syllabus-frontend-gj45.vercel.app", "http://localhost:8081"], // Agrega la URL de tu frontend en producción y en local
  credentials: true, // Si manejas cookies o sesiones
};

app.use(cors(corsOptions));

const db = require("./app/models");
const Role = db.role;

// Prueba la conexión antes de sincronizar
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
    // Sincronizar solo si la conexión funciona
    return db.sequelize.sync();
  })
  .then(() => {
    console.log("Database synced");
    Role.count().then((count) => {
      if (count === 0) {
        initial();
      }
    });
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
    process.exit(1); // Termina el proceso si falla la conexión
  });

function initial() {
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

  roles.forEach((role) => {
    Role.create(role).catch((err) => {
      console.error("Error creating role:", err);
    });
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
