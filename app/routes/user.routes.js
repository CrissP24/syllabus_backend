const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get("/api/test/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);

  app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

  app.get("/api/test/docente", [authJwt.verifyToken, authJwt.isDocente], controller.docenteBoard);

  app.get("/api/test/estudiante", [authJwt.verifyToken, authJwt.isEstudiante], controller.estudianteBoard);

  app.get("/api/test/operador_sistema", [authJwt.verifyToken, authJwt.isOperadorSistema], controller.operadorSistemaBoard);
  
  app.get("/api/test/coordinador", [authJwt.verifyToken, authJwt.isCoordinador], controller.coordinadorBoard);

  app.get("/api/test/secretaria", [authJwt.verifyToken, authJwt.isSecretaria], controller.secretariaBoard);
  
  app.get("/api/test/decano", [authJwt.verifyToken, authJwt.isDecano], controller.decanoBoard);
  
  app.get("/api/test/comision_silabos", [authJwt.verifyToken, authJwt.isComisionSilabos], controller.comisionSilabosBoard);
  
};
