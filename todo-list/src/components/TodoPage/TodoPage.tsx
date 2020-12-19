import React, { useEffect, useState } from 'react';
import { ITodoItem, ITodoList, ITodoListDTO } from 'todo-interfaces';
import { TodoList } from '../TodoList/TodoList';
import { getTodoList, addTodo, updateTodoOrder, deleteItem, resetTodoList } from '../../api/todo-api';
import { TodoForm } from '../TodoForm/TodoForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  RouteComponentProps
} from "react-router-dom";

type TParams = { token: string };
/**
 * Smart container component that holds all todo components and 
 * handles communication with the backend from events bubbled up from the child components.
 * @param token - the identifier of the list to display.
 */
export const TodoPage = ({ match }: RouteComponentProps<TParams>) => {
  const token = match.params.token;
  const [todosList, setTodoList] = useState<ITodoList>();

  useEffect(() => {
    fetchTodoList(token)
  }, [token]);

  // fetch a todo list from the  backend
  const fetchTodoList = (token: string): void => {
    getTodoList(token)
      .then(({ data }: ITodoListDTO | any) => {
        if (data.isNewList) {
          toast.dark("No existing list using that token, so we started a new list!");
        }
        if (data.todoList) {
          setTodoList(data.todoList);
        }
      })
      .catch((err: Error) => {
        toast.error(err.message);
      });
  };

  // add a new todo to the current list
  const addTodoToList = async (text: string) => {
    if (todosList) {
      //optimistically add item to list.
      const itemsCount = todosList.items.length || 0;
      const newItem: ITodoItem = {
        // fake id since we don't have a real one yet. 
        id: 9999,
        index: itemsCount + 1,
        text: text,
        pending: true
      }
      const newItems = [...todosList?.items, newItem];
      const newList: ITodoList = {
        id: todosList.id,
        items: newItems,
        token: token
      };
      setTodoList(newList);

      //send off request to backend.
      try {
        const response = await addTodo(token, text)
        if (response.data) {
          const list = response.data;
          setTodoList(list);
        }
      } catch (err) {
        toast.error(err.message);
      }

    }
  }

  // update the order of the list on the backend
  const updateListOrder = async (item: ITodoItem) => {
    try {
      const response = await updateTodoOrder(token, item.id, item.index);
      const list = response.data;
      setTodoList(list);
    } catch (err) {
      toast.error(err.message);
    }

  }

  // delete a todo item on the backend
  const deleteTodoItem = async (itemId: number) => {
    try {
      const response = await deleteItem(token, itemId);
      const list = response.data;
      setTodoList(list);
    } catch (err) {
      toast.error(err.message);
    }
  }

  // reset the todo list by removing all items.
  const resetList = async () => {
    try {
      const response = await resetTodoList(token);
      const data = response.data;
      setTodoList(data.todoList);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div>
      <ToastContainer />
      <TodoForm addTodo={addTodoToList}></TodoForm>
      <TodoList deleteTodoItem={deleteTodoItem} updateListOrder={updateListOrder} items={todosList ? todosList.items : []} />

      <button
        onClick={() => resetList()}
        className="btn btn-primary reset-button"
      >
        Reset
    </button>
    </div>
  );
};