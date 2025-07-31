module.exports = (sequelize, Sequelize) => {
  const Asignatura = sequelize.define("asignaturas", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigo: {
      type: Sequelize.STRING(20),
      unique: true,
      allowNull: false
    },
    nombre: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    descripcion: {
      type: Sequelize.TEXT
    },
    creditos: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    horas_teoricas: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    horas_practicas: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    horas_autonomas: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    carrera_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    nivel_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    estado: {
      type: Sequelize.ENUM('activo', 'inactivo'),
      defaultValue: 'activo'
    }
  });

  return Asignatura;
}; 