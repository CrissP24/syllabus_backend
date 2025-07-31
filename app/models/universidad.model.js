module.exports = (sequelize, Sequelize) => {
  const Universidad = sequelize.define("universidades", {
    id: {
      type: Sequelize.STRING(20),
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    tipo: {
      type: Sequelize.ENUM('Pública', 'Privada'),
      allowNull: false
    },
    siglas: {
      type: Sequelize.STRING(20)
    },
    ciudad_id: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    estado: {
      type: Sequelize.ENUM('activo', 'inactivo'),
      defaultValue: 'activo'
    }
  });

  return Universidad;
}; 