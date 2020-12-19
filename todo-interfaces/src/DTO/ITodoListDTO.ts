import { ITodoList } from '../domain/ITodoList';
export interface ITodoListDTO {
    isNewList: boolean,
    todoList: ITodoList;
}