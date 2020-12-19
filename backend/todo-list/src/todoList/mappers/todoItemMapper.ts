import { TodoItem } from '../entity';
import { ITodoItem } from 'todo-interfaces';


export function mapFromTodoItemModelToDomain(item: TodoItem): ITodoItem {
  return {
    id: item.id,
    index: item.index,
    text: item.text,

  }
}

export function mapFromTodoItemDomainToModel(listId: number, item: ITodoItem): TodoItem {
  const model = new TodoItem();
  model.id = item.id;
  model.index = item.index;
  model.listId = listId;
  model.text = item.text;

  return model;
}