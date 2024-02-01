// projectsData.ts
interface Project {
  id: number;
  client: string;
  name: string;
  description: string;
  status: string;
  owner: string;
  dueDate: string;
  priority: string;
}

let projects: Project[] = [
  { id: 1, client: 'Google', name: 'Project 1', description: 'Description for Project 1', status: 'Backlog', owner: 'Bob', dueDate: '', priority: 'High' },
  { id: 2, client: 'Meta', name: 'Project 2', description: 'Description for Project 2', status: 'In Progress', owner: 'No One', dueDate: '', priority: 'High'  },
  // Add more projects as needed
];

const addProject = (newProject: Project) => {
  projects = [...projects, newProject];
};

const editProject = (updatedProject: Project) => {
  projects = projects.map((project) => (project.id === updatedProject.id ? updatedProject : project));

}

const deleteProject = (deletedProjectId: number) => {
  projects = projects.filter((project) => project.id !== deletedProjectId);
};

const getProjects = () => projects;

export { addProject, getProjects, editProject, deleteProject };