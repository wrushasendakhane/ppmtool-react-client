import React from "react";
import { Link } from "react-router-dom";

const CreateProjectButton = () => {
  return (
    <Link to="/addProject" className="btn btn-info btn-sm">
      Create Project
    </Link>
  );
};

export default CreateProjectButton;
