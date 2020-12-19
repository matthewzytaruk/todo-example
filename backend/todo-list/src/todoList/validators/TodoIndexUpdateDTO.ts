import { ITodoIndexUpdateDTO } from 'todo-interfaces';
import { IsNotEmpty, IsInt } from 'class-validator';

export class TodoIndexUpdateDTO implements ITodoIndexUpdateDTO {
    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsInt()
    index: number;
}