module.exports = (sequelize, Sequelize) => {
  const Bibliografia = sequelize.define("bibliografia", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    silabo_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    tipo: {
      type: Sequelize.ENUM('basica', 'complementaria'),
      allowNull: false
    },
    referencia: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    orden: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  return Bibliografia;
}; 