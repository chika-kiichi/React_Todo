declare type Todo = {
  value: string;
  readonly id: number;
  started: boolean;
  finished: boolean;
  deadline: string;
  priority: "高" | "中" | "低";
  removed: boolean;
};
