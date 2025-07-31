module.exports = (sequelize, Sequelize) => {
  const Nivel = sequelize.define("niveles", {
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
      type: Sequelize.STRING(50),
      allowNull: false
    },
    descripcion: {
      type: Sequelize.TEXT
    },
    orden: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    estado: {
      type: Sequelize.ENUM('activo', 'inactivo'),
      defaultValue: 'activo'
    }
  });

  return Nivel;
}; 