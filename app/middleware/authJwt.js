const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }
    
    return res.status(403).send({
      message: "Require Admin Role!"
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message
    });
  }
};

isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        return next();
      }
    }
    
    return res.status(403).send({
      message: "Require Moderator Role!"
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message
    });
  }
};

isModeratorOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        return next();
      }
      
      if (roles[i].name === "admin") {
        return next();
      }
    }
    
    return res.status(403).send({
      message: "Require Moderator or Admin Role!"
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message
    });
  }
};

isDocente = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "docente") {
        return next();
      }
    }
    
    return res.status(403).send({
      message: "Require Docente Role!"
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message
    });
  }
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
  isModeratorOrAdmin,
  isDocente,
  isEstudiante,
  isOperadorSistema,
  isCoordinador,       // Agregado
  isSecretaria,        // Agregado
  isDecano,            // Agregado
  isComisionSilabos    // Agregado
};

module.exports = authJwt;
