import React, { useState, useEffect } from "react";
import _ from "lodash";
import classnames from "classnames";
import { saveProject, getProject } from "../../actions/projectActions";

function UpdateProject({ match, history }) {
  const [project, setProject] = useState({
    id: "",
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getProject(match.params.id);
        setProject(data);
      } catch (error) {
        setErrors({ ...error.response.data });
      }
    }
    fetchData();
  }, []);

  const onChange = (e) => {
    const newProject = {
      ...project,
      [e.target.name]: e.target.value,
    };
    setProject(newProject);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveProject(project);
      history.replace("/dashboard");
    } catch (error) {
      setErrors({ ...error.response.data });
    }
  };
  return (
    <div>
      <h1 className="text-center">Update Project Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <input
            type="text"
            className={classnames("form-control", {
              "is-invalid": errors.projectName,
              "is-valid": !_.isEmpty(errors) && !errors.projectName,
            })}
            name="projectName"
            value={project.projectName}
            autoFocus={true}
            placeholder="Project Name"
            onChange={onChange}
          />
          {errors.projectName && (
            <div className="invalid-feedback">{errors.projectName}</div>
          )}
        </div>
        <div className="form-group row">
          <input
            type="text"
            className={classnames("form-control", {
              "is-invalid": errors.projectIdentifier,
              "is-valid": !_.isEmpty(errors) && !errors.projectIdentifier,
            })}
            name="projectIdentifier"
            value={project.projectIdentifier}
            placeholder="Project Identifier"
            onChange={onChange}
          />
          {errors.projectIdentifier && (
            <div className="invalid-feedback">{errors.projectIdentifier}</div>
          )}
        </div>
        <div className="form-group row">
          <textarea
            className={classnames("form-control", {
              "is-invalid": errors.description,
              "is-valid": !_.isEmpty(errors) && !errors.description,
            })}
            name="description"
            value={project.description}
            placeholder="Description"
            onChange={onChange}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>
        <div className="form-group row">
          <label htmlFor="start_date" className="col-sm-2 col-form-label">
            Start Date
          </label>
          <div className="col-sm-10">
            <input
              type="date"
              className={classnames("form-control", {
                "is-invalid": errors.start_date,
                "is-valid": !_.isEmpty(errors) && !errors.start_date,
              })}
              name="start_date"
              value={project.start_date || ""}
              onChange={onChange}
            />
          </div>
          {errors.start_date && (
            <div className="invalid-feedback">{errors.start_date}</div>
          )}
        </div>
        <div className="form-group row">
          <label htmlFor="end_date" className="col-sm-2 col-form-label">
            End Date
          </label>
          <div className="col-sm-10">
            <input
              type="date"
              className={classnames("form-control", {
                "is-invalid": errors.end_date,
                "is-valid": !_.isEmpty(errors) && !errors.end_date,
              })}
              name="end_date"
              value={project.end_date || ""}
              onChange={onChange}
            />
          </div>
          {errors.end_date && (
            <div className="invalid-feedback">{errors.end_date}</div>
          )}
        </div>
        <button className="btn btn-primary btn-lg" type="submit">
          Update Project
        </button>
      </form>
    </div>
  );
}

export default UpdateProject;
