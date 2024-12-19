import { todolistId1 } from "../id-utils";
import { todolistId2 } from "../id-utils";
import { TodoListType } from "../App";
import { useState } from "react";
import { FilterValueType } from "../App";
import { v1 } from "uuid";
import { string } from "prop-types";

export function useTodoLists(onTodolistRemoved: (id: string)=> void, onTodolistAdded: (id: string)=> void)  {
  let [todolists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todolistId1, title: "what to learn", filter: "all" },
    { id: todolistId2, title: "what to watch", filter: "completed" },
  ]);

  let removeTodoList = (todolistid: string) => {
    let filteredTodoList = todolists.filter((tl) => tl.id !== todolistid);
    setTodoLists(filteredTodoList);
    onTodolistRemoved(todolistid)
  };

  function changeTodoListTitle(id: string, newTitle: string) {
    setTodoLists((prevTodolists) => {
      return prevTodolists.map((tl) =>
        tl.id === id ? { ...tl, title: newTitle } : tl
      );
    });
  }

  function changeFilter(value: FilterValueType, todolistid: string) {
    setTodoLists((prevTodolists) => {
      const todolist = prevTodolists.find((tl) => tl.id === todolistid);
      if (todolist) {
        return prevTodolists.map((tl) =>
          tl.id === todolistid ? { ...todolist, filter: value } : tl
        );
      }
      return prevTodolists;
    });
  }

  function addTodoList(title: string) {
   let newTodolistId = v1()
    let todoList: TodoListType = {
      id: newTodolistId,
      filter: "all",
      title: title,
    };
    setTodoLists([todoList, ...todolists]);
    onTodolistAdded(newTodolistId)
    
  }

  return {
    todolists,
    removeTodoList,
    changeTodoListTitle,
    changeFilter,
    addTodoList,
  };
}
