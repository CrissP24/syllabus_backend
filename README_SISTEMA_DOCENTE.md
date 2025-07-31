# 🎓 Sistema de Gestión de Sílabos - Módulo Docente

## 📋 Descripción General

Este sistema permite a los docentes de la Universidad Estatal del Sur de Manabí (UNESUM) gestionar sus asignaturas y crear/editar sílabos de manera organizada y eficiente.

## 🏗️ Arquitectura del Sistema

### Backend (Node.js + Express + Sequelize)
- **Base de datos**: MySQL con Sequelize ORM
- **Autenticación**: JWT con roles de usuario
- **APIs RESTful**: Para gestión completa de sílabos
- **Middleware**: Autorización por roles

### Frontend (React + Bootstrap)
- **Dashboard moderno**: Con estadísticas y acciones rápidas
- **Formulario dinámico**: Para crear/editar sílabos
- **Vistas responsivas**: Adaptadas a diferentes dispositivos
- **Integración con APIs**: Comunicación completa con el backend

## 🗄️ Estructura de Base de Datos

### Tablas Principales:
1. **facultades** - Facultades de la universidad
2. **carreras** - Carreras por facultad
3. **niveles** - Niveles académicos (semestres)
4. **asignaturas** - Materias por carrera y nivel
5. **periodos_academicos** - Períodos lectivos
6. **asignaciones_docente** - Relación docente-asignatura-período
7. **silabos** - Contenido de los sílabos
8. **unidades_tematicas** - Unidades del sílabo
9. **bibliografia** - Referencias bibliográficas
10. **visados** - Estados de aprobación

## 🚀 Instalación y Configuración

### 1. Configurar Base de Datos
```sql
-- Ejecutar el archivo database_schema.sql en tu MySQL
source syllabus_backend/database_schema.sql;
```

### 2. Instalar Dependencias del Backend
```bash
cd syllabus_backend
npm install
```

### 3. Configurar Variables de Entorno
Crear archivo `.env` en `syllabus_backend/`:
```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=tu_base_de_datos
DB_PORT=3306
JWT_SECRET=tu_secreto_jwt
```

### 4. Insertar Datos de Ejemplo
```bash
cd syllabus_backend
node insertSampleData.js
```

### 5. Iniciar el Backend
```bash
cd syllabus_backend
npm start
```

### 6. Instalar Dependencias del Frontend
```bash
cd syllabus_frontend
npm install
```

### 7. Iniciar el Frontend
```bash
cd syllabus_frontend
npm start
```

## 👤 Usuario de Prueba

- **Email**: docente@unesum.edu.ec
- **Contraseña**: password123
- **Rol**: docente

## 📊 Funcionalidades del Docente

### Dashboard Principal
- **Estadísticas en tiempo real**: Total de asignaciones, sílabos en borrador, enviados, aprobados, rechazados
- **Acciones rápidas**: Navegación directa a funciones principales
- **Asignaciones recientes**: Lista de las últimas asignaciones con estados

### Gestión de Asignaturas
- **Vista de todas las asignaciones**: Organizadas por período y carrera
- **Información detallada**: Facultad, carrera, nivel, período, paralelo
- **Estados de sílabos**: Visualización clara del progreso

### Creación/Edición de Sílabos
- **Formulario completo**: Todos los campos requeridos por la universidad
- **Campos editables**: Caracterización, objetivos, competencias, resultados
- **Unidades temáticas**: Gestión dinámica de unidades
- **Bibliografía**: Separación entre básica y complementaria
- **Procedimientos**: Docencia, prácticas, trabajo autónomo, evaluación

### Estados de Sílabos
- **Borrador**: Trabajo en progreso
- **Enviado**: Enviado para revisión
- **Aprobado**: Aprobado por autoridades
- **Rechazado**: Requiere correcciones

## 🔌 APIs del Backend

### Autenticación
- `POST /api/auth/signin` - Login con email
- `POST /api/auth/signup` - Registro de usuarios

### Gestión de Docente
- `GET /api/docente/asignaciones` - Obtener asignaciones del docente
- `GET /api/docente/asignaciones/:id` - Obtener asignación específica
- `GET /api/docente/asignaciones/:id/silabo` - Obtener sílabo de asignación
- `POST /api/docente/asignaciones/:id/silabo` - Crear/actualizar sílabo
- `POST /api/docente/asignaciones/:id/enviar` - Enviar sílabo para revisión
- `GET /api/docente/estadisticas` - Obtener estadísticas del docente

### Gestión de Usuarios (Admin)
- `GET /api/auth/users` - Listar usuarios
- `POST /api/auth/users` - Crear usuario
- `PUT /api/auth/users/:id` - Actualizar usuario
- `DELETE /api/auth/users/:id` - Eliminar usuario
- `GET /api/auth/roles` - Listar roles

## 🎨 Características del Frontend

### Diseño Moderno
- **Interfaz intuitiva**: Navegación clara y organizada
- **Responsive design**: Adaptado a móviles y tablets
- **Animaciones suaves**: Transiciones y efectos visuales
- **Iconografía**: Iconos descriptivos para cada función

### Funcionalidades Avanzadas
- **Carga dinámica**: Datos actualizados en tiempo real
- **Validación de formularios**: Verificación de campos requeridos
- **Manejo de errores**: Mensajes claros de errores
- **Estados de carga**: Indicadores de progreso

## 🔒 Seguridad

### Autenticación
- **JWT tokens**: Autenticación segura
- **Roles de usuario**: Autorización por funciones
- **Middleware de protección**: Rutas protegidas

### Validación
- **Datos de entrada**: Validación en frontend y backend
- **Sanitización**: Prevención de inyección de datos
- **CORS**: Configuración de seguridad para APIs

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

### Características
- **Sidebar colapsible**: En dispositivos móviles
- **Tablas responsivas**: Scroll horizontal en móviles
- **Botones adaptativos**: Tamaños optimizados por dispositivo

## 🚨 Solución de Problemas

### Error de Conexión a Base de Datos
```bash
# Verificar configuración en config/db.config.js
# Asegurar que MySQL esté corriendo
# Verificar credenciales de base de datos
```

### Error de Autenticación
```bash
# Verificar JWT_SECRET en variables de entorno
# Limpiar localStorage del navegador
# Verificar que el usuario tenga el rol correcto
```

### Error de CORS
```bash
# Verificar configuración en server.js
# Asegurar que las URLs estén en corsOptions.origin
```

## 🔄 Flujo de Trabajo Típico

1. **Login**: Docente inicia sesión con email y contraseña
2. **Dashboard**: Ve estadísticas y asignaciones recientes
3. **Seleccionar Asignación**: Elige una asignatura para trabajar
4. **Crear/Editar Sílabo**: Llena el formulario con la información
5. **Guardar**: Guarda el trabajo en progreso
6. **Enviar**: Envía el sílabo para revisión
7. **Seguimiento**: Monitorea el estado de aprobación

## 📈 Próximas Mejoras

- **Notificaciones**: Sistema de alertas para cambios de estado
- **Historial**: Versiones anteriores de sílabos
- **Plantillas**: Sílabos base para reutilizar
- **Exportación**: PDF y Word mejorados
- **Comentarios**: Sistema de feedback entre docentes y revisores

## 🤝 Contribución

Para contribuir al proyecto:
1. Fork el repositorio
2. Crear una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Crear un Pull Request

## 📞 Soporte

Para soporte técnico o preguntas:
- **Email**: soporte@unesum.edu.ec
- **Documentación**: Ver archivos README en cada módulo
- **Issues**: Reportar problemas en el repositorio

---

**Desarrollado para la Universidad Estatal del Sur de Manabí (UNESUM)** 