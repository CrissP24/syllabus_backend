module.exports = (sequelize, Sequelize) => {
  const AsignacionDocente = sequelize.define("asignaciones_docente", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    docente_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    asignatura_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    periodo_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    paralelo: {
      type: Sequelize.STRING(10),
      defaultValue: 'A'
    },
    estado: {
      type: Sequelize.ENUM('activo', 'inactivo'),
      defaultValue: 'activo'
    }
  });

  return AsignacionDocente;
}; 