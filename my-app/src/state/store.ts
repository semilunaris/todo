import { combineReducers } from 'redux'
import { tasksReducer } from './task-reduser'
import { todolistsReducer } from './todolists-reduser'
import { createStore } from 'redux';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})


export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store;


