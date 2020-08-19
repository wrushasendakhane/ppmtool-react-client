import React, { useState, useEffect } from "react";
import { getProjects, deleteProject } from "../../actions/projectActions";
import ProjectItem from "../project/projectItem";
import CreateProjectButton from "../project/createProjectButton";
import axios from "axios";
function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getProjects();
      setProjects(data);
    }
    fetchData();
  }, []);

  const handleDelete = async (projectIdentifier) => {
    try {
      await deleteProject(projectIdentifier);
      const { data } = await getProjects();
      setProjects(data);
    } catch (error) {
      setProjects((prevState) => {
        return prevState;
      });
    }
  };
  return (
    <div>
      <h1 className="text-center">Projects</h1>
      <div className="text-left">
        <CreateProjectButton />
      </div>
      <div style={{ paddingTop: "10px" }}>
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
