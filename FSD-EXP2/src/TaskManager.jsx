import { useReducer } from "react";
import AddTaskForm from "./Form";
import TaskList from "./TaskList";
import TaskStats from "./TaskStats";

const initialTasks = [
  { id: 1, title: "Finish DBMS assignment", completed: false },
  { id: 2, title: "Revise React hooks", completed: false },
  { id: 3, title: "Submit lab report", completed: true },
];

function taskReducer(state, action) {
  switch (action.type) {
    case "SET_TASKS":
      return action.payload;
    case "ADD_TASK":
      return [...state, action.payload];
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}

function TaskManager() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  return (
    <section>
      <h2>Tasks</h2>
      <TaskStats tasks={tasks} />
      <AddTaskForm dispatch={dispatch} />
      <TaskList tasks={tasks} dispatch={dispatch} />
    </section>
  );
}

export default TaskManager;
