import Header from "./Header";
import ProfilePanel from "./ProfilePanel";
import TaskManager from "./TaskManager";
import { StudentProvider } from "./StudentContext";

function App() {
  return (
    <StudentProvider>
      <Header />
    <div className="move-left">
      <ProfilePanel />
    </div>
      <TaskManager />
    </StudentProvider>
  );
}

export default App;
