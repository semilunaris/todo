import { title } from "process";
import { todolistsAPI, TodolistType } from "../Api/todolistsAPI";

import { v1 } from "uuid";
import { TodoList } from "../Todolist";
import { Dispatch } from "redux";
import React from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TodoListType } from "../AppWithRedux/hooks/useAppWithRedux";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
todolist:TodolistType
};
export type ChangeTodolistActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValueType;
};
export type SetTodolistsActionType = {
  type: "SET-TODOLISTS";
  todolists: Array<TodolistType>;
};
type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType;

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: Array<TodolistDomaineType> = [];

export type FilterValueType = "completed" | "all" | "active";
export type TodolistDomaineType = TodolistType & {
  filter: FilterValueType;
};

export const todolistsReducer = (
  state: Array<TodolistDomaineType> = initialState,
  action: ActionsType
): Array<TodolistDomaineType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id != action.id);
    }
    case "ADD-TODOLIST": {
      const newTodolist: TodolistDomaineType = {...action.todolist, filter: 'all'}
      return [
       newTodolist,
        ...state,
      ];
    }
    case "CHANGE-TODOLIST-TITLE": {
      const todoList = state.find((tl) => tl.id === action.id);
      if (todoList) {
        todoList.title = action.title;
      }
      return [...state];
    }

    case "CHANGE-TODOLIST-FILTER": {
      const todoList = state.find((tl) => tl.id === action.id);
      if (todoList) {
        todoList.filter = action.filter;
      }
      return [...state];
    }

    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => {
        return {
          ...tl,
          filter: "all",
        };
      });
    }

    default:
      return state;
  }
};

export const removeTodoListAC = (
  todoListId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todoListId };
};

export const addTodoListAC = (todolist: TodolistType): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", todolist };
};

export const changeTodoListTitleAC = (
  id: string,
  title: string
): ChangeTodolistActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", title: title, id: id };
};

export const changeTodoListFilterAC = (
  id: string,
  filter: FilterValueType
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter };
};

export const setTodoListsAC = (
  todolists: Array<TodolistType>
): SetTodolistsActionType => {
  return { type: "SET-TODOLISTS", todolists: todolists };
};

export const fetchTodolistsThunk = createAsyncThunk(
  "todolists/fetchTodolists",
  async (_, { dispatch }) => {
    const res = await todolistsAPI.getTodolist();
    dispatch(setTodoListsAC(res.data)); // Диспатчим action
  }
);

export const removeTodolistThunk = createAsyncThunk(
  "todolists/removeTodolist",
  async ({ todolistId }: { todolistId: string }, { dispatch }) => {
    const res = await todolistsAPI.deleteTodolist(todolistId);
    dispatch(removeTodoListAC(todolistId)); // Диспатчим action
  }
);

export const addTodolistThunk = createAsyncThunk(
  "todolists/removeTodolist",
  async ({ title }: { title: string }, { dispatch }) => {
    const res = await todolistsAPI.createTodolist(title);
    dispatch(addTodoListAC(res.data.data.item)); // Диспатчим action
  }
);

export const changeTodolistTitleThunk = createAsyncThunk(
  "todolists/removeTodolist",
  async ({ id, title }: { id:string, title: string }, { dispatch }) => {
    const res = await todolistsAPI.updateTodolist(id,title);
    dispatch(changeTodoListTitleAC(id, title)); // Диспатчим action
  }
);



