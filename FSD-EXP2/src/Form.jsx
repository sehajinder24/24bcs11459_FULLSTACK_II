import { useState } from "react";

function AddTaskForm({ dispatch }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === "") {
      return;
    }

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Date.now(),
        title: title,
        completed: false,
      },
    });

    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New task"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <button type="submit">
        Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;