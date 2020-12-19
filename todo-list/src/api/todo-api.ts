
import axios, { AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import { ITodoList, ITodoItemDTO, ITodoIndexUpdateDTO, ITodoListDTO } from "todo-interfaces";
import { BACKEND_URL, MAX_RETRIES } from '../constants';

/**
 * Functions for communicating with the backend.
 */

const client = axios.create({ baseURL: BACKEND_URL });
axiosRetry(client, { retries: MAX_RETRIES });

/**
 * Get a todo list from the backend
 * @param token - the identifier for the list you want.
 */
export const getTodoList = async (token: string): Promise<AxiosResponse<ITodoListDTO>> => {
  const response: AxiosResponse<ITodoListDTO> = await client.get(
    "/api/todo/" + token,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  );
  return response;
}
/**
 * Send a request to add a todo item to a list. 
 * @param token - identifier for the list
 * @param text - the text of the todo to add to the list.
 */
export const addTodo = async (token: string, text: string): Promise<AxiosResponse<ITodoList>> => {
  const todo: ITodoItemDTO = {
    text: text,
  };

  const response: AxiosResponse<ITodoList> = await client.post(
    "/api/todo/" + token,
    todo,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  );
  return response;
}
/**
 * Send a request to update the order of an item on a list.
 * @param token - identifier for a list.
 * @param itemId - the id of the item to update
 * @param index  - the new index for the item.
 */
export const updateTodoOrder = async (token: string, itemId: number, index: number): Promise<AxiosResponse<ITodoList>> => {

  const todo: ITodoIndexUpdateDTO = {
    id: itemId,
    index: index
  };

  const response: AxiosResponse<ITodoList> = await client.put(
    "/api/todo/" + token + "/" + itemId,
    todo,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  );
  return response;
}

/**
 * Send a request to reset a list.
 * @param token - the identifier of the list to reset.
 */
export const resetTodoList = async (token: string): Promise<AxiosResponse<ITodoListDTO>> => {

  const response: AxiosResponse<ITodoListDTO> = await client.delete(
    "/api/todo/" + token,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  );

  return response;
}

/**
 * Send a request to delete an item from the list.
 * @param token - the identifier for the list to delete from
 * @param itemId - the id of the item to delete.
 */
export const deleteItem = async (token: string, itemId: number): Promise<AxiosResponse<ITodoList>> => {
  const response: AxiosResponse<ITodoList> = await client.delete(
    "/api/todo/" + token + "/" + itemId,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  );
  return response;
}