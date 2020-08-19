import React, { useEffect, useState } from "react";
import ProjectTask from "./projectTask";
import { getBacklog, deleteProjectTask } from "../../../actions/backlogActions";

function Backlog({ projectIdentifier }) {
  const [backlog, setBacklog] = useState([]);

  const [todoItems, setTodoItems] = useState([]);
  const [inProgressItems, setInProgressItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);

  const [errors, setErrors] = useState({});

  const handleDelete = async (projectSequence) => {
    try {
      await deleteProjectTask(projectIdentifier, projectSequence);

      setTodoItems([]);
      setInProgressItems([]);
      setDoneItems([]);
      setBacklog((prevState) => {
        return prevState.filter(
          (task) => task.projectSequence !== projectSequence
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Backlog dependency useEffect getting called");
    backlog.forEach((task) => {
      if (task.status === "TO_DO") {
        setTodoItems((prevState) => [
          ...prevState,
          <ProjectTask
            key={task.id}
            projectTask={task}
            onDelete={handleDelete}
          />,
        ]);
      } else if (task.status === "IN_PROGRESS") {
        setInProgressItems((prevState) => [
          ...prevState,
          <ProjectTask
            key={task.id}
            projectTask={task}
            onDelete={handleDelete}
          />,
        ]);
      } else if (task.status === "DONE") {
        setDoneItems((prevState) => [
          ...prevState,
          <ProjectTask
            key={task.id}
            projectTask={task}
            onDelete={handleDelete}
          />,
        ]);
      }
    });
  }, [backlog]);

  useEffect(() => {
    console.log("Initial useEffect hook getting called");
    async function fetchData() {
      try {
        const { data } = await getBacklog(projectIdentifier);
        setBacklog((prevState) => [...prevState, ...data]);
      } catch (error) {
        if (!error.response) {
          let errorOject = JSON.parse(error.message);
          if (errorOject.projectNotFound) {
            setErrors(errorOject);
          }
        } else {
          setErrors(error.response.data);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      {errors && errors.projectNotFound ? (
        <div className="alert alert-danger text-center">
          {errors.projectNotFound}
        </div>
      ) : (
        <div className="row">
          <div className="col-md-4">
            <div className="card bg-light">
              <div className="card-header text-center">TO DO</div>
            </div>
            {todoItems}
          </div>
          <div className="col-md-4">
            <div className="card bg-primary">
              <div className="card-header text-center">IN PROGRESS</div>
            </div>
            {inProgressItems}
          </div>
          <div className="col-md-4">
            <div className="card bg-success">
              <div className="card-header text-center">DONE</div>
            </div>
            {doneItems}
          </div>
        </div>
      )}
    </div>
  );
}

export default Backlog;
