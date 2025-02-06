import React, { useCallback, useReducer, useState } from "react";
import { TaskType } from "../../Api/todolistsAPI";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  removeTodoListAC,
  removeTodolistThunk,
  addTodolistThunk,
  changeTodolistTitleThunk
} from "../../state/todolists-reduser";
import {
  addTaskAC,
  removeTaskAC,
  removeTaskThunk,
  addTaskThunk,
  updateTaskThunk,

} from "../../state/task-reduser";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { TaskStatuses } from "../../Api/todolistsAPI";
import { todolistsAPI } from "../../Api/todolistsAPI";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../../state/store";
import { useAppDispatch } from "../AppWithRedux";

export type FilterValueType = "completed" | "all" | "active";
export type TodoListType = {
  title: string;
  id: string;
  filter: FilterValueType;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export const useAppWithRedux = () => {
  console.log("This is App call");
  const dispatch = useAppDispatch();
  const todolists = useSelector<AppRootStateType, Array<TodoListType>>(
    (state) => state.todolists
  );
  const dataObj = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );

  let removeTodoList = (todolistId: string) => {
    const thunk = removeTodolistThunk({todolistId });
    dispatch(thunk);
   
  };

  const addTodolist = useCallback((title: string) => {
    const thunk = addTodolistThunk({title});
    dispatch(thunk);
  }, []);

  const removeTask = useCallback((id: string, todolistid: string) => {
    const thunk = removeTaskThunk({id, todolistid});
    dispatch(thunk);
  }, []);

  const changeTodoListTitle = useCallback((id: string, title: string) => {
    const thunk = changeTodolistTitleThunk({id, title});
    dispatch(thunk);
  }, []);

  const addTask = useCallback((title: string, todolistid: string) => {
    const thunk = addTaskThunk({title, todolistid });
    dispatch(thunk);
  }, []);

  const changeFilter = useCallback(
    (value: FilterValueType, todolistid: string) => {
      const action = changeTodoListFilterAC(todolistid, value);
      console.log(value);
      dispatch(action);
    },
    []
  );

  const changeStatus = useCallback(
    (taskId: string, status: TaskStatuses, todolistid: string) => {
      const action = updateTaskThunk({taskId, domainModel: { status }, todolistid});
      dispatch(action);
    },
    []
  );

  const changeTaskTitle = useCallback(
    (taskId: string, newTtile: string, todolistid: string) => {
      const action = updateTaskThunk({taskId, domainModel: { title: newTtile }, todolistid});
      dispatch(action);
    },
    []
  );

  return {
    dataObj,
    todolists,
    addTodolist,
    removeTask,
    changeTodoListTitle,
    addTask,
    changeFilter,
    changeStatus,
    changeTaskTitle,
    removeTodoList,
  };
};
