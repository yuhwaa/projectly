import { createContext, useContext, ReactNode } from "react";

interface ProjectContextProps {
    onProjectAdd: () => void;
    onProjectDelete: () => void;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode } & ProjectContextProps> = ({ children, onProjectAdd, onProjectDelete }) => {
    return <ProjectContext.Provider value={{ onProjectAdd, onProjectDelete }}>{children}</ProjectContext.Provider>;
};
    export const useProjectContext = () => {
        const context = useContext(ProjectContext);
        if(!context) {
            throw new Error('useProjectContext must be used within a ProjectProvider');
        }
        return context;  
};