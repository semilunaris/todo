import { tasksReducer } from "./task-reduser";
import { todolistsReducer } from "./todolists-reduser";
import { addTodoListAC } from "./todolists-reduser";
import { TasksStateType } from "../App/App";

import { TodolistDomaineType } from "./todolists-reduser";

test ('its should be equals', () =>  {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodolistDomaineType> = [];
    const action =  addTodoListAC({
        title: 'dadsa',
        addedDate: '',
        id: '',
        order: 0,
    })

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists  = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)

})