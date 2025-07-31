module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING(80),
      unique: true
    },
    email: {
      type: Sequelize.STRING(120),
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(120),
      allowNull: false
    },
    // Datos personales
    nombres: {
      type: Sequelize.STRING(100)
    },
    apellidos: {
      type: Sequelize.STRING(100)
    },
    cedula: {
      type: Sequelize.STRING(15),
      unique: true
    },
    telefono: {
      type: Sequelize.STRING(20)
    },
    direccion: {
      type: Sequelize.TEXT
    },
    // Asignaciones geográficas
    pais_id: {
      type: Sequelize.STRING(3)
    },
    provincia_id: {
      type: Sequelize.STRING(10)
    },
    ciudad_id: {
      type: Sequelize.STRING(10)
    },
    // Asignaciones académicas
    universidad_id: {
      type: Sequelize.STRING(20)
    },
    facultad_id: {
      type: Sequelize.STRING(10)
    },
    carrera_id: {
      type: Sequelize.STRING(10)
    },
    // Datos profesionales
    titulo_profesional: {
      type: Sequelize.STRING(200)
    },
    especialidad: {
      type: Sequelize.STRING(200)
    },
    experiencia_anos: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    // Estado del usuario
    estado: {
      type: Sequelize.ENUM('activo', 'inactivo', 'pendiente'),
      defaultValue: 'activo'
    },
    fecha_registro: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    ultimo_acceso: {
      type: Sequelize.DATE
    }
  });

  return User;
};
