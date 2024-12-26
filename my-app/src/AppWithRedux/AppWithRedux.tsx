import { v1 } from "uuid";
import React, { useCallback, useReducer, useState } from "react";
import "../../src/App.css";
import { TodoList } from "../Todolist";
import { TaskType } from "../Todolist";
import { AdItemForm } from "../input/AdItemForm";
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
} from "../state/todolists-reduser";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "../state/task-reduser";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "../state/store";
import { useAppWithRedux } from "./hooks/useAppWithRedux";
import { GetTodolist } from "../todolist-api";
import { CreateTodolist } from "../todolist-api";
import { DeleteTodolist } from "../todolist-api";
import { UpdateTodolist } from "../todolist-api";
import { CreateTask } from "../todolist-api";
import { GetTasks } from "../todolist-api";
import { DeleteTask } from "../todolist-api";
import { UpdateTask } from "../todolist-api";

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
  const {
    dataObj,
    todolists,
    addTodolist,
    removeTask,
    changeTodoListTitle,
    addTask,
    changeFilter,
    changeStatus,
    changeTaskTitle,
    removeTodoList 
  } = useAppWithRedux();

  return (
    <div className="App">
     <UpdateTask/>
     <CreateTask/>
     <GetTasks/>
     <DeleteTask/>
      <CreateTodolist/>
      <GetTodolist/>
     <DeleteTodolist/>
     <UpdateTodolist/>
   
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
