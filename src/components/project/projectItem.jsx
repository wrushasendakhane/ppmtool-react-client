import React from "react";
import { Link } from "react-router-dom";

const ProjectItem = ({ project, onDelete }) => {
  return (
    <div className="container" style={{ paddingTop: "10px" }}>
      <div className="card">
        <h5 className="card-header">{project.projectIdentifier}</h5>
        <div className="card-body">
          <div className="row">
            <div className="col-9">
              <h5 className="card-title text-left">{project.projectName}</h5>
              <p className="card-text text-left">{project.description}</p>
            </div>
            <div className="col-3">
              <ul className="list-group">
                <Link
                  className="list-group-item fa fa-edit pr-1"
                  to={`/projectBoard/${project.projectIdentifier}`}
                >
                  &nbsp; Project Board
                </Link>
                <Link
                  className="list-group-item fa fa-flag-checkered pr-1"
                  to={`/updateProject/${project.projectIdentifier}`}
                >
                  &nbsp;Update Project
                </Link>
                <li
                  className="list-group-item fa fa-minus-circle pr-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => onDelete(project.projectIdentifier)}
                >
                  &nbsp;Delete Project
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
