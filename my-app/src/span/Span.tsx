import react from "react";
import { TextField } from "@mui/material";


type EditTaskSpanType = {
  title: string;
  onChange: (value: string)=>void
};

export function EditlbleSpan(props: EditTaskSpanType) {
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
}
