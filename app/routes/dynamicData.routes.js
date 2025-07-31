const { authJwt } = require("../middleware");
const controller = require("../controllers/dynamicData.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  // Rutas públicas para obtener datos académicos desde APIs externas
  app.get("/api/dynamic/universities", controller.getUniversities);
  app.get("/api/dynamic/universities/:universityId/faculties", controller.getFacultiesByUniversity);
  app.get("/api/dynamic/faculties/:facultyId/careers", controller.getCareersByFaculty);
  app.get("/api/dynamic/careers/:careerId/subjects", controller.getSubjectsByCareer);
  app.get("/api/dynamic/academic-periods", controller.getAcademicPeriods);
  app.get("/api/dynamic/academic-levels", controller.getAcademicLevels);

  // Rutas protegidas para gestión de usuarios
  app.get("/api/dynamic/users/:userId/academic-assignments", [authJwt.verifyToken, authJwt.isAdmin], controller.getUserAcademicAssignments);
  app.put("/api/dynamic/users/:userId/academic-assignments", [authJwt.verifyToken, authJwt.isAdmin], controller.updateUserAcademicAssignments);

  // Ruta para sincronización de datos desde APIs externas (solo admin)
  app.post("/api/dynamic/sync-from-apis", [authJwt.verifyToken, authJwt.isAdmin], controller.syncFromExternalAPIs);

  // Ruta para obtener asignaturas disponibles para un docente
  app.get("/api/dynamic/teachers/:userId/available-subjects", [authJwt.verifyToken, authJwt.isDocente], controller.getAvailableSubjectsForTeacher);
}; 