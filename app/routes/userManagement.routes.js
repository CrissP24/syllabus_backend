const { authJwt } = require("../middleware");
const controller = require("../controllers/userManagement.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  // Rutas para gestión de usuarios (requieren autenticación y rol de admin)
  app.get("/api/auth/users", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllUsers);
  
  app.get("/api/auth/users/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.getUserById);
  
  app.post("/api/auth/users", [authJwt.verifyToken, authJwt.isAdmin], controller.createUser);
  
  app.put("/api/auth/users/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateUser);
  
  app.delete("/api/auth/users/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);
  
  // Ruta para obtener todos los roles disponibles
  app.get("/api/auth/roles", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllRoles);
}; 