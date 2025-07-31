const axios = require('axios');

class ExternalAPIsService {
  constructor() {
    // APIs para datos académicos
    this.senescytAPI = 'https://api.senescyt.gob.ec'; // API de SENESCYT
    this.unesumAPI = 'https://api.unesum.edu.ec'; // API de UNESUM (ejemplo)
    this.ecuadorUniversitiesAPI = 'https://api.ecuador.com/universities'; // API de universidades
  }

  // Obtener universidades desde API externa
  async getUniversities() {
    try {
      // En producción, usarías la API real de SENESCYT o similar
      // Por ahora, datos simulados de APIs
      return [
        { id: 'UNESUM', name: 'Universidad Estatal del Sur de Manabí', type: 'Pública', acronym: 'UNESUM', city: 'Portoviejo' },
        { id: 'UTM', name: 'Universidad Técnica de Manabí', type: 'Pública', acronym: 'UTM', city: 'Manta' },
        { id: 'UG', name: 'Universidad de Guayaquil', type: 'Pública', acronym: 'UG', city: 'Guayaquil' },
        { id: 'ESPOL', name: 'Escuela Superior Politécnica del Litoral', type: 'Pública', acronym: 'ESPOL', city: 'Guayaquil' },
        { id: 'UCSG', name: 'Universidad Católica Santiago de Guayaquil', type: 'Privada', acronym: 'UCSG', city: 'Guayaquil' },
        { id: 'UCE', name: 'Universidad Central del Ecuador', type: 'Pública', acronym: 'UCE', city: 'Quito' },
        { id: 'USFQ', name: 'Universidad San Francisco de Quito', type: 'Privada', acronym: 'USFQ', city: 'Quito' }
      ];
    } catch (error) {
      console.error('Error fetching universities:', error);
      return [];
    }
  }

  // Obtener facultades por universidad desde API
  async getFacultiesByUniversity(universityId) {
    try {
      // Simular llamada a API externa
      const facultiesByUniversity = {
        'UNESUM': [
          { id: 'FCT', name: 'Ciencias Técnicas', description: 'Facultad de Ciencias Técnicas' },
          { id: 'FCS', name: 'Ciencias Sociales', description: 'Facultad de Ciencias Sociales' },
          { id: 'FCE', name: 'Ciencias Económicas', description: 'Facultad de Ciencias Económicas' },
          { id: 'FCA', name: 'Ciencias Agropecuarias', description: 'Facultad de Ciencias Agropecuarias' }
        ],
        'UTM': [
          { id: 'FCT', name: 'Ciencias Técnicas', description: 'Facultad de Ciencias Técnicas' },
          { id: 'FCS', name: 'Ciencias Sociales', description: 'Facultad de Ciencias Sociales' },
          { id: 'FCE', name: 'Ciencias Económicas', description: 'Facultad de Ciencias Económicas' }
        ],
        'UG': [
          { id: 'FCT', name: 'Ciencias Técnicas', description: 'Facultad de Ciencias Técnicas' },
          { id: 'FCS', name: 'Ciencias Sociales', description: 'Facultad de Ciencias Sociales' },
          { id: 'FCE', name: 'Ciencias Económicas', description: 'Facultad de Ciencias Económicas' },
          { id: 'FME', name: 'Ciencias Médicas', description: 'Facultad de Ciencias Médicas' }
        ],
        'ESPOL': [
          { id: 'FIMCM', name: 'Facultad de Ingeniería Mecánica y Ciencias de la Producción', description: 'FIMCM' },
          { id: 'FIEC', name: 'Facultad de Ingeniería Eléctrica y Computación', description: 'FIEC' },
          { id: 'FICT', name: 'Facultad de Ingeniería en Ciencias de la Tierra', description: 'FICT' }
        ]
      };

      return facultiesByUniversity[universityId] || [];
    } catch (error) {
      console.error('Error fetching faculties:', error);
      return [];
    }
  }

  // Obtener carreras por facultad desde API
  async getCareersByFaculty(facultyId) {
    try {
      const careersByFaculty = {
        'FCT': [
          { id: 'TI', name: 'Tecnologías de la Información', description: 'Carrera de Tecnologías de la Información', credits: 240 },
          { id: 'SIS', name: 'Sistemas de Información', description: 'Carrera de Sistemas de Información', credits: 240 },
          { id: 'ING', name: 'Ingeniería en Computación', description: 'Carrera de Ingeniería en Computación', credits: 240 },
          { id: 'TEL', name: 'Ingeniería en Telecomunicaciones', description: 'Carrera de Ingeniería en Telecomunicaciones', credits: 240 }
        ],
        'FCS': [
          { id: 'PSI', name: 'Psicología', description: 'Carrera de Psicología', credits: 240 },
          { id: 'SOC', name: 'Sociología', description: 'Carrera de Sociología', credits: 240 },
          { id: 'COM', name: 'Comunicación Social', description: 'Carrera de Comunicación Social', credits: 240 },
          { id: 'EDU', name: 'Educación', description: 'Carrera de Educación', credits: 240 }
        ],
        'FCE': [
          { id: 'ADM', name: 'Administración de Empresas', description: 'Carrera de Administración de Empresas', credits: 240 },
          { id: 'CON', name: 'Contabilidad', description: 'Carrera de Contabilidad', credits: 240 },
          { id: 'ECO', name: 'Economía', description: 'Carrera de Economía', credits: 240 },
          { id: 'FIN', name: 'Finanzas', description: 'Carrera de Finanzas', credits: 240 }
        ],
        'FCA': [
          { id: 'AGR', name: 'Agronomía', description: 'Carrera de Agronomía', credits: 240 },
          { id: 'VET', name: 'Medicina Veterinaria', description: 'Carrera de Medicina Veterinaria', credits: 300 },
          { id: 'ZOO', name: 'Zootecnia', description: 'Carrera de Zootecnia', credits: 240 }
        ],
        'FME': [
          { id: 'MED', name: 'Medicina', description: 'Carrera de Medicina', credits: 360 },
          { id: 'ENF', name: 'Enfermería', description: 'Carrera de Enfermería', credits: 240 },
          { id: 'FAR', name: 'Farmacia', description: 'Carrera de Farmacia', credits: 240 }
        ],
        'FIEC': [
          { id: 'ELEC', name: 'Ingeniería Eléctrica', description: 'Ingeniería Eléctrica', credits: 240 },
          { id: 'ELEC', name: 'Ingeniería Electrónica', description: 'Ingeniería Electrónica', credits: 240 },
          { id: 'COMP', name: 'Ingeniería en Computación', description: 'Ingeniería en Computación', credits: 240 }
        ]
      };

      return careersByFaculty[facultyId] || [];
    } catch (error) {
      console.error('Error fetching careers:', error);
      return [];
    }
  }

  // Obtener materias por carrera desde API
  async getSubjectsByCareer(careerId) {
    try {
      const subjectsByCareer = {
        'TI': [
          { id: 'TI001', name: 'Fundamentos de Programación', credits: 4, level: 1, hours: 128 },
          { id: 'TI002', name: 'Programación II', credits: 4, level: 2, hours: 128 },
          { id: 'TI003', name: 'Bases de Datos', credits: 4, level: 3, hours: 128 },
          { id: 'TI004', name: 'Programación Avanzada', credits: 4, level: 4, hours: 128 },
          { id: 'TI005', name: 'Desarrollo Web', credits: 4, level: 5, hours: 128 },
          { id: 'TI006', name: 'Aplicaciones Móviles', credits: 4, level: 6, hours: 128 },
          { id: 'TI007', name: 'Inteligencia Artificial', credits: 4, level: 7, hours: 128 },
          { id: 'TI008', name: 'Proyecto de Grado', credits: 6, level: 8, hours: 192 }
        ],
        'SIS': [
          { id: 'SIS001', name: 'Sistemas Operativos', credits: 4, level: 1, hours: 128 },
          { id: 'SIS002', name: 'Redes de Computadoras', credits: 4, level: 2, hours: 128 },
          { id: 'SIS003', name: 'Arquitectura de Computadoras', credits: 4, level: 3, hours: 128 },
          { id: 'SIS004', name: 'Seguridad Informática', credits: 4, level: 4, hours: 128 },
          { id: 'SIS005', name: 'Administración de Sistemas', credits: 4, level: 5, hours: 128 },
          { id: 'SIS006', name: 'Cloud Computing', credits: 4, level: 6, hours: 128 },
          { id: 'SIS007', name: 'Ciberseguridad', credits: 4, level: 7, hours: 128 },
          { id: 'SIS008', name: 'Proyecto de Grado', credits: 6, level: 8, hours: 192 }
        ],
        'ADM': [
          { id: 'ADM001', name: 'Fundamentos de Administración', credits: 4, level: 1, hours: 128 },
          { id: 'ADM002', name: 'Contabilidad Básica', credits: 4, level: 2, hours: 128 },
          { id: 'ADM003', name: 'Marketing', credits: 4, level: 3, hours: 128 },
          { id: 'ADM004', name: 'Gestión de Recursos Humanos', credits: 4, level: 4, hours: 128 },
          { id: 'ADM005', name: 'Finanzas Corporativas', credits: 4, level: 5, hours: 128 },
          { id: 'ADM006', name: 'Estrategia Empresarial', credits: 4, level: 6, hours: 128 },
          { id: 'ADM007', name: 'Emprendimiento', credits: 4, level: 7, hours: 128 },
          { id: 'ADM008', name: 'Proyecto de Grado', credits: 6, level: 8, hours: 192 }
        ],
        'PSI': [
          { id: 'PSI001', name: 'Introducción a la Psicología', credits: 4, level: 1, hours: 128 },
          { id: 'PSI002', name: 'Psicología del Desarrollo', credits: 4, level: 2, hours: 128 },
          { id: 'PSI003', name: 'Psicología Social', credits: 4, level: 3, hours: 128 },
          { id: 'PSI004', name: 'Psicología Clínica', credits: 4, level: 4, hours: 128 },
          { id: 'PSI005', name: 'Psicología Educativa', credits: 4, level: 5, hours: 128 },
          { id: 'PSI006', name: 'Psicología Organizacional', credits: 4, level: 6, hours: 128 },
          { id: 'PSI007', name: 'Evaluación Psicológica', credits: 4, level: 7, hours: 128 },
          { id: 'PSI008', name: 'Proyecto de Grado', credits: 6, level: 8, hours: 192 }
        ]
      };

      return subjectsByCareer[careerId] || [];
    } catch (error) {
      console.error('Error fetching subjects:', error);
      return [];
    }
  }

  // Obtener períodos académicos desde API
  async getAcademicPeriods() {
    try {
      return [
        { id: 1, code: 'PI2025', name: 'Primer Período 2025', startDate: '2025-01-15', endDate: '2025-07-15', status: 'active' },
        { id: 2, code: 'PII2025', name: 'Segundo Período 2025', startDate: '2025-07-16', endDate: '2025-12-15', status: 'active' },
        { id: 3, code: 'PI2026', name: 'Primer Período 2026', startDate: '2026-01-15', endDate: '2026-07-15', status: 'active' },
        { id: 4, code: 'PII2026', name: 'Segundo Período 2026', startDate: '2026-07-16', endDate: '2026-12-15', status: 'active' }
      ];
    } catch (error) {
      console.error('Error fetching academic periods:', error);
      return [];
    }
  }

  // Obtener niveles académicos desde API
  async getAcademicLevels() {
    try {
      return [
        { id: 1, code: 'N1', name: 'Primer Semestre', description: 'Primer nivel académico', order: 1 },
        { id: 2, code: 'N2', name: 'Segundo Semestre', description: 'Segundo nivel académico', order: 2 },
        { id: 3, code: 'N3', name: 'Tercer Semestre', description: 'Tercer nivel académico', order: 3 },
        { id: 4, code: 'N4', name: 'Cuarto Semestre', description: 'Cuarto nivel académico', order: 4 },
        { id: 5, code: 'N5', name: 'Quinto Semestre', description: 'Quinto nivel académico', order: 5 },
        { id: 6, code: 'N6', name: 'Sexto Semestre', description: 'Sexto nivel académico', order: 6 },
        { id: 7, code: 'N7', name: 'Séptimo Semestre', description: 'Séptimo nivel académico', order: 7 },
        { id: 8, code: 'N8', name: 'Octavo Semestre', description: 'Octavo nivel académico', order: 8 }
      ];
    } catch (error) {
      console.error('Error fetching academic levels:', error);
      return [];
    }
  }

  // Sincronizar datos desde APIs externas
  async syncFromExternalAPIs() {
    try {
      console.log("🔄 Sincronizando datos desde APIs externas...");
      
      const universities = await this.getUniversities();
      const periods = await this.getAcademicPeriods();
      const levels = await this.getAcademicLevels();
      
      console.log(`✅ ${universities.length} universidades sincronizadas`);
      console.log(`✅ ${periods.length} períodos académicos sincronizados`);
      console.log(`✅ ${levels.length} niveles académicos sincronizados`);
      
      return {
        universities: universities.length,
        periods: periods.length,
        levels: levels.length
      };
    } catch (error) {
      console.error('❌ Error en sincronización:', error);
      throw error;
    }
  }
}

module.exports = new ExternalAPIsService(); 