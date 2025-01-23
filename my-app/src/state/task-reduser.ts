import { TasksStateType } from "../App/App";
import { v1 } from "uuid";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "./todolists-reduser";
import { todolistId1, todolistId2 } from "./todolists-reduser";
import { TaskStatuses, TodoTaskPriorities } from "../Api/todolistsAPI";
import { SetTodolistsActionType } from "./todolists-reduser";
import { TaskType } from "../Api/todolistsAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { todolistsAPI, TodolistType } from "../Api/todolistsAPI";
import { UpdateTaskType } from "../Api/todolistsAPI";
import { ApprovalTwoTone } from "@mui/icons-material";
import { AppRootStateType } from "./store";


export type RemoveTaskActionTyp = {
  type: "REMOVE-TASK";
  taskId: string;
  todoListId: string;
};
export type addTaskActionType = {
  type: "ADD-TASK";
  task: TaskType;
};
export type UpdaiteTaskActionType = {
  type: "UPDATE-TASK";
  todoListId: string;
  model: UpdateDomaineTaskModelType
  taskId: string;
};

export type changeTaskTitlesActionType = {
  type: "CHANGE-TASK-TITLE";
  todoListId: string;
  title: string;
  taskId: string;
};

export type SetTasksActionType = {
  type: "SET-TASKS";
  tasks: Array<TaskType>;
  todolistId: string;
};

type ActionsType =
  | RemoveTaskActionTyp
  | addTaskActionType
  | UpdaiteTaskActionType
  | changeTaskTitlesActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = state[action.todoListId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todoListId] = filteredTasks;
      return stateCopy;
    }

    case "ADD-TASK": {
      const stateCopy = { ...state };
      const newTask = action.task;
      const tasks = stateCopy[newTask.todoListId];
      const newTasks = [newTask, ...tasks];
      stateCopy[newTask.todoListId] = newTasks;

      return stateCopy;
    }

    case "UPDATE-TASK": {
      let todolistTasks = state[action.todoListId];
      state[action.todoListId] = todolistTasks.map((t) =>
        t.id === action.taskId ? { ...t, ...action.model } : t
      );

      return { ...state };
    }

    case "CHANGE-TASK-TITLE": {
      let todolistTasks = state[action.todoListId];
      state[action.todoListId] = todolistTasks.map((t) =>
        t.id === action.taskId ? { ...t, title: action.title } : t
      );

      return { ...state };
    }

    case "ADD-TODOLIST": {
      const stateCopy = { ...state };
      stateCopy[action.todolist.id] = [];

      return stateCopy;
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }
    case "SET-TODOLISTS": {
      const stateCopy = { ...state };
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });

      return stateCopy;
    }
    case "SET-TASKS": {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = action.tasks;

      return stateCopy;
    }
    default:
      return state;
  }
};

export const removeTaskAC = (
  taskId: string,
  todoListId: string
): RemoveTaskActionTyp => {
  return { type: "REMOVE-TASK", todoListId, taskId };
};

export const addTaskAC = (task: TaskType): addTaskActionType => {
  return { type: "ADD-TASK", task };
};

export const updaiteTaskAC = (
  taskId: string,
  model: UpdateDomaineTaskModelType,
  todoListId: string
): UpdaiteTaskActionType => {
  return {
    type: "UPDATE-TASK",
    model,
    todoListId,
    taskId,
  };
};


export const setTasksAC = (
  tasks: Array<TaskType>,
  todolistId: string
): SetTasksActionType => {
  return { type: "SET-TASKS", tasks, todolistId };
};

export const fetchTasksThunk = createAsyncThunk(
  "todolists/fetchTasks",
  async (todoListId: string, { dispatch }) => {
    const res = await todolistsAPI.getTasks(todoListId);
    dispatch(setTasksAC(res.data.items, todoListId));
  }
);

export const removeTaskThunk = createAsyncThunk(
  "tasks/deleteTask",
  async (
    { id, todolistid }: { id: string; todolistid: string },
    { dispatch }
  ) => {
    const res = await todolistsAPI.deleteTask(todolistid, id);
    dispatch(removeTaskAC(id, todolistid)); // Диспатчим action
  }
);

export const addTaskThunk = createAsyncThunk(
  "tasks/addTask",
  async (
    { title, todolistid }: { title: string; todolistid: string },
    { dispatch }
  ) => {
    const res = await todolistsAPI.createTask(todolistid, title);
    dispatch(addTaskAC(res.data.data.item)); // Диспатчим action
  }
);


export type UpdateDomaineTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TodoTaskPriorities;
  startDate?: string;
  deadline?: string;
};


export const updateTaskThunk = createAsyncThunk(
  "tasks/addTask",
  async (
    {
      taskId,
      domainModel,
      todolistid,
    }: { taskId: string; domainModel: UpdateDomaineTaskModelType, todolistid: string },
    { dispatch, getState}
  ) => {
    const state = getState() as AppRootStateType
    const task = state.tasks[todolistid].find(t => t.id === taskId)
    if(!task){
      console.warn('task not found')
      return
    }
    const apiModel: UpdateDomaineTaskModelType = {
     deadline: task.deadline,
     description: task.description,
     status: task.status, 
     priority: task.priority,
     startDate: task.startDate,
     title: task.title,
     ...domainModel
  
    }
    const res = await todolistsAPI.updateTask(todolistid, taskId, apiModel);
    dispatch(updaiteTaskAC(taskId, domainModel, todolistid)); // Диспатчим action
  }
);
