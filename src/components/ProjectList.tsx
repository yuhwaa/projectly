import { useState, useEffect, useCallback, useRef } from "react";
import ProjectAddModal from './ProjectAddModal';
import ProjectEditModal from './ProjectEditModal';
import { Project, deleteProject } from '../projectsData';
import { useProjectContext } from "../context/ProjectContext";

interface ProjectListProps {
    projects: Project[];
    //newProject: Project | null; // Add newProject prop
    //setNewProject: React.Dispatch<React.SetStateAction<Project | null>>; // Add setNewProject prop
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
    const { onProjectAdd, newProject, setNewProject } = useProjectContext(); // Access newProject from context
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const newProjectRef = useRef<HTMLLIElement | null>(null);

    const setNewProjectRef = useCallback((node: HTMLLIElement | null) => {
      newProjectRef.current = node;
      if (node) {
          //newProjectRef.current = node;
          // Scroll and highlight the newly added project
          //if (node.id === `project-${newProject?.id}`) {
              node.scrollIntoView({ behavior: 'smooth', block: 'start' });
              node.classList.add('bg-green-100'); // Highlight the new project
              setTimeout(() => {
                  node.classList.remove('bg-green-100'); // Remove highlight after 3 seconds
              }, 3000);
              setNewProject(null); // Reset newProject after highlighting
          //}
      }
  }, [newProject, setNewProject]);

//   useEffect(() => {
//     // Scroll and highlight the newly added project when newProject changes
//     if (newProject) {
//         const node = document.getElementById(`project-${newProject.id}`);
//         if (node) {
//             node.scrollIntoView({ behavior: 'smooth', block: 'start' });
//             node.classList.add('bg-red-400'); // Highlight the new project
//             setTimeout(() => {
//                 node.classList.remove('bg-red-400'); // Remove highlight after 3 seconds
//             }, 3000);
//             setNewProject(null);
//         }
//     }
// }, [newProject, setNewProject]);
    
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
            ref={newProject && project.id === newProject.id ? setNewProjectRef : null}          
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
            />
        )}
      </div>
    </div>
  )
}
export default ProjectList;