module.exports = (sequelize, Sequelize) => {
  const PeriodoAcademico = sequelize.define("periodos_academicos", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigo: {
      type: Sequelize.STRING(20),
      unique: true,
      allowNull: false
    },
    nombre: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    fecha_inicio: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    fecha_fin: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    estado: {
      type: Sequelize.ENUM('activo', 'inactivo', 'finalizado'),
      defaultValue: 'activo'
    }
  });

  return PeriodoAcademico;
}; 