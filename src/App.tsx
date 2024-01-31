import ProjectList from "./components/ProjectList";
import projects from './projectsData';

const App: React.FC = () => {
  return (
    <div>
      <ProjectList projects={projects} />
    </div>
  );
};

export default App;