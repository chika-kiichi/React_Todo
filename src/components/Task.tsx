import { useState } from "react";
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
  const [edit, setEdit] = useState(false);
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
      {edit ? (
        <>
          <td>
            <input
              type="text"
              value={todo.value}
              onChange={(e) => handleTodo(todo.id, "value", e.target.value)}
            />
          </td>
          <td>
            <input
              type="date"
              value={`${deadlineDate.getFullYear()}-${(
                "0" +
                (deadlineDate.getMonth() + 1)
              ).slice(-2)}-${("0" + deadlineDate.getDate()).slice(-2)}`}
              onChange={(e) => {
                const date = new Date(e.target.value);
                const dateString = `${date.getFullYear()}-${(
                  "0" +
                  (date.getMonth() + 1)
                ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
                handleTodo(todo.id, "deadline", dateString);
              }}
            />
          </td>
          <td>
            <select
              name="priority"
              value={todo.priority}
              onChange={(e) =>
                handleTodo(
                  todo.id,
                  "priority",
                  e.target.value as "高" | "中" | "低"
                )
              }
            >
              <option value="高" label="高">
                高
              </option>
              <option value="中" label="中">
                中
              </option>
              <option value="低" label="低">
                低
              </option>
            </select>
          </td>
        </>
      ) : (
        <>
          <td>{todo.value}</td>
          <td>{`${deadlineDate.getMonth() + 1}/${deadlineDate.getDate()}`}</td>
          <td>{todo.priority}</td>
        </>
      )}
      <td>
        <button onClick={() => setEdit(!edit)}>{edit ? "保存" : "編集"}</button>
      </td>
      <td>
        <button onClick={() => handleTodo(todo.id, "removed", !todo.removed)}>
          {todo.removed ? "復元" : "削除"}
        </button>
      </td>
    </tr>
  );
};
export default Task;
