
import React, {  useEffect } from "react";
import "../../src/App.css";
import { TodoList } from "../Todolist";
import { TaskType } from "../Api/todolistsAPI";
import { AdItemForm } from "../input/AdItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { fetchTodolistsThunk, setTodoListsAC } from "../state/todolists-reduser";
import { useAppWithRedux } from "./hooks/useAppWithRedux";
import { todolistsAPI } from "../Api/todolistsAPI";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../state/store";


export type FilterValueType = "completed" | "all" | "active";
export type TodoListType = {
  title: string;
  id: string;
  filter: FilterValueType;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
export const useAppDispatch: () => AppDispatch = useDispatch;

function AppWithRedux() {
 
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodolistsThunk());
  }, [dispatch]);

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
    removeTodoList,
  } = useAppWithRedux();

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
