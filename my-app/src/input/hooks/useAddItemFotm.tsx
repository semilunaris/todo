import { createTheme } from "@mui/material";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";

export function useAddItemForm(props: any) {
  console.log("addItemForm");
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
      props.addTask(newTaskTitle);
      setTaskeTitle("");
    } else setError("Field is required");
  };
  const onNewTitleHendlerChabger = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskeTitle(e.currentTarget.value);
  };

  const onKeyPressHendler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.key === "Enter") {
      setError(null);
      props.addTask(newTaskTitle);
      setTaskeTitle("");
    }
  };
  return {
    newTaskTitle,
    error,
    addTask,
    onNewTitleHendlerChabger,
    onKeyPressHendler,
  };
}
