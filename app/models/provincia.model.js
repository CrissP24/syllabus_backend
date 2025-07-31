module.exports = (sequelize, Sequelize) => {
  const Provincia = sequelize.define("provincias", {
    id: {
      type: Sequelize.STRING(10),
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    capital: {
      type: Sequelize.STRING(100)
    },
    region: {
      type: Sequelize.STRING(50)
    },
    pais_id: {
      type: Sequelize.STRING(3),
      allowNull: false
    },
    estado: {
      type: Sequelize.ENUM('activo', 'inactivo'),
      defaultValue: 'activo'
    }
  });

  return Provincia;
}; 