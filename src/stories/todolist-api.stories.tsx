import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { todolistsAPI } from '../Api/todolistsAPI';

// Мета-данные с передачей API-ключа и токена
const meta: Meta = {
  title: 'Api',
  parameters: {
    apiKey: '0a031906-c102-4e9e-97f8-e79ff751f5f8', // Пример API-ключа
    token: '28ed4b9a-1a68-45d8-ba52-d91ad7ecd5c0', // Пример токена
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const GetTodolist: Story = {
  args: {},
  render: ({ apiKey, token }) => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
      // Запрос к API с использованием fetch
      fetch('https://social-network.samuraijs.com/api/1.1/todo-lists', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Authorization': `Bearer ${token}`, // Используем токен из метаданных
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Передаем куки
      })
        .then((response) => response.json()) // Преобразуем ответ в JSON
        .then((data) => {
          console.log(data); // Логируем данные
          setState(data); // Сохраняем данные в state
        })
        .catch((error) => {
          console.error(error); // Логируем ошибки
        });
    }, [token]);

    return <div>{JSON.stringify(state)}</div>;
  },
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);

 const createTodolist=()=>{
    todolistsAPI
      .createTodolist('new')
      .then((res) => {
        console.log(res.data);
        setState(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <button onClick={createTodolist}>Create Todo List</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};

export const DeleteTodolist: Story = {
  args: {},
  render: ({ apiKey, token }) => {
    const [state, setState] = useState<any>(null);

    const deleteTodolist = (id: string) => {
      fetch(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'API-KEY': apiKey,
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Передаем куки
      })
        .then((response) => response.json()) // Преобразуем ответ в JSON
        .then((data) => {
          console.log(data); // Логируем данные
          setState(data); // Сохраняем данные в state
        })
        .catch((error) => {
          console.error(error); // Логируем ошибки
        });
    };

    return (
      <div>
        <button onClick={() => deleteTodolist('820e321b-3919-401f-aae1-77e4929f931c')}>
          Delete Todo List
        </button>
        <div>{JSON.stringify(state)}</div>
      </div>
    );
  },
};

export const UpdateTodolist: Story = {
  args: {},
  render: ({ apiKey, token }) => {
    const [state, setState] = useState<any>(null);

    const updateTodolist = (id: string) => {
      fetch(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'API-KEY': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'Updated Todo List' }), // Обновленные данные
        credentials: 'include', // Передаем куки
      })
        .then((response) => response.json()) // Преобразуем ответ в JSON
        .then((data) => {
          console.log(data); // Логируем данные
          setState(data); // Сохраняем данные в state
        })
        .catch((error) => {
          console.error(error); // Логируем ошибки
        });
    };

    return (
      <div>
        <button onClick={() => updateTodolist('f4ca6f83-5156-43df-b1b2-c772064f2c05')}>
          Update Todo List
        </button>
        <div>{JSON.stringify(state)}</div>
      </div>
    );
  },
};