import { useState, useEffect, useCallback, useRef } from "react";
import ProjectAddModal from './ProjectAddModal';
import ProjectEditModal from "./ProjectEditModal";
import { Project, addProject, deleteProject } from '../projectsData';
import { useProjectContext } from "../context/ProjectContext";

interface ProjectListProps {
    projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
    const { onProjectAdd } = useProjectContext();
    //destructuring assignment. useProjectContext() is a custom hook created to access the values from ProjectContext. 
    //useProjectContext hook returns an object with a property onProjectAdd (the value from the ProjectContext). By using { onProjectAdd }, you're saying, "Extract the onProjectAdd property from the object returned by useProjectContext and assign it to a variable named onProjectAdd."
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const newProjectRef = useRef<HTMLLIElement | null>(null);
    
    // Define handleProjectAdd using useCallback to ensure the latest projects array is used
    const handleProjectAdd = useCallback((newProject: Project) => {
    // Scroll to the newly added project
    if (newProjectRef.current) {
      newProjectRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Temporarily highlight the newly added project
      newProjectRef.current.classList.add('bg-red-400'); // Add a highlight class
      setTimeout(() => {
        newProjectRef.current?.classList.remove('bg-red-400'); // Remove the highlight class after a delay
      }, 3000); // Adjust the timeout duration as needed
    }
  }, []);

    
    const handleEditClick = (project: Project) => {
        setSelectedProject(project);
        setIsEditModalOpen(true);
  };
    const handleAddClick = () => {
        setIsAddModalOpen(true);
  };
    const handleDeleteClick = (deletedProjectId: number) => {
        deleteProject(deletedProjectId);
        onProjectAdd();//notifies higher-level components
    }

  return (
    <div>
        <button onClick={handleAddClick} className="fixed right-0 m-4 px-4 py-2 bg-green-500 text-white rounded">Add Project</button>
        <h1 className="text-xl font-semibold mb-2 p-4">Projects</h1>
        <div className="grid gap-4">
        <ul>
        {projects.map((project) => (
          <li 
            key={project.id} 
            id={`project-${project.id}`}
            ref={project.id === projects[projects.length - 1].id ? newProjectRef : null}
            className=""
          >
          <div 
            className="rounded-lg shadow-md p-4 m-4" 
          >
          <p className="mb-2">Client: <span className="text-md font-semibold mb-2">{project.client}</span></p>
            <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
            <p className="mb-2">{project.description}</p>
            <p className="mb-2">Status: {project.status}</p>
            <p className="mb-2">Owner: {project.owner}</p>
            <p className="mb-2">Due Date: {project.dueDate}</p>
            <p className="mb-2">Priority: {project.priority}</p>
            <button
              onClick={() => handleEditClick(project)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteClick(project.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
          </li>
        ))}
        </ul>
        {isEditModalOpen && selectedProject && (
          <ProjectEditModal
            project={selectedProject}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
        {isAddModalOpen && (
            <ProjectAddModal
              onClose={() => setIsAddModalOpen(false)}
              handleProjectAdd={handleProjectAdd}
            />
        )}
      </div>
    </div>
  )
}
export default ProjectList;