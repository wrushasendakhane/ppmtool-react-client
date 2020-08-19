import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addProjectTask } from "../../../actions/backlogActions";
import classnames from "classnames";
import _ from "lodash";

function AddProjectTask({ match, history }) {
  const projectIdentifier = match.params.id;

  const [projectTask, setProjectTask] = useState({
    summary: "",
    acceptanceCriteria: "",
    dueDate: "",
    priority: 0,
    status: "",
    projectIdentifier: projectIdentifier,
  });

  const [errors, setErrors] = useState([]);

  const onChange = (e) => {
    const newProjectTask = {
      ...projectTask,
      [e.target.name]: e.target.value,
    };
    setProjectTask(newProjectTask);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProjectTask(projectTask);
      history.replace(`/projectBoard/${projectIdentifier}`);
    } catch (error) {
      setErrors({ ...error.response.data });
    }
  };

  return (
    <div className="container">
      <Link
        to={`/projectBoard/${projectIdentifier}`}
        className="btn btn-secondary btn-sm mt-2"
      >
        Back to Project Board
      </Link>
      <h2 className="text-center">Add Project Task</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <input
            type="text"
            name="summary"
            className={classnames("form-control", {
              "is-invalid": errors.summary,
              "is-valid": !_.isEmpty(errors) && !errors.summary,
            })}
            placeholder="Project Task Summary"
            value={projectTask.summary}
            onChange={onChange}
          />
          {errors.summary && (
            <div className="invalid-feedback">{errors.summary}</div>
          )}
        </div>
        <div className="form-group row">
          <textarea
            name="acceptanceCriteria"
            className={classnames("form-control", {
              "is-invalid": errors.acceptanceCriteria,
              "is-valid": !_.isEmpty(errors) && !errors.acceptanceCriteria,
            })}
            placeholder="Acceptance Criteria"
            value={projectTask.acceptanceCriteria}
            onChange={onChange}
          />
          {errors.acceptanceCriteria && (
            <div className="invalid-feedback">{errors.acceptanceCriteria}</div>
          )}
        </div>
        <div className="form-group row">
          <label htmlFor="dueDate" className="col-md-2 col-form-label">
            Due Date
          </label>
          <div className="col-md-10">
            <input
              type="date"
              name="dueDate"
              className={classnames("form-control", {
                "is-invalid": errors.dueDate,
                "is-valid": !_.isEmpty(errors) && !errors.dueDate,
              })}
              value={projectTask.dueDate}
              onChange={onChange}
            />
            {errors.dueDate && (
              <div className="invalid-feedback">{errors.dueDate}</div>
            )}
          </div>
        </div>
        <div className="form-group row">
          <select
            name="priority"
            className={classnames("form-control", {
              "is-invalid": errors.priority,
              "is-valid": !_.isEmpty(errors) && !errors.priority,
            })}
            value={projectTask.priority}
            onChange={onChange}
          >
            <option value={0}>Select Priority</option>
            <option value={3}>LOW</option>
            <option value={2}>MEDIUM</option>
            <option value={1}>HIGH</option>
          </select>
          {errors.priority && (
            <div className="invalid-feedback">{errors.priority}</div>
          )}
        </div>
        <div className="form-group row">
          <select
            name="status"
            className={classnames("form-control", {
              "is-invalid": errors.status,
              "is-valid": !_.isEmpty(errors) && !errors.status,
            })}
            value={projectTask.status}
            onChange={onChange}
          >
            <option value="">Select Status</option>
            <option value="TO_DO">TO DO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
          {errors.status && (
            <div className="invalid-feedback">{errors.status}</div>
          )}
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddProjectTask;
