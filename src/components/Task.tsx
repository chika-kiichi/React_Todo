export const Task = ({
  todo,
  handleTodo,
}: {
  todo: Todo;
  handleTodo: <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => void;
}) => {
  const deadlineDate = new Date(todo.deadline);
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          disabled={todo.removed}
          checked={todo.finished}
          onChange={() => handleTodo(todo.id, "finished", !todo.finished)}
        />
      </td>
      <td>
        <input
          type="checkbox"
          disabled={todo.removed}
          checked={todo.started}
          onChange={() => handleTodo(todo.id, "started", !todo.started)}
        />
      </td>
      <td>{todo.value}</td>
      <td>{`${deadlineDate.getMonth() + 1}/${deadlineDate.getDate()}`}</td>
      <td>{todo.priority}</td>
      <td>編集</td>
      <td>
        <button onClick={() => handleTodo(todo.id, "removed", !todo.removed)}>
          {todo.removed ? "復元" : "削除"}
        </button>
      </td>
    </tr>
  );
};
export default Task;
