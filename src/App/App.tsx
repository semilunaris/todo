import "./App.css";
import { TodoList } from "../Todolist";
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
import { useTodoLists } from "./hooks/useTodolists";
import { useTasks } from "./hooks/useTasks";
import { TaskStatuses, TaskType } from "../Api/todolistsAPI";

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
    addStateForNewTodoList,
  } = useTasks();

  let {
    todolists,
    removeTodoList,
    changeTodoListTitle,
    changeFilter,
    addTodoList,
  } = useTodoLists(completeRemoveTasksForTodolist, addStateForNewTodoList);

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
            let allTodolistTasks = dataObj[tl.id]
            let tasksForTodo = dataObj[tl.id] || [];

            if (tl.filter === "completed") {
              tasksForTodo = allTodolistTasks.filter((t) => t.status === TaskStatuses.New);
            } else if (tl.filter === "active") {
              tasksForTodo = allTodolistTasks.filter((t) => t.status === TaskStatuses.Completed);
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
