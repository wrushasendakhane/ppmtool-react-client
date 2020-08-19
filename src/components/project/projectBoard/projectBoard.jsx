import React from "react";
import { Link } from "react-router-dom";
import Backlog from "./backlog";

function ProjectBoard({ match }) {
  const projectIdentifier = match.params.id;

  return (
    <div className="container">
      <Link
        to={`/addProjectTask/${projectIdentifier}`}
        className="btn btn-primary mt-2 fa fa-plus-circle pr-1"
      >
        &nbsp;Create Project Task
      </Link>
      <br />
      <hr />
      <Backlog projectIdentifier={projectIdentifier} />
    </div>
  );
}

export default ProjectBoard;
