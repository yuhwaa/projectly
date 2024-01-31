// projectsData.ts
interface Project {
  id: number;
  name: string;
  description: string;
  // dueDate: string;
  // priority: string;
}

let projects: Project[] = [
  { id: 1, name: 'Project 1', description: 'Description for Project 1' },
  { id: 2, name: 'Project 2', description: 'Description for Project 2' },
  // Add more projects as needed
];

const addProject = (newProject: Project) => {
  projects = [...projects, newProject];
};

const getProjects = () => projects;

export { addProject, getProjects };