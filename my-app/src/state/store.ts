import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { tasksReducer } from './task-reduser';
import { todolistsReducer } from './todolists-reduser';

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  // Redux Toolkit автоматически добавляет thunk в middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// @ts-ignore
window.store = store;