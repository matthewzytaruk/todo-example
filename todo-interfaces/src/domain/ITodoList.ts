import {ITodoItem} from './ITodoItem';

export interface ITodoList {
    id: number;
    token: string;
    items: ITodoItem[];
}