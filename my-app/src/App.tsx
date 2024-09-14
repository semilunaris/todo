import { v1 } from "uuid";
import React, { useState } from "react";
import "./App.css";
import { TodoList } from "./Todolist";
import { TaskType } from "./Todolist";
import { AdItemForm } from "./input/AdItemForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Cutton } from "./input/AdItemForm";


const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // основной цвет
    },
  },
});



export type filterValueType = "completed" | "all" | "active";
type TodoListType = {
  title: string;
  id: string;
  filter: filterValueType;
};



function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todolistId1, title: "what to learn", filter: "all" },
    { id: todolistId2, title: "what to watch", filter: "completed" },
  ]);

  let removeTodoList = (todolistid: string) => {
    let filteredTodoList = todolists.filter((tl) => tl.id !== todolistid);
    setTodoLists(filteredTodoList);
    delete dataObj[todolistid]; // Удаление данных по переданному id списка задач
    setdataObj({ ...dataObj });
  };

  type tasksStateType = {
    [key: string]: Array<TaskType>;
  };

  const [dataObj, setdataObj] = useState<tasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "js", isDone: true },
      { id: v1(), title: "Css", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redax", isDone: false },
      { id: v1(), title: "Python", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Spiderman", isDone: true },
      { id: v1(), title: "Batman", isDone: true },
      { id: v1(), title: "Friends", isDone: false },
      { id: v1(), title: "Power", isDone: false },
      { id: v1(), title: "Gone with the wind", isDone: false },
    ],
  });

  function removeTask(id: string, todolistid: string) {
    setdataObj((prevDataObj) => {
      const data = prevDataObj[todolistid] || [];
      const dataObjFilter = data.filter((t) => t.id !== id);
      return { ...prevDataObj, [todolistid]: dataObjFilter };
    });
  }

  function changeTodoListTitle(id: string, newTitle: string) {
    setTodoLists((prevTodolists) => {
      return prevTodolists.map((tl) =>
        tl.id === id ? { ...tl, title: newTitle } : tl
      );
    });
  }

  function addTask(title: string, todolistid: string) {
    const newTask = { id: v1(), title: title, isDone: false };
    setdataObj((prevDataObj) => {
      const data = prevDataObj[todolistid] || [];
      const newTasks = [newTask, ...data];
      return { ...prevDataObj, [todolistid]: newTasks };
    });
  }

  function changeFilter(value: filterValueType, todolistid: string) {
    setTodoLists((prevTodolists) => {
      const todolist = prevTodolists.find((tl) => tl.id === todolistid);
      if (todolist) {
        return prevTodolists.map((tl) =>
          tl.id === todolistid ? { ...todolist, filter: value } : tl
        );
      }
      return prevTodolists;
    });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistid: string) {
    setdataObj((prevDataObj) => {
      const tasks = prevDataObj[todolistid] || [];
      const updatedTasks = tasks.map((t) =>
        t.id === taskId ? { ...t, isDone } : t
      );
      return { ...prevDataObj, [todolistid]: updatedTasks };
    });
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistid: string) {
    setdataObj((prevDataObj) => {
      const tasks = prevDataObj[todolistid] || [];
      const updatedTasks = tasks.map((t) =>
        t.id === taskId ? { ...t, title: newTitle } : t
      );
      return { ...prevDataObj, [todolistid]: updatedTasks };
    });
  }

  function addTodoList(title: string) {
    let todoList: TodoListType = {
      id: v1(),
      filter: "all",
      title: title,
    };
    setTodoLists([todoList, ...todolists]);
    setdataObj({ ...dataObj, [todoList.id]: [] });
  }

  return (
    
<ThemeProvider theme={theme}>
      <div className="App">
        <div className="todo-container">

      
      <Cutton/>
    
          <AdItemForm addTask={addTodoList} />
          {todolists.map((tl) => {
            let tasksForTodo = dataObj[tl.id] || [];

            if (tl.filter === "completed") {
              tasksForTodo = tasksForTodo.filter((t) => t.isDone);
            } else if (tl.filter === "active") {
              tasksForTodo = tasksForTodo.filter((t) => !t.isDone);
            }

            return (
              <TodoList
                removeTodoList={removeTodoList}
                id={tl.id}
                key={tl.id}
                changeTaskStatus={changeStatus}
                title={tl.title}
                task={tasksForTodo}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                filter={tl.filter}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
              />
      
            );
          })}
        </div>
      </div>
      </ThemeProvider>
  );
}

export default App;