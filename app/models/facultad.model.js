module.exports = (sequelize, Sequelize) => {
  const Facultad = sequelize.define("facultades", {
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
    estado: {
      type: Sequelize.ENUM('activo', 'inactivo'),
      defaultValue: 'activo'
    }
  });

  return Facultad;
}; 