import axios from "axios"

const BACKLOG_API_URL = "/api/backlog/"

export function addProjectTask(projectTask) {
  return axios.post(BACKLOG_API_URL + `${projectTask.projectIdentifier}`, projectTask);
}

export function updateProjectTask(projectTask) {
  return axios.patch(BACKLOG_API_URL + `${projectTask.projectIdentifier}/${projectTask.projectSequence}`, projectTask);
}

export function getBacklog(projectIdentifier) {
  return axios.get(BACKLOG_API_URL + `${projectIdentifier}`);
}

export function getProjectTask(projectIdentifier, projectSequence) {
  return axios.get(BACKLOG_API_URL + `${projectIdentifier}/${projectSequence}`);
}

export function deleteProjectTask(projectIdentifier, projectSequence) {
  return axios.delete(BACKLOG_API_URL + `${projectIdentifier}/${projectSequence}`);
}