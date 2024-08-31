import { v1 } from "uuid";
import React, { useState } from "react";
import "./App.css";
import { TodoList } from "./Todolist";
import { TaskType } from "./Todolist";
import { title } from "process";
export type filterValueType = "completed" | "all" | "active";

function App() {
  let task2: Array<TaskType> = [
    { id: v1(), title: "Spiderman", isDone: true },
    { id: v1(), title: "Batman", isDone: false },
    { id: v1(), title: "Aquaman", isDone: true },
  ];

  let task3: Array<TaskType> = [
    { id: v1(), title: "English Man in New York", isDone: true },
    { id: v1(), title: "Blue Train", isDone: true },
    { id: v1(), title: "Неваляшка", isDone: false },
  ];

  let [data, setData] = useState([
    { id: v1(), title: "js", isDone: true },
    { id: v1(), title: "Css", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redax", isDone: false },
    { id: v1(), title: "Python", isDone: false },
  ]);
  let [filter, setFilter] = useState<filterValueType>("all");

  let tasksForTodo = data;
  console.log(data);
  if (filter === "completed") {
    tasksForTodo = data.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodo = data.filter((t) => t.isDone === false);
  }

  function removeTask(id: string) {
    console.log(id);
    let dataFilter = data.filter((t) => t.id !== id);

    setData(dataFilter);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks =[newTask, ...data]
    setData(newTasks)
    
  }

  function changeFilter(value: filterValueType) {
    setFilter(value);
  }

  return (
    <div className="App">
      <div className="todo-container">
        <TodoList
          title="books"
          task={tasksForTodo}
          removeTask={removeTask}
          changeFilter={changeFilter}
          addTask = {addTask}
        />
        <TodoList
          title="movies"
          task={task2}
          removeTask={removeTask}
          changeFilter={changeFilter}
          addTask = {addTask}
        />
        <TodoList
          title="songs"
          task={task3}
          removeTask={removeTask}
          changeFilter={changeFilter}
          addTask = {addTask}
        />
      </div>
    </div>
  );
}

export default App;
