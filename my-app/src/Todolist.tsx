
export type TaskType ={
    id: number
    title: string
    isDone: boolean
}

type TitlePropsType = {
    title: string,
    task: Array<TaskType>
}

export function TodoList(props: TitlePropsType) {
    return (
      <div className="todo-list">
        <h3>{props.title}</h3>
        <div className="input-container">
          <input type="text" placeholder="Добавить задачу..." />
          <button>+</button>
        </div>
        <ul>
          <li className="completed">
            <input type="checkbox" checked={props.task[0].isDone} />
            <span>{props.task[0].title}</span>
          </li>
          <li className="completed">
            <input type="checkbox" checked={props.task[1].isDone} />
            <span>{props.task[1].title}</span>
          </li>
          <li className="completed">
            <input type="checkbox" checked={props.task[2].isDone} />
            <span>{props.task[2].title}</span>
          </li>
        </ul>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>
  
    );
  }
  