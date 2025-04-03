const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({ message: "Require Admin Role!" });
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({ message: "Require Moderator Role!" });
    });
  });
};

isDocente = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "docente") {
          next();
          return;
        }
      }

      res.status(403).send({ message: "Require Docente Role!" });
    });
  });
};

isEstudiante = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "estudiante") {
          next();
          return;
        }
      }

      res.status(403).send({ message: "Require Estudiante Role!" });
    });
  });
};

isOperadorSistema = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "operador_sistema") {
          next();
          return;
        }
      }

      res.status(403).send({ message: "Require Operador del Sistema Role!" });
    });
  });
};
isCoordinador = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "coordinador") {
          next();
          return;
        }
      }
      res.status(403).send({ message: "Require Coordinador Role!" });
    });
  });
};

isSecretaria = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "secretaria") {
          next();
          return;
        }
      }
      res.status(403).send({ message: "Require Secretaria Role!" });
    });
  });
};

isDecano = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "decano") {
          next();
          return;
        }
      }
      res.status(403).send({ message: "Require Decano Role!" });
    });
  });
};
isComisionSilabos = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "comision_silabos") {
          next();
          return;
        }
      }
      res.status(403).send({ message: "Require Comision de Silabos Role!" });
    });
  });
};


const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isDocente,
  isEstudiante,
  isOperadorSistema,
  isCoordinador,       // Agregado
  isSecretaria,        // Agregado
  isDecano,            // Agregado
  isComisionSilabos    // Agregado
};

module.exports = authJwt;
