import { useState, ChangeEvent, KeyboardEvent } from "react";
import { filterValueType } from "./App";
import "./TodoList.css";
import React from "react";
import { error } from "console";
import { AdItemForm } from "./input/AdItemForm";
import { title } from "process";
import { EditlbleSpan } from "./span/Span";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TitlePropsType = {
  id: string;
  title: string;
  task: Array<TaskType>;
  removeTask: (id: string, todolistid: string) => void;
  changeTodoListTitle: (id: string, newTtile: string) => void;
  changeFilter: (value: filterValueType, todolistid: string) => void;
  addTask: (title: string, todolistid: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistid: string
  ) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistid: string
  ) => void;
  filter: filterValueType;
  removeTodoList: (todolistid: string) => void;
  
};

export function TodoList(props: TitlePropsType) {
 
 
  const onAllFilter = () => props.changeFilter("all", props.id);
  const onActiveFilter = () => props.changeFilter("active", props.id);
  const onComletedFilter = () => props.changeFilter("completed", props.id);
  const removeTodolist = () => {
    props.removeTodoList(props.id);
  };
   
  const changeTodoListTitle = (NewTitle: string) => {
    props.changeTodoListTitle(props.id, NewTitle);
  };
  const addTask  = (title: string) => {
    props.addTask(title, props.id)
  }

  return (
    <div className="todo-list">
      <h3 className="todo-list-title">
        <EditlbleSpan title={props.title} onChange={changeTodoListTitle}/>
        
        <button onClick={removeTodolist}>x</button>
      </h3>
      <AdItemForm  addTask={addTask}/>
      <ul className="task-list">
        {props.task.map((t) => {
          const onRemoveHendler = () => {
            props.removeTask(t.id, props.id);
          };
          const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
          };
       
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          };

          return (
            <li
              key={t.id}
              className={`task-item ${t.isDone ? "completed" : ""}`}
            >
              <input
                type="checkbox"
                onChange={onChangeCheckHandler}
                checked={t.isDone}
              />
              <EditlbleSpan title ={t.title} onChange={onChangeTitleHandler}/>
              <button className="task-remove-button" onClick={onRemoveHendler}>
                x
              </button>
            </li>
          );
        })}
      </ul>
      <div className="filter-buttons">
        <button
          onClick={onAllFilter}
          className={
            props.filter === "all"
              ? "filter-button active-filter"
              : "filter-button"
          }
        >
          All
        </button>
        <button
          onClick={onComletedFilter}
          className={
            props.filter === "completed"
              ? "filter-button active-filter"
              : "filter-button"
          }
        >
          Completed
        </button>
        <button
          onClick={onActiveFilter}
          className={
            props.filter === "active"
              ? "filter-button active-filter"
              : "filter-button"
          }
        >
          Active
        </button>
      </div>
    </div>
  );
}

// компонента span


