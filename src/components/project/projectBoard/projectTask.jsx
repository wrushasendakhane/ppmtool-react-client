import React from "react";
import { Link } from "react-router-dom";

function ProjectTask({ projectTask, onDelete }) {
  let priorityString;
  let priorityClass;

  if (projectTask.priority === 1) {
    priorityString = "HIGH";
    priorityClass = "bg-danger";
  } else if (projectTask.priority === 2) {
    priorityString = "MEDIUM";
    priorityClass = "bg-warning";
  } else if (projectTask.priority === 3) {
    priorityString = "LOW";
    priorityClass = "bg-info";
  }

  return (
    <div className="card bg-light m-2">
      <div className={`card-header ${priorityClass}`}>
        ID: {projectTask.projectSequence} Priority: {priorityString}
      </div>
      <div className="card-body">
        <h5 className="card-title">{projectTask.summary}</h5>
        <p className="card-text">{projectTask.acceptanceCriteria}</p>
        <div className="row">
          <div className="col-6">
            <Link
              to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`}
              className="btn btn-primary btn-sm"
            >
              View/Update
            </Link>
          </div>
          <div className="col-6">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(projectTask.projectSequence)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectTask;
