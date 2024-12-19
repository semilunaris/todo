import { useState } from "react"
import { TasksStateType } from "../App"
import { todolistId1 } from "../id-utils"
import { todolistId2 } from "../id-utils"
import { v1 } from "uuid"


export function useTasks() {

    const [dataObj, setdataObj] = useState<TasksStateType>({
      [todolistId1]: [
        { id: v1(), title: "js", isDone: true },
        { id: v1(), title: "Css", isDone: true },
        { id: v1(), title: "React", isDone: false },
        { id: v1(), title: "Redax", isDone: false },
        { id: v1(), title: "Python", isDone: false },
      ],
      [todolistId2]: [
        { id: v1(), title: "Spiderman", isDone: true },
        { id: v1(), title: "Batman", isDone: true },
        { id: v1(), title: "Friends", isDone: false },
        { id: v1(), title: "Power", isDone: false },
        { id: v1(), title: "Gone with the wind", isDone: false },
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
        const newTask = { id: v1(), title: title, isDone: false };
        setdataObj((prevDataObj) => {
          const data = prevDataObj[todolistid] || [];
          const newTasks = [newTask, ...data];
          return { ...prevDataObj, [todolistid]: newTasks };
        });
      }  
      function changeStatus(taskId: string, isDone: boolean, todolistid: string) {
        setdataObj((prevDataObj) => {
          const tasks = prevDataObj[todolistid] || [];
          const updatedTasks = tasks.map((t) =>
            t.id === taskId ? { ...t, isDone } : t
          );
          return { ...prevDataObj, [todolistid]: updatedTasks };
        });
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