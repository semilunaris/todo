import { Settings } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { todolistsAPI } from "./Api/todolistsAPI";

export default {
  title: "Api",
};

export const GetTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistsAPI
      .getTodolist()

      .then((res) => {
        console.log(res.data);
        setState(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);

  const createTodolist = () => {
    todolistsAPI
      .createTodolist("new")
      .then((res) => {
        console.log(res.data);
        setState(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <button onClick={createTodolist}>Create Todo List</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {}, []);

  const deleteTodolist = () => {
    const todoListId = "37b42762-b15d-4671-8b31-dd8b96d9e99d";
    todolistsAPI
      .deleteTodolist(todoListId)
      .then((res) => {
        console.log(res.data);
        setState(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <button onClick={deleteTodolist}>Delete Todo List</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};

export const UpdateTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {}, []);

  const updateTodolist = () => {
    const todoListId = "f4ca6f83-5156-43df-b1b2-c772064f2c05";
    todolistsAPI
      .updateTodolist(todoListId, "update")
      .then((res) => {
        console.log(res.data);
        setState(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <button onClick={updateTodolist}>Update Todo List</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [todolistId, setTodoListId] = useState<any>("");

  const createTask = () => {
    todolistsAPI
      .createTask(todolistId, taskTitle)

      .then((res) => {
        console.log(`tasks bla vla: ${res.data}`);
        setState(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todolistId"}
          value={todolistId}
          onChange={(e) => {
            setTodoListId(e.currentTarget.value);
          }}
        />
        <input
          placeholder={"taskTitle"}
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value);
          }}
        />
        <button onClick={createTask}>create task</button>
      </div>
    </div>
  );
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodoListId] = useState<any>("");

  const getTasks = () => {

    todolistsAPI
      .getTasks(todolistId)

      .then((res) => {
        console.log(`tasks: ${res.data}`);
        setState(res.data.items);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todolistId"}
          value={todolistId}
          onChange={(e) => {
            setTodoListId(e.currentTarget.value);
          }}
        />

        <button onClick={getTasks}>get task</button>
      </div>
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskId, setTaskId] = useState<string>("");
  const [todolistId, setTodoListId] = useState<any>(null);

  const deleteTask = () => {
    todolistsAPI
      .deleteTask(todolistId, taskId)

      .then((res) => {
        console.log(`tasks: ${res.data}`);
        setState(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todolistId"}
          value={todolistId}
          onChange={(e) => {
            setTodoListId(e.currentTarget.value);
          }}
        />
        <input
          placeholder={"taskId"}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value);
          }}
        />
        <button onClick={deleteTask}>delete task</button>
      </div>
    </div>
  );
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescriprion, setTaskDescription] = useState<string>("");
  const [Status, setStatus] = useState<number>(0);
  const [Priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [todolistId, setTodoListId] = useState<any>("");
  const [taskId, setTaskId] = useState<any>("");




  const updateTask = () => {
    todolistsAPI
      .updateTask(todolistId, taskId, {
        deadline: '',
        description: taskDescriprion,
        priority: Priority,
        startDate: '',
        status: Status,
        title: taskTitle
      })

      .then((res) => {
        console.log(`tasks bla vla: ${res.data}`);
        setState(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todolistId"}
          value={todolistId}
          onChange={(e) => {
            setTodoListId(e.currentTarget.value);
          }}
        />
        <input
          placeholder={"taskId"}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value);
          }}
        />
        <input
          placeholder={"taskTitle"}
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value);
          }}
        />
         <input
          placeholder={"taskDescriprion"}
          value={taskDescriprion}
          onChange={(e) => {
            setTaskDescription(e.currentTarget.value);
          }}
        />
         <input
          placeholder={"status"}
          value={Status}
          type="number"
          onChange={(e) => {
            setStatus(+e.currentTarget.value);
          }}
        />
          <input
          placeholder={"priority"}
          value={Priority}
          type="number"
          onChange={(e) => {
            setPriority(+e.currentTarget.value);
          }}
        />
   
   
        <button onClick={updateTask}>update task</button>
      </div>
    </div>
  );
};