import React, { useState } from 'react';
import ProjectList from "./components/ProjectList";
import { getProjects, addProject } from './projectsData'; 

const App: React.FC = () => {
  const [projects, setProjects] = useState(getProjects());
  const handleProjectAdd = () => {
    setProjects(getProjects()); // Update projects state after adding a new project
  };
  return (
    <div>
      <ProjectList projects={projects} onProjectAdd={handleProjectAdd} />
    </div>
  );
};

export default App;