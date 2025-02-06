import { tasksReducer, updaiteTaskAC } from "./task-reduser";
import { TasksStateType } from "../App/App";
import { removeTaskAC } from "./task-reduser";
import { addTaskAC } from "./task-reduser";
import { addTodoListAC, setTodoListsAC } from "./todolists-reduser";
import { removeTodoListAC } from "./todolists-reduser";
import { TodoTaskPriorities } from "../Api/todolistsAPI";
import { TaskStatuses } from "../Api/todolistsAPI";
import { todolistId2, todolistId1 } from "../App/id-utils";
import { TaskType } from "../Api/todolistsAPI";
import { setTasksAC } from "./task-reduser";
import { addTodolistThunk } from "./todolists-reduser";

const startState: TasksStateType = {
  "todoListId1": [
    {
      id: "1",
      title: "css",
      status: TaskStatuses.New,
      todoListId: todolistId1,
      description: "",
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TodoTaskPriorities.Low,
    },
    {
      id: "2",
      title: "JS",
      status: TaskStatuses.Completed,
      todoListId: todolistId1,
      description: "",
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TodoTaskPriorities.Low,
    },
    {
      id: "3",
      title: "React",
      status: TaskStatuses.New,
      todoListId: todolistId1,
      description: "",
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TodoTaskPriorities.Low,
    },
  ],
  "todoListId2": [
    {
      id: "1",
      title: "bread",
      status: TaskStatuses.New,
      todoListId: todolistId2,
      description: "",
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TodoTaskPriorities.Low,
    },
    {
      id: "2",
      title: "milk",
      status: TaskStatuses.Completed,
      todoListId: todolistId2,
      description: "",
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TodoTaskPriorities.Low,
    },
    {
      id: "3",
      title: "tea",
      status: TaskStatuses.New,
      todoListId: todolistId2,
      description: "",
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TodoTaskPriorities.Low,
    },
  ],
};
test("correct task should be deleted from correct array", () => {
  const copyStartState = { ...startState };

  const action = removeTaskAC("2", "todoListId2");
  const endState = tasksReducer(copyStartState, action);

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(2);
  expect(endState["todoListId2"].every((t) => t.id != "2")).toBeTruthy();
});

test("correct task should be add", () => {
  const copyStartState = { ...startState };

  const action = addTaskAC({
    todoListId: 'todoListId2',
    title: 'juce',
    status: TaskStatuses.New,
    addedDate: '',
    deadline: '',
    description: '',
    order: 0,
    priority: 0,
    startDate: '',
    id: 'id exists'
  });
  const endState = tasksReducer(copyStartState, action);

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(4);
  expect(endState["todoListId2"][0].id).toBeDefined();
  expect(endState["todoListId2"][0].title).toBe("juce");
  expect(endState["todoListId2"][0].status).toBe(TaskStatuses.New);
});

test("status of task must be change", () => {
  const copyStartState = { ...startState };

  const action = updaiteTaskAC("2",{
    title: '',
    description: '',
    status: TaskStatuses.New,
    priority: TodoTaskPriorities.Low,
    startDate: '',
    deadline: '',
  }, "todoListId2", );
  const endState = tasksReducer(copyStartState, action);

  expect(endState["todoListId2"][1].status).toBe(TaskStatuses.New);
  expect(endState["todoListId1"][1].status).toBe(TaskStatuses.Completed);
});

test("status title of task must be change", () => {
  const copyStartState = { ...startState };

  const action = updaiteTaskAC("2", {
    title: 'Milkyway',
    description: '',
    status: TaskStatuses.New,
    priority: TodoTaskPriorities.Low,
    startDate: '',
    deadline: '',
  }, "todoListId2");
  const endState = tasksReducer(copyStartState, action);

  expect(endState["todoListId2"][1].title).toBe("Milkyway");
  expect(endState["todoListId1"][1].title).toBe("JS");
});

test("new property array should be added when new todolist is added", () => {
  const copyStartState = { ...startState };

  const action = addTodoListAC({
    title: 'juce',
    addedDate: '',
    order: 0,
    id: 'id exists'
  });
  const endState = tasksReducer(copyStartState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todoListId1" && k != "todoListId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const copyStartState = { ...startState };

  const action = removeTodoListAC("todoListId2");
  const endState = tasksReducer(copyStartState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todoListId2"]).not.toBeDefined();
});

test("empty arrays should be added when we set todolists", () => {
  const action = setTodoListsAC([
    { id: "1", title: "title", order: 0, addedDate: "" },
    { id: "2", title: "title", order: 0, addedDate: "" },
  ]);
  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["1"]).toStrictEqual([]);
  expect(endState["2"]).toStrictEqual([]);
});

test("tasks should be added to todolist", () => {
  const copyStartState = { ...startState };

  const action = setTasksAC(copyStartState["todoListId1"], 'todoListId2');
  const endState = tasksReducer({ "todoListId2": [] ,  "todoListId1": [] }, action);

  const keys = Object.keys(endState);


  expect(endState["todoListId1"].length).toBe(0);
  expect(endState["todoListId2"].length).toBe(3);
});
