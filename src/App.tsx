import React, { useState } from 'react';
import ProjectList from "./components/ProjectList";
import { getProjects } from './projectsData'; 
import { ProjectProvider } from "./context/ProjectContext";

const App: React.FC = () => {
  const [projects, setProjects] = useState(getProjects());
  const handleProjectAdd = () => {
    setProjects(getProjects()); // Update projects state after adding a new project
  };
  const handleProjectDelete = () => {
    setProjects(getProjects());
  }
  return (
    <ProjectProvider onProjectAdd={handleProjectAdd} onProjectDelete={handleProjectDelete}>
      <div>
        <ProjectList projects={projects} />
      </div>
    </ProjectProvider>

  );
};

export default App;