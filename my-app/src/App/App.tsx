import { v1 } from "uuid";
import React, { useState } from "react";
import "./App.css";
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
import { todolistId2 } from "./id-utils";
import { todolistId1 } from "./id-utils";
import { useTodoLists } from "./hooks/useTodolists";
import { useTasks } from "./hooks/useTasks";

export type FilterValueType = "completed" | "all" | "active";
export type TodoListType = {
  title: string;
  id: string;
  filter: FilterValueType;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  console.log("This is App call");


  let {
    dataObj,
    removeTask,
    addTask,
    changeStatus,
    changeTaskTitle,
    completeRemoveTasksForTodolist,
    addStateForNewTodoList
  } = useTasks();


  let {
    todolists,
    removeTodoList,
    changeTodoListTitle,
    changeFilter,
    addTodoList,
  } = useTodoLists(completeRemoveTasksForTodolist, addStateForNewTodoList
  )
  

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
          <AdItemForm addTask={addTodoList} />
        </Grid>

        <Grid container spacing={3}>
          {" "}
          {todolists.map((tl) => {
            let tasksForTodo = dataObj[tl.id] || [];

            if (tl.filter === "completed") {
              tasksForTodo = tasksForTodo.filter((t) => t.isDone);
            } else if (tl.filter === "active") {
              tasksForTodo = tasksForTodo.filter((t) => !t.isDone);
            }

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

export default App;
