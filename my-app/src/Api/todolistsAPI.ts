import axios from "axios";
import { CreateTodolist, GetTasks } from "../todolist-api";

const setting = {
  withCredentials: true,
  headers: {
    Authorization: "Bearer 28ed4b9a-1a68-45d8-ba52-d91ad7ecd5c0",
    "API-KEY": "0a031906-c102-4e9e-97f8-e79ff751f5f8",
  },
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...setting,
});

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

type ResponseType<D = {}> = {
  resultCode: number;
  massages: Array<string>;
  data: D;
};

export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type UpdateTaskType = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

type GetTasksResponse = {
  erroe: string | null;
  totalCount: number;
  items: TaskType[];
};

export const todolistsAPI = {
  getTodolist() {
    const promise = instance.get<Array<TodolistType>>("todo-lists");
    return promise;
  },

  createTodolist(title: string) {
    const promise = instance.post<ResponseType<{ item: TodolistType }>>(
      "todo-lists",
      { title: title }
    );
    return promise;
  },

  deleteTodolist(id: string) {
    const promise = instance.delete<ResponseType>(`todo-lists/${id}`);
    return promise;
  },

  updateTodolist(id: string, title: string) {
    const promise = instance.put<ResponseType>(`todo-lists/${id}`, {
      title: title,
    });
    return promise;
  },

  createTask(todolistsId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistsId}/tasks`,
      { title: title }
    );
  },
  getTasks(todolistsId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistsId}/tasks`);
  },
  deleteTask(todolistsId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todolistsId}/tasks/${taskId}`
    );
  },
  updateTask(todolistsId: string, taskId: string,  model: UpdateTaskType) {
    return instance.put<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistsId}/tasks/${taskId}`,
      model
    );
  },
};
