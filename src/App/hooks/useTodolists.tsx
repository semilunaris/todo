import { todolistId1 } from "../id-utils";
import { todolistId2 } from "../id-utils";
import { TodolistDomaineType } from "../../state/todolists-reduser";
import { useState } from "react";
import { FilterValueType } from "../../state/todolists-reduser";
import { v1 } from "uuid";
import { string } from "prop-types";

export function useTodoLists(onTodolistRemoved: (id: string)=> void, onTodolistAdded: (id: string)=> void)  {
  let [todolists, setTodoLists] = useState<Array<TodolistDomaineType>>([
    { id: todolistId1, title: "what to learn", filter: "all" , addedDate: '', order: 0},
    { id: todolistId2, title: "what to watch", filter: "completed", addedDate: '', order: 0 },
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
    let todoList: TodolistDomaineType = {
      id: newTodolistId,
      filter: "all",
      title: title,
      addedDate: '',
      order: 0
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
