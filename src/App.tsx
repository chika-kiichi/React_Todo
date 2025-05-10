import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Task from "./components/Task";

export const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const tasks: Todo[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    return tasks;
  });
  const [deadline, setDeadline] = useState<string>(JSON.stringify(new Date()));
  const [priority, setPriority] = useState<"高" | "中" | "低">("中");
  const [filter, setFilter] = useState<Filter>("all");

  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, [key]: value };
        } else {
          return todo;
        }
      });
      return newTodos;
    });
  };
  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  };
  const handleEmpty = () => {
    // シャローコピーで事足りる
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };
  const filteredTodos = todos.filter((todo) => {
    // filter ステートの値に応じて異なる内容の配列を返す
    switch (filter) {
      case "all":
        // 削除されていないもの
        return !todo.removed;
      case "checked":
        // 完了済 **かつ** 削除されていないもの
        return todo.finished && !todo.removed;
      case "unchecked":
        // 未完了 **かつ** 削除されていないもの
        return !todo.finished && !todo.removed;
      case "removed":
        // 削除済みのもの
        return todo.removed;
      default:
        return todo;
    }
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(todos));
  }, [todos]);
  return (
    <div>
      <select
        defaultValue="all"
        onChange={(e) => handleFilter(e.target.value as Filter)}
      >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>
      {filter === "removed" ? (
        <button
          onClick={handleEmpty}
          disabled={todos.filter((todo) => todo.removed).length === 0}
        >
          ごみ箱を空にする
        </button>
      ) : (
        filter !== "checked" && (
          <AddTask
            setTodos={setTodos}
            task={task}
            setTask={setTask}
            deadline={deadline}
            setDeadline={setDeadline}
            priority={priority}
            setPriority={setPriority}
          ></AddTask>
        )
      )}
      <table>
        <thead>
          <tr>
            <th>完了</th>
            <th>開始</th>
            <th>タスク</th>
            <th>期限</th>
            <th>優先度</th>
            <th>編集</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((todo) => {
            return <Task key={todo.id} todo={todo} handleTodo={handleTodo} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
