import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import "../TodoList.css"; // Импорт стилей
import { error } from "console";
import IconButton from '@mui/material/Button'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { green } from '@mui/material/colors';
import Stack from '@mui/material/Stack';






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
      <TextField
         size="small"
        variant={"outlined"} 
        value={newTaskTitle}
        onChange={onNewTitleHendlerChabger}
        onKeyUp={onKeyPressHendler}
        type="text"
        label = {'Type value'}
        error={!!error}
        helperText={error}
      ></TextField>
       
       <AddCircleIcon
  onClick={addTask}
  sx={{ color: green[500], cursor: 'pointer' }}
/>

     

    </div>;
  }
