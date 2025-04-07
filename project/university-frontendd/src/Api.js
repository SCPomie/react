import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export const getStudents = () => API.get('/student/');
export const getDegrees = () => API.get('/degree/');
export const getCohortByDegree = (degreeName) => API.get(`cohort/?degree=${degreeName}`);
export const getCohortById = (cohortId) => API.get(`/cohort/${cohortId}/`);
export const createDegree = (degreeData) => API.post('/degree/', degreeData);
export const getCohorts = () => API.get('/cohort/');
export const getStudentsByCohort = (cohortId) => API.get(`/student/?cohort=${cohortId}`);
export const createCohort = (cohortData) => API.post('/cohort/', cohortData);
export const getModulesByCohort = (cohortId) => API.get(`/module/?delivered_to=${cohortId}`);
export const getAllModules = () => API.get('/module/');
export const getModuleByCode = (code) => API.get(`/module/${code}/`);
export const getStudentsByModule = (moduleCode) => API.get(`/grade/?module=${moduleCode}`);
export const getSingleStudent = (studentId) => API.get(`/student/${studentId}/`);
export const createModule = (data) => API.post('/module/', data);
export const getGradesByStudent = (studentId) => API.get(`/grade/?student=${studentId}`);
export const createStudent = (data) => API.post('/student/', data);
export const getGradeByStudentModuleCohort = (studentId, moduleCode, cohortId) =>
  API.get(`/grade/?student=${studentId}&module=${moduleCode}&cohort=${cohortId}`);
export const createGrade = (data) => API.post('/grade/', data);
export const updateGrade = (gradeId, data) => API.put(`/grade/${gradeId}/`, data);

// Add more as needed
