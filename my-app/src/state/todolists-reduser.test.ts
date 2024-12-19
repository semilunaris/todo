
import { TodoListType, FilterValueType } from '../App/App'
import { v1 } from 'uuid'
import { todolistsReducer } from './todolists-reduser'
import { ChangeTodolistFilterActionType } from './todolists-reduser'
import { removeTodoListAC, addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC } from './todolists-reduser'

test ('correct todoList should be remove', ()=>{
     
let todolistID1 = v1()
let todolistID2 = v1()
 
const startState: Array<TodoListType> = [
  { id: todolistID1, title: 'What to learn', filter: 'all' },
  { id: todolistID2, title: 'What to buy', filter: 'all' },
]
 
// const endState = todolistsReducer(startState, {type:'REMOVE-TODOLIST', id: todolistID1})

const endState = todolistsReducer(startState, removeTodoListAC(todolistID1))

expect (endState.length).toBe(1)
expect (endState[0].id).toBe(todolistID2)


})

test ('correct todoList should be added', ()=>{
     
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodoListTitle = 'New Todolist'
     
    const startState: Array<TodoListType> = [
      { id: todolistID1, title: 'What to learn', filter: 'all' },
      { id: todolistID2, title: 'What to buy', filter: 'all' },
    ]
     
    const endState = todolistsReducer(startState, addTodoListAC(newTodoListTitle))
    
    expect (endState.length).toBe(3)
    expect (endState[0].title).toBe(newTodoListTitle)
    expect (endState[2].filter).toBe('all')
    
    
    
    })

 test ('correct todoList should change its name', ()=>{
     
        let todolistID1 = v1()
        let todolistID2 = v1()
    
        let newTodoListTitle = 'New Todolist'
         
        const startState: Array<TodoListType> = [
          { id: todolistID1, title: 'What to learn', filter: 'all' },
          { id: todolistID2, title: 'What to buy', filter: 'all' },
        ]
         
        const action = changeTodoListTitleAC( todolistID2,
      newTodoListTitle)

        const endState = todolistsReducer(startState,action)
        

        expect (endState[0].title).toBe('What to learn')
        expect (endState[1].title).toBe(newTodoListTitle)
     
        
        
        
        })   

 test ('correct filter of todoList should be change', ()=>{
     
          let todolistID1 = v1()
          let todolistID2 = v1()
      
          let newFilter: FilterValueType = 'completed'
           
          const startState: Array<TodoListType> = [
            { id: todolistID1, title: 'What to learn', filter: 'all' },
            { id: todolistID2, title: 'What to buy', filter: 'all' },
          ]
        
          const action = changeTodoListFilterAC(todolistID2, newFilter)
  
          const endState = todolistsReducer(startState,action)
          
  
          expect (endState[0].filter).toBe('all')
          expect (endState[1].filter).toBe(newFilter)
       })   