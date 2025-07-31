module.exports = (sequelize, Sequelize) => {
  const Silabo = sequelize.define("silabos", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    asignacion_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    caracterizacion: {
      type: Sequelize.TEXT
    },
    objetivos: {
      type: Sequelize.TEXT
    },
    competencias: {
      type: Sequelize.TEXT
    },
    resultados_actitudinales: {
      type: Sequelize.TEXT
    },
    resultados_cognitivos: {
      type: Sequelize.TEXT
    },
    resultados_procedimentales: {
      type: Sequelize.TEXT
    },
    metodologia: {
      type: Sequelize.TEXT
    },
    procedimientos_docencia: {
      type: Sequelize.STRING(50)
    },
    procedimientos_practicas: {
      type: Sequelize.STRING(50)
    },
    procedimientos_autonomo: {
      type: Sequelize.STRING(50)
    },
    procedimientos_examen: {
      type: Sequelize.STRING(50)
    },
    estado: {
      type: Sequelize.ENUM('borrador', 'enviado', 'aprobado', 'rechazado'),
      defaultValue: 'borrador'
    }
  });

  return Silabo;
}; 