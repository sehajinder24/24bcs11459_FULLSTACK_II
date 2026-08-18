import { useTaskStats } from "./useTaskStats";

function TaskStats({ tasks }) {
  const { total, remaining } = useTaskStats(tasks);

  return (
    <p>
      Tasks ({remaining} remaining / {total} total)
    </p>
  );
}

export default TaskStats;
