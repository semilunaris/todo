import { v1 } from "uuid";
import React, { useCallback, useReducer, useState } from "react";
import "./App.css";
import { TodoList } from "./Todolist";
import { TaskType } from "./Todolist";
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
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Padding } from "@mui/icons-material";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todolistsReducer,
} from "./state/todolists-reduser";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/task-reduser";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";

export type FilterValueType = "completed" | "all" | "active";
export type TodoListType = {
  title: string;
  id: string;
  filter: FilterValueType;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};



function AppWithRedux() {
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
        <Grid container style={{ padding: "2px", margin: "4px" }}>
          {" "}
          <AdItemForm addTask={addTodolist} />
        </Grid>

        <Grid container spacing={3}>
          {" "}
          {todolists.map((tl) => {
            let tasksForTodo = dataObj[tl.id] || [];

       

            return (
              <Grid item>
                <Paper elevation={3} style={{ marginTop: "10px" }}>
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

export default AppWithRedux;
