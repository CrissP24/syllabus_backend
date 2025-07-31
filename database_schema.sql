-- Esquema de Base de Datos para Sistema de Gestión de Sílabos
-- Universidad Estatal del Sur de Manabí (UNESUM)

-- Tabla de Países
CREATE TABLE IF NOT EXISTS paises (
    id VARCHAR(3) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    bandera VARCHAR(10),
    region VARCHAR(50),
    capital VARCHAR(100),
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Provincias
CREATE TABLE IF NOT EXISTS provincias (
    id VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    capital VARCHAR(100),
    region VARCHAR(50),
    pais_id VARCHAR(3) NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pais_id) REFERENCES paises(id) ON DELETE CASCADE
);

-- Tabla de Ciudades
CREATE TABLE IF NOT EXISTS ciudades (
    id VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo ENUM('Capital', 'Ciudad', 'Pueblo') DEFAULT 'Ciudad',
    provincia_id VARCHAR(10) NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (provincia_id) REFERENCES provincias(id) ON DELETE CASCADE
);

-- Tabla de Universidades
CREATE TABLE IF NOT EXISTS universidades (
    id VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    tipo ENUM('Pública', 'Privada') NOT NULL,
    siglas VARCHAR(20),
    ciudad_id VARCHAR(10) NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ciudad_id) REFERENCES ciudades(id) ON DELETE CASCADE
);

-- Tabla de Facultades
CREATE TABLE IF NOT EXISTS facultades (
    id VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    universidad_id VARCHAR(20) NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (universidad_id) REFERENCES universidades(id) ON DELETE CASCADE
);

-- Tabla de Carreras
CREATE TABLE IF NOT EXISTS carreras (
    id VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    facultad_id VARCHAR(10) NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (facultad_id) REFERENCES facultades(id) ON DELETE CASCADE
);

-- Tabla de Niveles Académicos
CREATE TABLE IF NOT EXISTS niveles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    orden INT NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Asignaturas
CREATE TABLE IF NOT EXISTS asignaturas (
    id VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    creditos INT DEFAULT 0,
    horas_teoricas INT DEFAULT 0,
    horas_practicas INT DEFAULT 0,
    horas_autonomas INT DEFAULT 0,
    carrera_id VARCHAR(10) NOT NULL,
    nivel_id INT NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (carrera_id) REFERENCES carreras(id) ON DELETE CASCADE,
    FOREIGN KEY (nivel_id) REFERENCES niveles(id) ON DELETE CASCADE
);

-- Tabla de Períodos Académicos
CREATE TABLE IF NOT EXISTS periodos_academicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado ENUM('activo', 'inactivo', 'finalizado') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Usuarios (actualizada)
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(80) UNIQUE,
    email VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(120) NOT NULL,
    nombres VARCHAR(100),
    apellidos VARCHAR(100),
    cedula VARCHAR(15) UNIQUE,
    telefono VARCHAR(20),
    direccion TEXT,
    pais_id VARCHAR(3),
    provincia_id VARCHAR(10),
    ciudad_id VARCHAR(10),
    universidad_id VARCHAR(20),
    facultad_id VARCHAR(10),
    carrera_id VARCHAR(10),
    titulo_profesional VARCHAR(200),
    especialidad VARCHAR(200),
    experiencia_anos INT DEFAULT 0,
    estado ENUM('activo', 'inactivo', 'pendiente') DEFAULT 'activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pais_id) REFERENCES paises(id) ON DELETE SET NULL,
    FOREIGN KEY (provincia_id) REFERENCES provincias(id) ON DELETE SET NULL,
    FOREIGN KEY (ciudad_id) REFERENCES ciudades(id) ON DELETE SET NULL,
    FOREIGN KEY (universidad_id) REFERENCES universidades(id) ON DELETE SET NULL,
    FOREIGN KEY (facultad_id) REFERENCES facultades(id) ON DELETE SET NULL,
    FOREIGN KEY (carrera_id) REFERENCES carreras(id) ON DELETE SET NULL
);

-- Tabla de Roles
CREATE TABLE IF NOT EXISTS roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) UNIQUE NOT NULL
);

-- Tabla de Relación Usuario-Rol
CREATE TABLE IF NOT EXISTS user_roles (
    userId INT NOT NULL,
    roleId INT NOT NULL,
    PRIMARY KEY (userId, roleId),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE CASCADE
);

-- Tabla de Asignación Docente-Asignatura
CREATE TABLE IF NOT EXISTS asignaciones_docente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    docente_id INT NOT NULL,
    asignatura_id VARCHAR(20) NOT NULL,
    periodo_id INT NOT NULL,
    paralelo VARCHAR(10) DEFAULT 'A',
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (docente_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (asignatura_id) REFERENCES asignaturas(id) ON DELETE CASCADE,
    FOREIGN KEY (periodo_id) REFERENCES periodos_academicos(id) ON DELETE CASCADE,
    UNIQUE KEY unique_asignacion (docente_id, asignatura_id, periodo_id, paralelo)
);

-- Tabla de Sílabos
CREATE TABLE IF NOT EXISTS silabos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    asignacion_id INT NOT NULL,
    caracterizacion TEXT,
    objetivos TEXT,
    competencias TEXT,
    resultados_actitudinales TEXT,
    resultados_cognitivos TEXT,
    resultados_procedimentales TEXT,
    metodologia TEXT,
    procedimientos_docencia VARCHAR(50),
    procedimientos_practicas VARCHAR(50),
    procedimientos_autonomo VARCHAR(50),
    procedimientos_examen VARCHAR(50),
    estado ENUM('borrador', 'enviado', 'aprobado', 'rechazado') DEFAULT 'borrador',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (asignacion_id) REFERENCES asignaciones_docente(id) ON DELETE CASCADE
);

-- Tabla de Unidades Temáticas
CREATE TABLE IF NOT EXISTS unidades_tematicas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    silabo_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    orden INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (silabo_id) REFERENCES silabos(id) ON DELETE CASCADE
);

-- Tabla de Bibliografía
CREATE TABLE IF NOT EXISTS bibliografia (
    id INT PRIMARY KEY AUTO_INCREMENT,
    silabo_id INT NOT NULL,
    tipo ENUM('basica', 'complementaria') NOT NULL,
    referencia TEXT NOT NULL,
    orden INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (silabo_id) REFERENCES silabos(id) ON DELETE CASCADE
);

-- Tabla de Visados
CREATE TABLE IF NOT EXISTS visados (
    id INT PRIMARY KEY AUTO_INCREMENT,
    silabo_id INT NOT NULL,
    tipo ENUM('decano', 'director', 'coordinador', 'docente') NOT NULL,
    nombre_responsable VARCHAR(100),
    fecha_visado DATE,
    qr_code TEXT,
    estado ENUM('pendiente', 'aprobado', 'rechazado') DEFAULT 'pendiente',
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (silabo_id) REFERENCES silabos(id) ON DELETE CASCADE
);

-- Datos de ejemplo para Países
INSERT INTO paises (id, nombre, bandera, region, capital) VALUES
('EC', 'Ecuador', '🇪🇨', 'Americas', 'Quito'),
('CO', 'Colombia', '🇨🇴', 'Americas', 'Bogotá'),
('PE', 'Perú', '🇵🇪', 'Americas', 'Lima'),
('VE', 'Venezuela', '🇻🇪', 'Americas', 'Caracas');

-- Datos de ejemplo para Provincias de Ecuador
INSERT INTO provincias (id, nombre, capital, region, pais_id) VALUES
('MAN', 'Manabí', 'Portoviejo', 'Costa', 'EC'),
('GUA', 'Guayas', 'Guayaquil', 'Costa', 'EC'),
('PIC', 'Pichincha', 'Quito', 'Sierra', 'EC'),
('AZU', 'Azuay', 'Cuenca', 'Sierra', 'EC'),
('LOJ', 'Loja', 'Loja', 'Sierra', 'EC'),
('ORE', 'El Oro', 'Machala', 'Costa', 'EC'),
('ESM', 'Esmeraldas', 'Esmeraldas', 'Costa', 'EC'),
('LOS', 'Los Ríos', 'Babahoyo', 'Costa', 'EC'),
('CHI', 'Chimborazo', 'Riobamba', 'Sierra', 'EC'),
('TUN', 'Tungurahua', 'Ambato', 'Sierra', 'EC'),
('BOL', 'Bolívar', 'Guaranda', 'Sierra', 'EC'),
('COT', 'Cotopaxi', 'Latacunga', 'Sierra', 'EC'),
('CAR', 'Carchi', 'Tulcán', 'Sierra', 'EC'),
('IMB', 'Imbabura', 'Ibarra', 'Sierra', 'EC'),
('NAP', 'Napo', 'Tena', 'Oriente', 'EC'),
('PAZ', 'Pastaza', 'Puyo', 'Oriente', 'EC'),
('ORE', 'Orellana', 'Francisco de Orellana', 'Oriente', 'EC'),
('SUC', 'Sucumbíos', 'Nueva Loja', 'Oriente', 'EC'),
('MOR', 'Morona Santiago', 'Macas', 'Oriente', 'EC'),
('ZAM', 'Zamora Chinchipe', 'Zamora', 'Oriente', 'EC'),
('GAL', 'Galápagos', 'Puerto Baquerizo Moreno', 'Insular', 'EC'),
('SAN', 'Santo Domingo de los Tsáchilas', 'Santo Domingo', 'Costa', 'EC'),
('SAN', 'Santa Elena', 'Santa Elena', 'Costa', 'EC');

-- Datos de ejemplo para Ciudades
INSERT INTO ciudades (id, nombre, tipo, provincia_id) VALUES
('PVO', 'Portoviejo', 'Capital', 'MAN'),
('MNT', 'Manta', 'Ciudad', 'MAN'),
('JIP', 'Jipijapa', 'Ciudad', 'MAN'),
('CHA', 'Chone', 'Ciudad', 'MAN'),
('PED', 'Pedernales', 'Ciudad', 'MAN'),
('SUC', 'Sucre', 'Ciudad', 'MAN'),
('24M', '24 de Mayo', 'Ciudad', 'MAN'),
('PUE', 'Puerto López', 'Ciudad', 'MAN'),
('JAR', 'Jaramijó', 'Ciudad', 'MAN'),
('FLA', 'Flavio Alfaro', 'Ciudad', 'MAN'),
('ELC', 'El Carmen', 'Ciudad', 'MAN'),
('BOL', 'Bolívar', 'Ciudad', 'MAN'),
('OLM', 'Olmedo', 'Ciudad', 'MAN'),
('PIC', 'Pichincha', 'Ciudad', 'MAN'),
('JUN', 'Junín', 'Ciudad', 'MAN'),
('MON', 'Montecristi', 'Ciudad', 'MAN'),
('TOS', 'Tosagua', 'Ciudad', 'MAN'),
('ROCA', 'Rocafuerte', 'Ciudad', 'MAN'),
('SAN', 'San Vicente', 'Ciudad', 'MAN'),
('CAL', 'Calceta', 'Ciudad', 'MAN'),
('NOB', 'Noboa', 'Ciudad', 'MAN'),
('GYE', 'Guayaquil', 'Capital', 'GUA'),
('DUR', 'Durán', 'Ciudad', 'GUA'),
('SAL', 'Salitre', 'Ciudad', 'GUA'),
('YAG', 'Yaguachi', 'Ciudad', 'GUA'),
('MIL', 'Milagro', 'Ciudad', 'GUA'),
('NAR', 'Naranjal', 'Ciudad', 'GUA'),
('BAL', 'Balao', 'Ciudad', 'GUA'),
('ELT', 'El Triunfo', 'Ciudad', 'GUA'),
('GRA', 'Guayas', 'Ciudad', 'GUA'),
('PAL', 'Palestina', 'Ciudad', 'GUA'),
('LOM', 'Lomas de Sargentillo', 'Ciudad', 'GUA'),
('NOB', 'Nobol', 'Ciudad', 'GUA'),
('GAL', 'General Antonio Elizalde', 'Ciudad', 'GUA'),
('ISL', 'Isidro Ayora', 'Ciudad', 'GUA'),
('COL', 'Colimes', 'Ciudad', 'GUA'),
('SAN', 'Santa Lucía', 'Ciudad', 'GUA'),
('ALF', 'Alfredo Baquerizo Moreno', 'Ciudad', 'GUA'),
('SIM', 'Simón Bolívar', 'Ciudad', 'GUA'),
('COR', 'Coronel Marcelino Maridueña', 'Ciudad', 'GUA'),
('ELO', 'El Oro', 'Ciudad', 'GUA');

-- Datos de ejemplo para Universidades
INSERT INTO universidades (id, nombre, tipo, siglas, ciudad_id) VALUES
('UNESUM', 'Universidad Estatal del Sur de Manabí', 'Pública', 'UNESUM', 'PVO'),
('UTM', 'Universidad Técnica de Manabí', 'Pública', 'UTM', 'MNT'),
('UCSG', 'Universidad Católica Santiago de Guayaquil', 'Privada', 'UCSG', 'GYE'),
('UG', 'Universidad de Guayaquil', 'Pública', 'UG', 'GYE'),
('ESPOL', 'Escuela Superior Politécnica del Litoral', 'Pública', 'ESPOL', 'GYE');

-- Datos de ejemplo para Facultades
INSERT INTO facultades (id, nombre, descripcion, universidad_id) VALUES
('FCT', 'Ciencias Técnicas', 'Facultad de Ciencias Técnicas', 'UNESUM'),
('FCS', 'Ciencias Sociales', 'Facultad de Ciencias Sociales', 'UNESUM'),
('FCE', 'Ciencias Económicas', 'Facultad de Ciencias Económicas', 'UNESUM'),
('FCA', 'Ciencias Agropecuarias', 'Facultad de Ciencias Agropecuarias', 'UNESUM'),
('FCT', 'Ciencias Técnicas', 'Facultad de Ciencias Técnicas', 'UTM'),
('FCS', 'Ciencias Sociales', 'Facultad de Ciencias Sociales', 'UTM'),
('FCE', 'Ciencias Económicas', 'Facultad de Ciencias Económicas', 'UTM'),
('FCT', 'Ciencias Técnicas', 'Facultad de Ciencias Técnicas', 'UG'),
('FCS', 'Ciencias Sociales', 'Facultad de Ciencias Sociales', 'UG'),
('FCE', 'Ciencias Económicas', 'Facultad de Ciencias Económicas', 'UG'),
('FME', 'Ciencias Médicas', 'Facultad de Ciencias Médicas', 'UG');

-- Datos de ejemplo para Carreras
INSERT INTO carreras (id, nombre, descripcion, facultad_id) VALUES
('TI', 'Tecnologías de la Información', 'Carrera de Tecnologías de la Información', 'FCT'),
('SIS', 'Sistemas de Información', 'Carrera de Sistemas de Información', 'FCT'),
('ING', 'Ingeniería en Computación', 'Carrera de Ingeniería en Computación', 'FCT'),
('TEL', 'Ingeniería en Telecomunicaciones', 'Carrera de Ingeniería en Telecomunicaciones', 'FCT'),
('PSI', 'Psicología', 'Carrera de Psicología', 'FCS'),
('SOC', 'Sociología', 'Carrera de Sociología', 'FCS'),
('COM', 'Comunicación Social', 'Carrera de Comunicación Social', 'FCS'),
('EDU', 'Educación', 'Carrera de Educación', 'FCS'),
('ADM', 'Administración de Empresas', 'Carrera de Administración de Empresas', 'FCE'),
('CON', 'Contabilidad', 'Carrera de Contabilidad', 'FCE'),
('ECO', 'Economía', 'Carrera de Economía', 'FCE'),
('FIN', 'Finanzas', 'Carrera de Finanzas', 'FCE'),
('AGR', 'Agronomía', 'Carrera de Agronomía', 'FCA'),
('VET', 'Medicina Veterinaria', 'Carrera de Medicina Veterinaria', 'FCA'),
('ZOO', 'Zootecnia', 'Carrera de Zootecnia', 'FCA');

-- Datos de ejemplo para Niveles
INSERT INTO niveles (codigo, nombre, descripcion, orden) VALUES
('N1', 'Primer Semestre', 'Primer nivel académico', 1),
('N2', 'Segundo Semestre', 'Segundo nivel académico', 2),
('N3', 'Tercer Semestre', 'Tercer nivel académico', 3),
('N4', 'Cuarto Semestre', 'Cuarto nivel académico', 4),
('N5', 'Quinto Semestre', 'Quinto nivel académico', 5),
('N6', 'Sexto Semestre', 'Sexto nivel académico', 6),
('N7', 'Séptimo Semestre', 'Séptimo nivel académico', 7),
('N8', 'Octavo Semestre', 'Octavo nivel académico', 8);

-- Datos de ejemplo para Asignaturas
INSERT INTO asignaturas (id, nombre, descripcion, creditos, horas_teoricas, horas_practicas, horas_autonomas, carrera_id, nivel_id) VALUES
('TI001', 'Fundamentos de Programación', 'Introducción a la programación básica', 4, 32, 32, 64, 'TI', 1),
('TI002', 'Programación II', 'Programación orientada a objetos', 4, 32, 32, 64, 'TI', 2),
('TI003', 'Bases de Datos', 'Diseño y gestión de bases de datos', 4, 32, 32, 64, 'TI', 3),
('TI004', 'Programación Avanzada', 'Programación avanzada y patrones de diseño', 4, 32, 32, 64, 'TI', 4),
('TI005', 'Desarrollo Web', 'Desarrollo de aplicaciones web', 4, 32, 32, 64, 'TI', 5),
('TI006', 'Aplicaciones Móviles', 'Desarrollo de aplicaciones móviles', 4, 32, 32, 64, 'TI', 6),
('TI007', 'Inteligencia Artificial', 'Fundamentos de inteligencia artificial', 4, 32, 32, 64, 'TI', 7),
('TI008', 'Proyecto de Grado', 'Proyecto final de carrera', 6, 32, 32, 64, 'TI', 8),
('SIS001', 'Sistemas Operativos', 'Fundamentos de sistemas operativos', 4, 32, 32, 64, 'SIS', 1),
('SIS002', 'Redes de Computadoras', 'Fundamentos de redes y comunicaciones', 4, 32, 32, 64, 'SIS', 2),
('SIS003', 'Arquitectura de Computadoras', 'Arquitectura y organización de computadoras', 4, 32, 32, 64, 'SIS', 3),
('SIS004', 'Seguridad Informática', 'Seguridad en sistemas informáticos', 4, 32, 32, 64, 'SIS', 4),
('SIS005', 'Administración de Sistemas', 'Administración de sistemas informáticos', 4, 32, 32, 64, 'SIS', 5),
('SIS006', 'Cloud Computing', 'Computación en la nube', 4, 32, 32, 64, 'SIS', 6),
('SIS007', 'Ciberseguridad', 'Seguridad cibernética', 4, 32, 32, 64, 'SIS', 7),
('SIS008', 'Proyecto de Grado', 'Proyecto final de carrera', 6, 32, 32, 64, 'SIS', 8),
('ADM001', 'Fundamentos de Administración', 'Fundamentos de la administración empresarial', 4, 32, 32, 64, 'ADM', 1),
('ADM002', 'Contabilidad Básica', 'Contabilidad básica empresarial', 4, 32, 32, 64, 'ADM', 2),
('ADM003', 'Marketing', 'Fundamentos de marketing', 4, 32, 32, 64, 'ADM', 3),
('ADM004', 'Gestión de Recursos Humanos', 'Administración de recursos humanos', 4, 32, 32, 64, 'ADM', 4),
('ADM005', 'Finanzas Corporativas', 'Finanzas empresariales', 4, 32, 32, 64, 'ADM', 5),
('ADM006', 'Estrategia Empresarial', 'Estrategia y planificación empresarial', 4, 32, 32, 64, 'ADM', 6),
('ADM007', 'Emprendimiento', 'Creación y gestión de empresas', 4, 32, 32, 64, 'ADM', 7),
('ADM008', 'Proyecto de Grado', 'Proyecto final de carrera', 6, 32, 32, 64, 'ADM', 8);

-- Datos de ejemplo para Períodos Académicos
INSERT INTO periodos_academicos (codigo, nombre, fecha_inicio, fecha_fin, estado) VALUES
('PI2025', 'Primer Período 2025', '2025-01-15', '2025-07-15', 'activo'),
('PII2025', 'Segundo Período 2025', '2025-07-16', '2025-12-15', 'activo'),
('PI2026', 'Primer Período 2026', '2026-01-15', '2026-07-15', 'activo'),
('PII2026', 'Segundo Período 2026', '2026-07-16', '2026-12-15', 'activo'); 