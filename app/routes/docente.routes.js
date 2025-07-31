const { authJwt } = require("../middleware");
const controller = require("../controllers/docente.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  // Rutas para docentes (requieren autenticación y rol de docente)
  app.get("/api/docente/asignaciones", [authJwt.verifyToken, authJwt.isDocente], controller.getAsignacionesDocente);
  
  app.get("/api/docente/asignaciones/:id", [authJwt.verifyToken, authJwt.isDocente], controller.getAsignacionById);
  
  app.get("/api/docente/asignaciones/:asignacionId/silabo", [authJwt.verifyToken, authJwt.isDocente], controller.getSilabo);
  
  app.post("/api/docente/asignaciones/:asignacionId/silabo", [authJwt.verifyToken, authJwt.isDocente], controller.saveSilabo);
  
  app.put("/api/docente/asignaciones/:asignacionId/silabo", [authJwt.verifyToken, authJwt.isDocente], controller.saveSilabo);
  
  app.post("/api/docente/asignaciones/:asignacionId/enviar", [authJwt.verifyToken, authJwt.isDocente], controller.enviarSilabo);
  
  app.get("/api/docente/estadisticas", [authJwt.verifyToken, authJwt.isDocente], controller.getEstadisticasDocente);
}; 