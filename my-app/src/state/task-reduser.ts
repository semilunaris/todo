import { title } from "process";
import { TodoListType, FilterValueType, TasksStateType} from "../App/App";
import { v1 } from 'uuid'
import { TodoList } from "../Todolist";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reduser";
import { todolistId1, todolistId2 } from "./todolists-reduser";



export type RemoveTaskActionTyp = {
    type: 'REMOVE-TASK',
    taskId: string,
    todoListId: string
}
export type addTaskActiype = {
    type: 'ADD-TASK',
    title: string
    todoListId: string
} 
export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todoListId: string
    isDone: boolean
    taskId: string
}

export type changeTaskTitlesActionType = {
  type: 'CHANGE-TASK-TITLE'
  todoListId: string
  title: string
  taskId: string
}

 
type ActionsType = 
RemoveTaskActionTyp|addTaskActiype|changeTaskStatusActionType|changeTaskTitlesActionType| AddTodolistActionType | RemoveTodolistActionType

const initialState:  TasksStateType = {}



export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch(action.type){
   case 'REMOVE-TASK': {
    const stateCopy = {...state}
    const tasks = state[action.todoListId]
     const filteredTasks = tasks.filter(t=>t.id!==action.taskId)
     stateCopy[action.todoListId] = filteredTasks
    return stateCopy
   }

   case 'ADD-TASK': {
    
    const stateCopy = {...state}
    const tasks = stateCopy[action.todoListId]
    const newTask = { id: v1(), title: action.title, isDone: false };
    const newTasks = [newTask,  ...tasks]
    stateCopy[action.todoListId] = newTasks

    return stateCopy
   
    

   }

  case 'CHANGE-TASK-STATUS':{
 let todolistTasks = state[action.todoListId]
 state[action.todoListId] =  todolistTasks.map(t=>t.id === action.taskId? {...t, isDone: action.isDone}: t )
 
  return ({...state})
 }
  

  case 'CHANGE-TASK-TITLE':{
 let todolistTasks = state[action.todoListId];
  state[action. todoListId] = todolistTasks.map(t=>t.id === action.taskId?
 {...t, title: action.title}:
 t)   
   
   return ({...state})
  }
  
  case 'ADD-TODOLIST': {
    const stateCopy = {...state}
    stateCopy[action.todoListId] = []
   
    return stateCopy
  }
  case 'REMOVE-TODOLIST': {
    const stateCopy = {...state}
    delete stateCopy[action.id]
    return stateCopy
  }

            default:
                return state
    }
}

  export const removeTaskAC = (taskId: string,todoListId:string):RemoveTaskActionTyp=> {
    return {type: 'REMOVE-TASK', todoListId, taskId}
  }

  export const addTaskAC = (title:string, todoListId: string):addTaskActiype => {
    return {type: 'ADD-TASK', title, todoListId}
  }

  export const changeTaskStatusAC = (taskId:string, isDone: boolean, todoListId: string):changeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS',  isDone, todoListId, taskId,}
  }

  export const changeTaskTitleAC = (taskId:string, title: string, todoListId: string):changeTaskTitlesActionType => {
    return {type: 'CHANGE-TASK-TITLE',  title, todoListId, taskId,}
  }
  
