import { ITodoItemDTO } from 'todo-interfaces';
import { IsNotEmpty } from 'class-validator';

export class TodoItemDTO implements ITodoItemDTO {
    @IsNotEmpty()
    text: string;
}