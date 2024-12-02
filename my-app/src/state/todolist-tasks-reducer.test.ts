import { tasksReducer } from "./task-reduser";
import { todolistsReducer } from "./todolists-reduser";
import { addTodoListAC } from "./todolists-reduser";
import { TasksStateType } from "../App";
import { TodoListType } from "../App";

test ('its should be equals', () =>  {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodoListType> = [];

    const action =  addTodoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists  = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodolists).toBe(action.todoListId)

})