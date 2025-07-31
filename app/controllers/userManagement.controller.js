const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");

// Listar todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          attributes: ["name"],
          through: { attributes: [] }
        }
      ],
      attributes: { exclude: ['password'] }
    });

    // Formatear la respuesta para incluir los roles como array de strings
    const formattedUsers = users.map(user => {
      const userData = user.get({ plain: true });
      userData.roles = userData.roles.map(role => role.name);
      return userData;
    });

    res.status(200).json(formattedUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un usuario específico por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Role,
          attributes: ["name"],
          through: { attributes: [] }
        }
      ],
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = user.get({ plain: true });
    userData.roles = userData.roles.map(role => role.name);

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: req.body.username },
          { email: req.body.email }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: "Username or email already exists" 
      });
    }

    // Crear el usuario
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    // Asignar roles
    if (req.body.roles && req.body.roles.length > 0) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      });
      await user.setRoles(roles);
    } else {
      // Asignar rol por defecto (user)
      const defaultRole = await Role.findOne({ where: { name: "user" } });
      if (defaultRole) {
        await user.setRoles([defaultRole]);
      }
    }

    res.status(201).json({ 
      message: "User created successfully",
      userId: user.id 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Actualizar datos básicos
    const updateData = {};
    if (req.body.username) updateData.username = req.body.username;
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.password) {
      updateData.password = bcrypt.hashSync(req.body.password, 8);
    }

    await user.update(updateData);

    // Actualizar roles si se proporcionan
    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      });
      await user.setRoles(roles);
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener todos los roles disponibles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      attributes: ['id', 'name']
    });
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 