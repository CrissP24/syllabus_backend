module.exports = (sequelize, Sequelize) => {
  const UnidadTematica = sequelize.define("unidades_tematicas", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    silabo_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    nombre: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: Sequelize.TEXT
    },
    orden: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  return UnidadTematica;
}; 