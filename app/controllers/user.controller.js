exports.allAccess = (req, res) => {
  res.status(200).send("Contenido Publico.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Contenido de Usuario.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Contenido de Administrador.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Contenido de Moderador.");
};

exports.docenteBoard = (req, res) => {
  res.status(200).send("Contenido de Docente.");
};

exports.estudianteBoard = (req, res) => {
  res.status(200).send("Contenido de Estudiante.");
};

exports.operadorSistemaBoard = (req, res) => {
  res.status(200).send("Contenido de Operador del Sistema.");
};

exports.coordinadorBoard = (req, res) => {
  res.status(200).send("Contenido de Coordinador.");
};

exports.secretariaBoard = (req, res) => {
  res.status(200).send("Contenido de Secretaria.");
};

exports.decanoBoard = (req, res) => {
  res.status(200).send("Contenido de Decano.");
};

exports.comisionSilabosBoard = (req, res) => {
  res.status(200).send("Contenido de comisión de silabos.");
};
