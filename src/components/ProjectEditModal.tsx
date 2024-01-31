import { useState } from "react";

interface ProjectEditModalProps {
    project: {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    priority: string;
  };
  onClose: () => void;
}

const ProjectEditModal: React.FC<ProjectEditModalProps> = ({ project, onClose }) => {
    const [editedName, setEditedName] = useState(project.name);
    const [editedDescription, setEditedDescription] = useState(project.description)

    const handleSave = () => {
        onClose();
    };
    const handleDeleteProject = (projectId: number) => {
      const updatedProjects = projects.filter((project) => project.id !== projectId);
      setProjects(updatedProjects);
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-8 rounded-md w-96">
          <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <label className="block mb-2">Description:</label>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <div className="flex justify-end">
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
              Save
            </button>
            <button onClick={onClose} className="ml-2 px-4 py-2 bg-gray-400 text-white rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProjectEditModal;