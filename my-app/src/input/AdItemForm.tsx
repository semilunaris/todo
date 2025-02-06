import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import "../TodoList.css"; // Импорт стилей
import { error } from "console";
import IconButton from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { green } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { useAddItemForm } from "./hooks/useAddItemFotm";

type adItemPropseType = {
  addTask: (title: string) => void;
};

export const AdItemForm = React.memo((props: adItemPropseType) => {
  let {
    newTaskTitle,
    error,
    addTask,
    onNewTitleHendlerChabger,
    onKeyPressHendler,
  } = useAddItemForm(props);
  return (
    <div>
      <TextField
        size="small"
        variant={"outlined"}
        value={newTaskTitle}
        onChange={onNewTitleHendlerChabger}
        onKeyUp={onKeyPressHendler}
        type="text"
        label={"Type value"}
        error={!!error}
        helperText={error}
      ></TextField>

      <AddCircleIcon
        onClick={addTask}
        sx={{ color: green[500], cursor: "pointer" }}
      />
    </div>
  );
});
