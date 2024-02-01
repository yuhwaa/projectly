import { useState } from "react";
import { editProject } from '../projectsData';
import { useProjectContext } from "../context/ProjectContext";

interface ProjectEditModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectEditModal: React.FC<ProjectEditModalProps> = ({ project, onClose }) => {
    const [editedClient, setEditedClient] = useState(project.client);
    const [editedName, setEditedName] = useState(project.name);
    const [editedDescription, setEditedDescription] = useState(project.description);
    const [editedStatus, setEditedStatus] = useState(project.status);
    const [editedOwner, setEditedOwner] = useState(project.owner);
    const [editedDueDate, setEditedDueDate] = useState(project.dueDate);
    const [editedPriority, setPriority] = useState(project.priority);
    const { onProjectAdd } = useProjectContext();

    const handleSave = () => {
      const updatedProject = {
        ...project,
        client: editedClient,
        name: editedName,
        description: editedDescription,
        status: editedStatus,
        owner: editedOwner,
        dueDate: editedDueDate,
        priority: editedPriority,
      }
        editProject(updatedProject);
        onProjectAdd();
        onClose();
    };

    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-8 rounded-md w-96">
          <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
          {/*Client*/}
          <div className="flex items-center mb-4">
          <label className="mr-2">Client:</label>
          <input
          type="text"
          value={editedClient}
          onChange={(e) => setEditedClient(e.target.value)}
          className="w-full p-2 border rounded"
          />
          </div>
          {/*Name*/}
          <div className="flex items-center mb-4">
          <label className="mr-2">Project:</label>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          </div>
          {/*Description*/}
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