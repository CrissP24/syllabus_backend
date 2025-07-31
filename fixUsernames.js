const db = require("./app/models");
const User = db.user;

async function fixUsernames() {
  try {
    console.log("🔍 Buscando usuarios con username null o undefined...");
    
    // Buscar usuarios sin username
    const usersWithoutUsername = await User.findAll({
      where: {
        username: null
      }
    });

    console.log(`📊 Encontrados ${usersWithoutUsername.length} usuarios sin username`);

    // Actualizar usuarios sin username
    for (const user of usersWithoutUsername) {
      const newUsername = user.email.split('@')[0]; // Usar parte del email como username
      await user.update({ username: newUsername });
      console.log(`✅ Usuario ${user.email} actualizado con username: ${newUsername}`);
    }

    // Buscar usuarios con username undefined
    const usersWithUndefinedUsername = await User.findAll({
      where: {
        username: undefined
      }
    });

    console.log(`📊 Encontrados ${usersWithUndefinedUsername.length} usuarios con username undefined`);

    // Actualizar usuarios con username undefined
    for (const user of usersWithUndefinedUsername) {
      const newUsername = user.email.split('@')[0]; // Usar parte del email como username
      await user.update({ username: newUsername });
      console.log(`✅ Usuario ${user.email} actualizado con username: ${newUsername}`);
    }

    console.log("🎉 Proceso completado!");
    
    // Mostrar estadísticas finales
    const totalUsers = await User.count();
    const usersWithUsername = await User.count({
      where: {
        username: {
          [db.Sequelize.Op.ne]: null
        }
      }
    });

    console.log(`📈 Estadísticas:`);
    console.log(`   - Total de usuarios: ${totalUsers}`);
    console.log(`   - Usuarios con username: ${usersWithUsername}`);
    console.log(`   - Usuarios sin username: ${totalUsers - usersWithUsername}`);

  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    process.exit(0);
  }
}

// Ejecutar el script
fixUsernames(); 