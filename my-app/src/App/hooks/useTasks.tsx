import { useState } from "react"
import { TasksStateType } from "../App"
import { todolistId1 } from "../id-utils"
import { todolistId2 } from "../id-utils"
import { v1 } from "uuid"
import { TaskStatuses, TodoTaskPriorities } from "../../Api/todolistsAPI"


export function useTasks() {

    const [dataObj, setdataObj] = useState<TasksStateType>({
      [todolistId1]: [
        { id: v1(), title: "js", status: TaskStatuses.Completed, todoListId: todolistId1,  description: '',  
          startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low,
       },
        { id: v1(), title: "Css",status: TaskStatuses.Completed, todoListId: todolistId1,  description: '',  
          startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low },
        { id: v1(), title: "React", status: TaskStatuses.New, todoListId: todolistId1,  description: '',  
          startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low },
        { id: v1(), title: "Redax", status: TaskStatuses.New , todoListId: todolistId1,  description: '',  
          startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low},
        { id: v1(), title: "Python", status: TaskStatuses.New , todoListId: todolistId1,  description: '',  
          startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low},
      ],
      [todolistId2]: [
        { id: v1(), title: "Spiderman", status: TaskStatuses.Completed , todoListId: todolistId1,  description: '',  
          startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low},
        { id: v1(), title: "Batman", status: TaskStatuses.Completed , todoListId: todolistId1,  description: '',  
          startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low},
        { id: v1(), title: "Friends", status: TaskStatuses.New, todoListId: todolistId1,  description: '',  
          startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low },
        { id: v1(), title: "Power", status: TaskStatuses.New, todoListId: todolistId1,  description: '',  
          startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low },
        { id: v1(), title: "Gone with the wind", status: TaskStatuses.New , todoListId: todolistId1,  description: '',  
          startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low},
      ],
    })

    function removeTask(id: string, todolistid: string) {
        setdataObj((prevDataObj) => {
          const data = prevDataObj[todolistid] || [];
          const dataObjFilter = data.filter((t) => t.id !== id);
          return { ...prevDataObj, [todolistid]: dataObjFilter };
        });
      }

      function addTask(title: string, todolistid: string) {
        const newTask = { id: v1(), title: title, status: TaskStatuses.New, todoListId: todolistid,  description: '',  
          startDate: '', deadline: '', addedDate: '',order: 0, priority: TodoTaskPriorities.Low, };
        setdataObj((prevDataObj) => {
          const data = prevDataObj[todolistid] || [];
          const newTasks = [newTask, ...data];
          return { ...prevDataObj, [todolistid]: newTasks };
        });
      }  
      function changeStatus(taskId: string, status: TaskStatuses, todolistid: string) {
     
          let todolistTasks = dataObj[todolistid]
          let task = todolistTasks.find(t=>t.id===taskId)
      if (task){
        task.status = status;
        setdataObj({...dataObj })
      }
     }
    
      function changeTaskTitle(
        taskId: string,
        newTitle: string,
        todolistid: string
      ) {
        setdataObj((prevDataObj) => {
          const tasks = prevDataObj[todolistid] || [];
          const updatedTasks = tasks.map((t) =>
            t.id === taskId ? { ...t, title: newTitle } : t
          );
          return { ...prevDataObj, [todolistid]: updatedTasks };
        });
      }

    function completeRemoveTasksForTodolist (id: string){
      delete dataObj[id]; 
      setdataObj({ ...dataObj });
    }

    function addStateForNewTodoList (newTodolistId: string){
      setdataObj({ ...dataObj, [newTodolistId]: [] });
    }

    return {dataObj, setdataObj, removeTask, addTask, changeStatus, changeTaskTitle, completeRemoveTasksForTodolist, addStateForNewTodoList}


  }