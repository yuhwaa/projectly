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
  { id: 1, client: 'Microsoft', name: 'Example Project 1', description: 'Description for Project 1', status: 'Backlog', owner: 'Bob', dueDate: '2026-10-11', priority: 'High' },
  //{ id: 2, client: 'Meta', name: 'Example Project 2', description: 'Description for Project 2', status: 'In Progress', owner: 'Daisy', dueDate: '2024-02-28', priority: 'Low'  },
  // Add more projects as needed
];

const addProject = (newProject: Project) => {
  projects = [...projects, newProject];
};

const getProjects = (): Project[] => {
  //sort projects by dueDate in ascending order
  return projects.slice().sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
};

const editProject = (updatedProject: Project) => {
  projects = projects.map((project) => (project.id === updatedProject.id ? updatedProject : project));

}

const deleteProject = (deletedProjectId: number) => {
  projects = projects.filter((project) => project.id !== deletedProjectId);
};

export { addProject, getProjects, editProject, deleteProject };