import { TodoList } from '../entity';
import { ITodoList, ITodoItem } from 'todo-interfaces';
import { mapFromTodoItemModelToDomain } from './todoItemMapper';
export function mapFromTodoListModelToDomain(list: TodoList): ITodoList {
  let items: ITodoItem[] = [];
  if (list.items) {
    items = list.items.map(mapFromTodoItemModelToDomain);
  }

  return {
    id: list.id,
    token: list.token,
    items: items,
  }
}