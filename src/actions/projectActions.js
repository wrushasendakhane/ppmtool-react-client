import axios from "axios";

const PROJECT_API_URL = "/api/project"

export function getProjects() {
  return axios.get(PROJECT_API_URL + "/all")
}

export function getProject(projectId) {
  return axios.get(PROJECT_API_URL + `/${projectId}`);
}

export function saveProject(project) {
  return axios.post(PROJECT_API_URL, project);
}

export function deleteProject(projectId) {
  return axios.delete(PROJECT_API_URL + `/${projectId}`)
}