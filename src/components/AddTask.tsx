export const AddTask = ({
  setTodos,
  task,
  setTask,
  deadline,
  setDeadline,
  priority,
  setPriority,
}: {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  deadline: Date;
  setDeadline: React.Dispatch<React.SetStateAction<Date>>;
  priority: "高" | "中" | "低";
  setPriority: React.Dispatch<React.SetStateAction<"高" | "中" | "低">>;
}) => {
  const handleSubmit = () => {
    if (!task) return;
    const newTodo: Todo = {
      value: task,
      id: new Date().getTime(),
      started: false,
      finished: false,
      deadline: deadline || new Date(),
      priority: priority,
      removed: false,
    };
    setTodos((todos) => [newTodo, ...todos]);
    setTask("");
    setDeadline(new Date());
    setPriority("中");
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="date"
          value={`${deadline.getFullYear()}-${(
            "0" +
            (deadline.getMonth() + 1)
          ).slice(-2)}-${("0" + deadline.getDate()).slice(-2)}`}
          onChange={(e) => {
            const date = new Date(e.target.value);
            setDeadline(date);
          }}
        />
        <select
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as "高" | "中" | "低")}
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
        <input type="submit" value="追加" onSubmit={handleSubmit} />
      </form>
    </>
  );
};
export default AddTask;
