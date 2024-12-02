import react, { useCallback } from "react";
import { TextField } from "@mui/material";
import React from "react";


type EditTaskSpanType = {
  title: string;
  onChange: (value: string)=>void
};

export const EditlbleSpan = React.memo((props: EditTaskSpanType) => {
  let [editMode, setEditMode] = react.useState(false);
  let [title, setTitle] = react.useState("");

  const activateEditeMode = () => {
    setEditMode(true);
    setTitle(props.title)
  };
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
};
  const onChangeTitleHadler = (e: react.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      size={"small"}
      onBlur={activateViewMode}
      value={title}
      autoFocus
      onChange={onChangeTitleHadler}
    ></TextField>
  ) : (
    <span onDoubleClick={activateEditeMode}>{props.title}</span>
  );
})


