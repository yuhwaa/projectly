// src/components/ProjectAddModal.tsx
import React, { useState } from 'react';
import { addProject } from '../projectsData'; // Update the path accordingly
import { useProjectContext } from "../context/ProjectContext";

interface ProjectAddModalProps {
  onClose: () => void;
}

const ProjectAddModal: React.FC<ProjectAddModalProps> = ({ onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // const [dueDate, setDueDate] = useState('');
    // const [priority, setPriority] = useState('High');
    const { onProjectAdd } = useProjectContext();

    const handleSave = () => {
    // Handle saving the new project (you can add API calls or state management here)
    const newProject = {
        id: Date.now(),
        name: name,
        description: description,
        // dueDate,
        // Priority,
    };
    addProject(newProject); // Add the new project to the projects array
    onProjectAdd(); // Inform App.tsx that a new project has been added???
    onClose(); // Close the modal after saving
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4">Add Project</h2>
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="block mb-2">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

export default ProjectAddModal;
