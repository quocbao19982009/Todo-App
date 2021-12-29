interface TodoModel {
  text: string;
  id: string;
  complete: boolean;
  createdAt?: string;
  code?: string;
}

export enum filter {
  all = "all",
  active = "active",
  completed = "completed",
}

export default TodoModel;
