import { setTodoListsAC, TodolistDomaineType } from './todolists-reduser'
import { todolistsReducer } from './todolists-reduser'
import { ChangeTodolistFilterActionType } from './todolists-reduser'
import { removeTodoListAC, addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC } from './todolists-reduser'
import { FilterValueType } from './todolists-reduser'
import { todolistId1, todolistId2 } from '../App/id-utils'



const startState: Array<TodolistDomaineType> = [
  { id: todolistId1, title: 'What to learn', filter: 'all',  addedDate: '',
    order: 0 },
  { id: todolistId2, title: 'What to buy', filter: 'all',  addedDate: '',
    order: 0 },
]
test ('correct todoList should be remove', ()=>{

 
// const endState = todolistsReducer(startState, {type:'REMOVE-TODOLIST', id: todolistID1})

const endState = todolistsReducer(startState, removeTodoListAC(todolistId1))

expect (endState.length).toBe(1)
expect (endState[0].id).toBe(todolistId2)


})

test ('correct todoList should be added', ()=>{

    let newTodoListTitle = 'New Todolist'
     
  
     
    const endState = todolistsReducer(startState, addTodoListAC({
      title: newTodoListTitle,
      order: 0,
      addedDate: '',
      id: '',
    }))
    
    expect (endState.length).toBe(3)
    expect (endState[0].title).toBe(newTodoListTitle)
    expect (endState[2].filter).toBe('all')
    
    
    
    })

 test ('correct todoList should change its name', ()=>{
     

    
        let newTodoListTitle = 'New Todolist'
         

         
        const action = changeTodoListTitleAC( todolistId2,
      newTodoListTitle)

        const endState = todolistsReducer(startState,action)
        

        expect (endState[0].title).toBe('What to learn')
        expect (endState[1].title).toBe(newTodoListTitle)
     
        
        
        
        })   

 test ('correct filter of todoList should be change', ()=>{
     
      
          let newFilter: FilterValueType = 'completed'
           

        
          const action = changeTodoListFilterAC(todolistId2, newFilter)
  
          const endState = todolistsReducer(startState,action)
          
  
          expect (endState[0].filter).toBe('all')
          expect (endState[1].filter).toBe(newFilter)
       })   

       test ('todolist shuld be set in the state', ()=>{
     
      
        const action = setTodoListsAC(startState)

        const endState = todolistsReducer([],action)
        

        expect (endState.length).toBe(2)
        
     })  
