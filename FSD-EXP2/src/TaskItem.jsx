import { memo } from "react";

function TaskItem({ task, dispatch }) {
  return (
    <div>
      <span>
        {task.completed ? "[x]" : "[ ]"} {task.title}
      </span>

      <button onClick={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}>
        Toggle
      </button>

      <button onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}>
        Delete
      </button>
    </div>
  );
}

export default memo(TaskItem);
