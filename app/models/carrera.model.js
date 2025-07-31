module.exports = (sequelize, Sequelize) => {
  const Carrera = sequelize.define("carreras", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigo: {
      type: Sequelize.STRING(10),
      unique: true,
      allowNull: false
    },
    nombre: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: Sequelize.TEXT
    },
    facultad_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    estado: {
      type: Sequelize.ENUM('activo', 'inactivo'),
      defaultValue: 'activo'
    }
  });

  return Carrera;
}; 