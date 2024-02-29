import { createContext, useContext, ReactNode, useState } from "react";

interface ProjectContextProps {
    onProjectAdd: () => void;
    onProjectDelete: () => void;
    //newProjectContext: Project | null; // Define newProject in the context
}

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
  
interface NewProjectContextProps {
  newProject: Project | null;
  setNewProject: React.Dispatch<React.SetStateAction<Project | null>>;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);
const NewProjectContext = createContext<NewProjectContextProps | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode } & ProjectContextProps> = ({ children, onProjectAdd, onProjectDelete }) => {
    const [newProject, setNewProject] = useState<Project | null>(null);

  return (
    <ProjectContext.Provider value={{ onProjectAdd, onProjectDelete }}>
      <NewProjectContext.Provider value={{ newProject, setNewProject }}>
        {children}
      </NewProjectContext.Provider>
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

export const useNewProjectContext = () => {
  const context = useContext(NewProjectContext);
  if (!context) {
    throw new Error('useNewProjectContext must be used within a ProjectProvider');
  }
  return context;
};