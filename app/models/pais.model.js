module.exports = (sequelize, Sequelize) => {
  const Pais = sequelize.define("paises", {
    id: {
      type: Sequelize.STRING(3),
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    bandera: {
      type: Sequelize.STRING(10)
    },
    region: {
      type: Sequelize.STRING(50)
    },
    capital: {
      type: Sequelize.STRING(100)
    },
    estado: {
      type: Sequelize.ENUM('activo', 'inactivo'),
      defaultValue: 'activo'
    }
  });

  return Pais;
}; 