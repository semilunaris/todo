import { title } from "process";
import { TodoListType, FilterValueType} from "../App/App";
import { v1 } from 'uuid'
import { TodoList } from "../Todolist";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todoListId: string
} 
export type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
} 
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValueType
} 
type ActionsType = 
    RemoveTodolistActionType| AddTodolistActionType | ChangeTodolistActionType | ChangeTodolistFilterActionType

    export const todolistId1 = v1();
    export const todolistId2 = v1();


   const initialState: Array<TodoListType> = [
  
  ] 

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionsType):  Array<TodoListType> => {
    switch(action.type){
       case 'REMOVE-TODOLIST': {
        return state.filter((tl) => tl.id != action.id);
      
       }
        case 'ADD-TODOLIST': {
            return [ {
                id: action.todoListId,
                title: action.title,
                filter: 'all'
            }, ...state]
        }           
        case 'CHANGE-TODOLIST-TITLE':{
            const todoList = state.find(tl => tl.id === action.id);
            if(todoList){
                todoList.title = action.title;
            }
            return[
                ...state
            ]
        }
 
        case 'CHANGE-TODOLIST-FILTER':{
            const todoList = state.find(tl => tl.id === action.id);
            if(todoList){
                todoList.filter = action.filter;
            }
            return[
                ...state
            ]
        }

            default:
                return state
    }
}

  export const removeTodoListAC = (todoListId:string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListId}
  }

  export const addTodoListAC = (title:string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todoListId: v1()}
  }

  export const changeTodoListTitleAC = ( id:string, title: string): ChangeTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: id}
  }

  export const changeTodoListFilterAC = ( id:string, filter:FilterValueType ): ChangeTodolistFilterActionType  => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter:filter}
  }