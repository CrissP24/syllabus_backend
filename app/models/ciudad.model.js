module.exports = (sequelize, Sequelize) => {
  const Ciudad = sequelize.define("ciudades", {
    id: {
      type: Sequelize.STRING(10),
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    tipo: {
      type: Sequelize.ENUM('Capital', 'Ciudad', 'Pueblo'),
      defaultValue: 'Ciudad'
    },
    provincia_id: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    estado: {
      type: Sequelize.ENUM('activo', 'inactivo'),
      defaultValue: 'activo'
    }
  });

  return Ciudad;
}; 