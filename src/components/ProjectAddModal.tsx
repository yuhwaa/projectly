// src/components/ProjectAddModal.tsx
import React, { useState } from 'react';
import { addProject } from '../projectsData'; // Update the path accordingly
import { useProjectContext } from "../context/ProjectContext";

interface ProjectAddModalProps {
  onClose: () => void;
}

const ProjectAddModal: React.FC<ProjectAddModalProps> = ({ onClose }) => {
    const [client, setClient] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Backlog');
    const [owner, setOwner] = useState('No One');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('High');
    const { onProjectAdd } = useProjectContext();

    const handleSave = () => {
    // Handle saving the new project (you can add API calls or state management here)
    const newProject = {
        id: Date.now(),
        client: client,
        name: name,
        description: description,
        status: status,
        owner: owner,
        dueDate: dueDate,
        priority: priority,
    };
    addProject(newProject); // Add the new project to the projects array
    onProjectAdd(); // Inform App.tsx that a new project has been added???
    onClose(); // Close the modal after saving
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4">Add Project</h2>
        {/*Client*/}
        <div className="flex items-center mb-4">
        <label className="mr-2">Client:</label>
        <input
          type="text"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className="w-full p-2 border rounded"
        />
        </div>
        {/*Name*/}
        <div className="flex items-center mb-4">
        <label className="mr-2">Project:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        </div>
        {/*Description*/}
        <label className="block mb-2">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        {/*Status*/}
        <label htmlFor="priority" className="mb-1">
          Status:
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 border rounded-md ml-2 mb-4"
        >
          <option value="high">Backlog</option>
          <option value="medium">In Progress</option>
          <option value="low">Done</option>
        </select>
        {/*Owner*/}
        <div className="flex items-center mb-4">
        <label className="mr-2">Owner:</label>
        <input
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="w-full p-2 border rounded"
        />
        </div>
        {/*Due Date*/}
        <label htmlFor="dueDate" className="mb-1">
          Due Date: 
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-3 py-2 border rounded-md ml-2 mb-4"
        />
        {/*Priority*/}   
        <div>
        <label htmlFor="priority" className="mb-1">
          Priority:
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2 border rounded-md ml-2 mb-4"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        </div>

        <div className="flex justify-end">
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
            Add
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
