import { v1 } from "uuid";
import React, { useCallback, useReducer, useState } from "react";

import { TaskType } from "../../Todolist";

import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todolistsReducer,
} from "../../state/todolists-reduser";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "../../state/task-reduser";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "../../state/store";

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
    console.log('This is App call')
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodoListType>>(
      (state) => state.todolists
    );
    const dataObj = useSelector<AppRootState, TasksStateType>(
      (state) => state.tasks
    );
  
    let removeTodoList = (todolistid: string) => {
      const action = removeTodoListAC(todolistid);
      dispatch(action);
      dispatch(action);
    };
  
    const addTodolist = useCallback((title: string) => {
      const action = addTodoListAC(title);
      dispatch(action);
    }, [])
    
    const removeTask =useCallback( (id: string, todolistid: string) => {
    const action = removeTaskAC(id, todolistid);
    dispatch(action);
    },[])
  
    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
      const action = changeTodoListTitleAC(id, newTitle);
      dispatch(action);
    },[])
  
    const addTask = useCallback((title: string, todolistid: string) => {
      const action = addTaskAC(title, todolistid);
      dispatch(action);
    },[])
  
    const changeFilter = useCallback((value: FilterValueType, todolistid: string) => {
      const action = changeTodoListFilterAC(todolistid, value);
      dispatch(action);
    },[])
  
    const changeStatus = useCallback((taskId: string, isDone: boolean, todolistid: string)=> {
      const action = changeTaskStatusAC(taskId, isDone, todolistid);
      dispatch(action);
    },[])
  
    const changeTaskTitle = useCallback((
      taskId: string,
      newTitle: string,
      todolistid: string
    ) => {
      const action = changeTaskTitleAC(taskId, newTitle, todolistid);
      dispatch(action);
    },[])

    return {dataObj, todolists, addTodolist, removeTask, changeTodoListTitle, addTask, changeFilter, changeStatus, changeTaskTitle, removeTodoList }
}