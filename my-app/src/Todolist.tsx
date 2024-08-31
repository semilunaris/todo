import { useState, ChangeEvent, KeyboardEvent } from "react";
import { filterValueType } from "./App";
import "./TodoList.css";
import React from "react";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TitlePropsType = {
  title: string;
  task: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: filterValueType) => void;
  addTask: (title: string) => void;
};

export function TodoList(props: TitlePropsType) {
  const [newTaskTitle, setTaskeTitle] = useState("");
  const onNewTitleHendlerChabger = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskeTitle(e.currentTarget.value);
  };
  const onKeyPressHendler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.addTask(newTaskTitle);
      setTaskeTitle("");
    }
  };
  const addTask = () => {
    props.addTask(newTaskTitle);
    setTaskeTitle("");
  };
  const onAllFilter = () => props.changeFilter("all");
  const onActiveFilter = () => props.changeFilter("active");
  const onComletedFilter = () => props.changeFilter("completed");

  return (
    <div className="todo-list">
      <h3 className="todo-list-title">{props.title}</h3>
      <div className="input-container">
        <input
          value={newTaskTitle}
          onChange={onNewTitleHendlerChabger}
          onKeyUp={onKeyPressHendler}
          type="text"
          placeholder="Добавить задачу..."
          className="task-input"
        />
        <button className="add-task-button" onClick={addTask}>
          +
        </button>
      </div>
      <ul className="task-list">
        {props.task.map((t) => {
          const onRemoveHendler = () => {
            props.removeTask(t.id);
          };

          return (
            <li
              key={t.id}
              className={`task-item ${t.isDone ? "completed" : ""}`}
            >
              <input
                type="checkbox"
                checked={t.isDone}
                className="task-checkbox"
              />
              <span className="task-title">{t.title}</span>
              <button className="task-remove-button" onClick={onRemoveHendler}>
                ✕
              </button>
            </li>
          );
        })}
      </ul>
      <div className="filter-buttons">
        <button onClick={onAllFilter} className="filter-button">
          All
        </button>
        <button onClick={onComletedFilter} className="filter-button">
          Completed
        </button>
        <button onClick={onActiveFilter} className="filter-button">
          Active
        </button>
      </div>
    </div>
  );
}
