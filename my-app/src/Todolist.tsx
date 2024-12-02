import { useState, ChangeEvent, KeyboardEvent, useCallback } from "react";
import { FilterValueType } from "./App";
import "./TodoList.css";
import React from "react";
import { error } from "console";
import { AdItemForm } from "./input/AdItemForm";
import { title } from "process";
import { EditlbleSpan } from "./span/Span";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TitlePropsType = {
  id: string;
  title: string;
  task: Array<TaskType>;
  
  changeTodoListTitle: (id: string, newTtile: string) => void;
  changeFilter: (value: FilterValueType, todolistid: string) => void;
  addTask: (title: string, todolistid: string) => void;
  removeTask: (id: string, todolistid: string) => void;
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

  filter: FilterValueType;
  removeTodoList: (todolistid: string) => void;
};

export const TodoList = React.memo((props: TitlePropsType) => {
  const onAllFilter = useCallback(() => props.changeFilter("all", props.id),[props.changeFilter, props.id]);
  const onActiveFilter = useCallback(() => props.changeFilter("active", props.id),[props.changeFilter,props.id]);
  const onComletedFilter = useCallback(() => props.changeFilter("completed", props.id),[props.changeFilter, props.id ]);
  const removeTodolist = useCallback(() => {
    props.removeTodoList(props.id);
  },[]);

  const changeTodoListTitle = useCallback((NewTitle: string) => {
    props.changeTodoListTitle(props.id, NewTitle);
  },[props.id, props.changeTodoListTitle]);
  const addTask = useCallback((title: string) => {
    
    props.addTask(title, props.id);
  },[props.addTask, props.id]);

  let tasksForTodolist = props.task
  if (props.filter === "completed") {
    tasksForTodolist = props.task.filter((t) => t.isDone);
  } else if (props.filter === "active") {
    tasksForTodolist = props.task.filter((t) => !t.isDone);
  }

  return (
    <div className="todo-list">
      <h3 className="todo-list-title">
        <EditlbleSpan title={props.title} onChange={changeTodoListTitle} />
        <IconButton aria-label="delete" onClick={removeTodolist} >
                <DeleteIcon />
              </IconButton>
     
      </h3>
      <AdItemForm addTask={addTask} />
      <ul className="task-list">
        {props.task.map(t => 
       <Task
       t={t}
       changeTaskStatus={props.changeTaskStatus}
       changeTaskTitle={props.changeTaskTitle}
       removeTask={props.removeTask}
       todoListid={props.id}
       key={t.id}
       />  
        )}
      </ul>
      <div className="filter-buttons">
        <Button
          onClick={onAllFilter}
          variant={ props.filter === "all"
        ? "contained"
        : "text"}
        >
          All
        </Button>
        <Button
          onClick={onComletedFilter}
          color={"primary"}
          variant={ props.filter === "completed"
        ? "contained"
        : "text"}
        >
          Completed
        </Button>
        <Button
          onClick={onActiveFilter}
          color={"secondary"}
        variant={ props.filter === "active"
        ? "contained"
        : "text"}
        >
          Active
        </Button>
      </div>
    </div>
  );
})

// компонента span

type TaskPropsType={
  removeTask: (id: string, todolistid: string) => void;
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
  t:TaskType
  todoListid: string

}

const Task = React.memo((props: TaskPropsType) => {
  const onRemoveHendler = () => {
    props.removeTask(props.t.id, props.todoListid);
  };
  const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.t.id, e.currentTarget.checked, props.todoListid);
  };

  const onChangeTitleHandler = useCallback((newValue: string) => {
    props.changeTaskTitle(props.t.id, newValue, props.todoListid);
  },[props.t.id, props.todoListid, props.changeTaskTitle]);

  return (
    <li
      key={props.t.id}
      className={`task-item ${props.t.isDone ? "completed" : ""}`}
    >
      <input
        type="checkbox"
        onChange={onChangeCheckHandler}
        checked={props.t.isDone}
      />
      <EditlbleSpan title={props.t.title} onChange={onChangeTitleHandler} />
      <IconButton aria-label="delete" onClick={onRemoveHendler}>
        <DeleteIcon />
      </IconButton>
    </li>
  );
})