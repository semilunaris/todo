import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import "../TodoList.css"; // Импорт стилей
import { error } from "console";
import Button from '@mui/material/Button'
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // основной цвет
    },
  },
});



type adItemPropseType = {
    addTask: (title: string, ) => void;

  };
  
  

export function AdItemForm(props: adItemPropseType) {
    const [newTaskTitle, setTaskeTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
    
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // основной цвет
    },
  },
});
  
    const addTask = () => {
      if (newTaskTitle.trim() !== "") {
        props.addTask(newTaskTitle,);
        setTaskeTitle("");
      } else setError("Field is required");
    };
    const onNewTitleHendlerChabger = (e: ChangeEvent<HTMLInputElement>) => {
      setTaskeTitle(e.currentTarget.value);
    };
    
    const onKeyPressHendler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (e.key === "Enter") {
        setError(null);
        props.addTask(newTaskTitle,);
        setTaskeTitle("");
      }
    };
   
  return  <div>
      <input
        value={newTaskTitle}
        onChange={onNewTitleHendlerChabger}
        onKeyUp={onKeyPressHendler}
        type="text"
        placeholder="Добавить задачу..."
        className={error ? "task-input error" : "task-input"}
      ></input>
      <button onClick={addTask}>
        +
      </button>
      <ThemeProvider theme={theme}>
      <Cutton/>
    </ThemeProvider>
      {error && <div className="error-message"> {error} </div>}
    </div>;
  }
  
 export const Cutton = () =>{
    return <Button>fdsfsd</Button>
  }