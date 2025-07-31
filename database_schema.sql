-- Esquema de Base de Datos para Sistema de Gestión de Sílabos
-- Universidad Estatal del Sur de Manabí (UNESUM)

-- Tabla de Facultades
CREATE TABLE IF NOT EXISTS facultades (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Carreras
CREATE TABLE IF NOT EXISTS carreras (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    facultad_id INT NOT NULL,
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
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    creditos INT DEFAULT 0,
    horas_teoricas INT DEFAULT 0,
    horas_practicas INT DEFAULT 0,
    horas_autonomas INT DEFAULT 0,
    carrera_id INT NOT NULL,
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

-- Tabla de Asignación Docente-Asignatura
CREATE TABLE IF NOT EXISTS asignaciones_docente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    docente_id INT NOT NULL,
    asignatura_id INT NOT NULL,
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

-- Datos de ejemplo para Facultades
INSERT INTO facultades (codigo, nombre, descripcion) VALUES
('FCT', 'Ciencias Técnicas', 'Facultad de Ciencias Técnicas'),
('FCS', 'Ciencias Sociales', 'Facultad de Ciencias Sociales'),
('FCE', 'Ciencias Económicas', 'Facultad de Ciencias Económicas'),
('FCA', 'Ciencias Agropecuarias', 'Facultad de Ciencias Agropecuarias');

-- Datos de ejemplo para Carreras
INSERT INTO carreras (codigo, nombre, descripcion, facultad_id) VALUES
('TI', 'Tecnologías de la Información', 'Carrera de Tecnologías de la Información', 1),
('SIS', 'Sistemas de Información', 'Carrera de Sistemas de Información', 1),
('ADM', 'Administración de Empresas', 'Carrera de Administración de Empresas', 3),
('CON', 'Contabilidad', 'Carrera de Contabilidad', 3);

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
INSERT INTO asignaturas (codigo, nombre, descripcion, creditos, horas_teoricas, horas_practicas, horas_autonomas, carrera_id, nivel_id) VALUES
('TI001', 'Fundamentos de Programación', 'Introducción a la programación básica', 4, 32, 32, 64, 1, 1),
('TI002', 'Programación II', 'Programación orientada a objetos', 4, 32, 32, 64, 1, 2),
('TI003', 'Bases de Datos', 'Diseño y gestión de bases de datos', 4, 32, 32, 64, 1, 3),
('TI004', 'Programación Avanzada', 'Programación avanzada y patrones de diseño', 4, 32, 32, 64, 1, 4),
('SIS001', 'Sistemas Operativos', 'Fundamentos de sistemas operativos', 4, 32, 32, 64, 2, 1),
('SIS002', 'Redes de Computadoras', 'Fundamentos de redes y comunicaciones', 4, 32, 32, 64, 2, 2);

-- Datos de ejemplo para Períodos Académicos
INSERT INTO periodos_academicos (codigo, nombre, fecha_inicio, fecha_fin, estado) VALUES
('PI2025', 'Primer Período 2025', '2025-01-15', '2025-07-15', 'activo'),
('PII2025', 'Segundo Período 2025', '2025-07-16', '2025-12-15', 'activo'),
('PI2026', 'Primer Período 2026', '2026-01-15', '2026-07-15', 'activo'),
('PII2026', 'Segundo Período 2026', '2026-07-16', '2026-12-15', 'activo'); 