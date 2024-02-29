import { createContext, useContext, ReactNode, useState } from "react";
//import { getProjects } from '../projectsData'; 

export interface Project {
  id: number;
  client: string;
  name: string;
  description: string;
  status: string;
  owner: string;
  dueDate: string;
  priority: string;
}

interface ProjectContextProps {
    onProjectAdd: () => void;
    onProjectDelete: () => void;
    //projects: Project | null;
    //setProjects: React.Dispatch<React.SetStateAction<Project | null>>;
    newProject: Project | null; // Define newProject in the context
    setNewProject: React.Dispatch<React.SetStateAction<Project | null>>; // Setter for newProject
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode } & ProjectContextProps> = ({ children, onProjectAdd, onProjectDelete }) => {
  //const [projects, setProjects] = useState(getProjects());
  const [newProject, setNewProject] = useState<Project | null>(null);

  return (
    <ProjectContext.Provider value={{ onProjectAdd, onProjectDelete, newProject, setNewProject }}>
            {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
      throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};