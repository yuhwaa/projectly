import { useState } from "react";
import ProjectAddModal from './ProjectAddModal';
import ProjectEditModal from "./ProjectEditModal";

interface Project {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    priority: string;
}

interface ProjectListProps {
    projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    
    const handleEditProject = (project: Project) => {
        setSelectedProject(project);
        setIsEditModalOpen(true);
  };
    const handleAddProject = () => {
        setIsAddModalOpen(true);
  };
    const handleDeleteProject = () => {
        
    }
  return (
    <div>
        <button onClick={handleAddProject} className="mb-4 px-4 py-2 bg-green-500 text-white rounded">Add Project</button>
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        <div className="grid gap-4">
        <ul>
        {projects.map((project) => (
          <li key={project.id}>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
            <p className="mb-2">{project.description}</p>
            <p className="mb-2">Due Date: {project.dueDate}</p>
            <p className="mb-2">Priority: {project.priority}</p>
            <button
              onClick={() => handleEditProject(project)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteProject(project.id)}
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