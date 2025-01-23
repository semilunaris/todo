import { v1 } from "uuid";
import React, { useReducer, useState } from "react";
import "./App.css";
import { TodoList } from "./Todolist";

import { AdItemForm } from "./input/AdItemForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Padding } from "@mui/icons-material";
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, todolistsReducer } from "./state/todolists-reduser";
import { addTaskAC, removeTaskAC, tasksReducer, updaiteTaskAC } from "./state/task-reduser";
import { TaskStatuses } from "./Api/todolistsAPI";
import { TodoTaskPriorities } from "./Api/todolistsAPI";
import { FilterValueType } from "./state/todolists-reduser";
import { TaskType } from "./Api/todolistsAPI";

export type TodoListType = {
  title: string;
  id: string;
  filter: FilterValueType;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithReducer() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchTodoListReducer] = useReducer(todolistsReducer, [
    { id: todolistId1, title: "what to learn", filter: "all", addedDate: '',
      order: 0
     },
    { id: todolistId2, title: "what to watch", filter: "completed", addedDate: '',
      order: 0 },
  ]);

  let removeTodoList = (todolistid: string) => {
   const action = removeTodoListAC(todolistid)
   dispatchToTaskReducer(action)
   dispatchTodoListReducer(action)
  };



  const [dataObj, dispatchToTaskReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: "js", status: TaskStatuses.Completed, todoListId: todolistId1,  description: '',  
                startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low },
      { id: v1(), title: "Css", status: TaskStatuses.Completed , todoListId: todolistId1,  description: '',  
        startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low},
      { id: v1(), title: "React", status: TaskStatuses.New , todoListId: todolistId1,  description: '',  
        startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low},
      { id: v1(), title: "Redax", status: TaskStatuses.New , todoListId: todolistId1,  description: '',  
        startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low},
      { id: v1(), title: "Python", status: TaskStatuses.New , todoListId: todolistId1,  description: '',  
        startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low},
    ],
    [todolistId2]: [
      { id: v1(), title: "Spiderman", status: TaskStatuses.Completed , todoListId: todolistId2,  description: '',  
        startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low},
      { id: v1(), title: "Batman", status: TaskStatuses.Completed , todoListId: todolistId2,  description: '',  
        startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low},
      { id: v1(), title: "Friends", status: TaskStatuses.New , todoListId: todolistId2,  description: '',  
        startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low},
      { id: v1(), title: "Power", status: TaskStatuses.New , todoListId: todolistId2,  description: '',  
        startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low},
      { id: v1(), title: "Gone with the wind", status: TaskStatuses.New , todoListId: todolistId2,  description: '',  
        startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low},
    ],
  });

  function addTodolist(title: string){
    const action = addTodoListAC({
      id: v1(),
      addedDate:'',
      order:0,
      title: title
    })
    dispatchTodoListReducer(action)
  }

  function removeTask(id: string, todolistid: string) {
    const action = removeTaskAC(id, todolistid)
   dispatchToTaskReducer(action)
  
  }

  function changeTodoListTitle(id: string, newTitle: string) {
    const action = changeTodoListTitleAC(id,newTitle )
    dispatchTodoListReducer(action)
  }

  function addTask(title: string, todolistid: string) {
    const action = addTaskAC({
      todoListId: todolistid,
      title: title,
      status: TaskStatuses.New,
      addedDate: '',
      deadline: '',
      description: '',
      order: 0,
      priority: 0,
      startDate: '',
      id: 'id exists'
    });
    dispatchToTaskReducer(action);
  }

  function changeFilter(value: FilterValueType, todolistid: string) {
  const action = changeTodoListFilterAC(todolistid, value)
  dispatchTodoListReducer(action)
  }

  function changeStatus(taskId: string, status: TaskStatuses, todolistid: string) {
  const action = updaiteTaskAC(taskId, {status}, todolistid)
  dispatchToTaskReducer(action)
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistid: string
  ) {
 const action = updaiteTaskAC(taskId, {title: newTitle}, todolistid)  
 dispatchToTaskReducer(action)
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
      <Grid container style={{padding: "2px", margin: "4px"}}> <AdItemForm addTask={addTodolist} /></Grid>
      
      <Grid container spacing={3}>  {todolists.map((tl) => {
          let tasksForTodo = dataObj[tl.id] || [];

          if (tl.filter === "completed") {
            tasksForTodo = tasksForTodo.filter((t) => t.status === TaskStatuses.New);
          } else if (tl.filter === "active") {
            tasksForTodo = tasksForTodo.filter((t) => t.status === TaskStatuses.Completed);
          }

          return (
           <Grid item> 
           <Paper elevation={3} style={{marginTop: "10px"}}>
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
            </Paper>
            </Grid>
          );
        })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducer;
