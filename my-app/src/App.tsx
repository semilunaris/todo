import React from "react";
import "./App.css";
import { TodoList } from "./Todolist";
import { TaskType } from "./Todolist";


let task1: Array<TaskType> = [
  {id: 1, title: 'Css', isDone: true},
  {id: 1, title: 'js', isDone: true},
  {id: 1, title: 'React', isDone: false}
]

let task2: Array<TaskType> = [
  {id: 1, title: 'Spiderman', isDone: true},
  {id: 1, title: 'Batman', isDone: false},
  {id: 1, title: 'Aquaman', isDone: true}
]

let task3: Array<TaskType> = [
  {id: 1, title: 'English Man in New York', isDone: true},
  {id: 1, title: 'Blue Train', isDone: true},
  {id: 1, title: 'Неваляшка', isDone: false}
]

function App() {
  return (
    <div className="App">
      <div className="todo-container">
        <TodoList title='books' task= {task1}/>
        <TodoList title ='movies' task = {task2}/>
        <TodoList title='songs' task = {task3}/>
      </div>
    </div>
  );
}


export default App;