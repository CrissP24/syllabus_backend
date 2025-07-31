module.exports = (sequelize, Sequelize) => {
  const Visado = sequelize.define("visados", {
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
      type: Sequelize.ENUM('decano', 'director', 'coordinador', 'docente'),
      allowNull: false
    },
    nombre_responsable: {
      type: Sequelize.STRING(100)
    },
    fecha_visado: {
      type: Sequelize.DATEONLY
    },
    qr_code: {
      type: Sequelize.TEXT
    },
    estado: {
      type: Sequelize.ENUM('pendiente', 'aprobado', 'rechazado'),
      defaultValue: 'pendiente'
    },
    observaciones: {
      type: Sequelize.TEXT
    }
  });

  return Visado;
}; 