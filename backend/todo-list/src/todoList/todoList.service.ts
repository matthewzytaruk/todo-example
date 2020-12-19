import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITodoItem, ITodoList } from 'todo-interfaces';
import { mapFromTodoItemDomainToModel, mapFromTodoListModelToDomain } from './mappers';
import { TodoItem as TodoItemModel, TodoList as TodoListModel } from './entity';

export interface IfindOrCreateList {
  isNewList: boolean,
  todoList: ITodoList
}

/**
 * Service for interacting with the database layer. 
 */
@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoListModel)
    private listRepository: Repository<TodoListModel>,
    @InjectRepository(TodoItemModel)
    private itemRepository: Repository<TodoItemModel>,
  ) { }

  getListByToken(token: string): Promise<TodoListModel> {
    return this.listRepository.findOne({ where: { token: token }, relations: ["items"] });
  }

  getListItemById(id: number): Promise<TodoItemModel> {
    return this.itemRepository.findOne(id);
  }

  /**
   * Find a list by it's token, or if it doesn't exist, create a 
   * new one and return that. 
   * @param token  - the identifier for the list
   */
  async findOrCreateByToken(token: string): Promise<IfindOrCreateList> {
    let list = await this.getListByToken(token);
    let newList = false;
    if (!list) {
      list = this.listRepository.create();
      list.token = token;
      this.listRepository.save(list);
      newList = true;
    }

    const listAsDomain = mapFromTodoListModelToDomain(list);

    return { isNewList: newList, todoList: listAsDomain };
  }

  /**
   * Create a todo item on a list. 
   * @param token - the identifier for the list
   * @param text  - the text of the todo item
   */
  async createItemOnTodoList(token: string, text: string): Promise<TodoListModel> {
    const list = await this.getListByToken(token);
    if (list) {
      const item = this.itemRepository.create({ listId: list.id, text: text, index: 0 });
      await this.itemRepository.save(item);
    }
    else {
      throw new Error("No existing list with token " + token);
    }

    return this.getListByToken(token);

  }

  /**
   * Change the order of the list items on a list.
   * @param token - the identifier for the list
   * @param itemId - the id of the list item to move
   * @param newIndex - the new index this item is moving to.
   */
  async updateItemIndex(token, itemId, newIndex): Promise<TodoListModel> {
    const list = await this.getListByToken(token);
    if (list) {
      const item = await this.getListItemById(itemId);
      if (!item) {
        throw new Error('list item not found');
      }
      if (item.listId !== list.id) {
        throw new Error("Item listId does not match list id");
      }
      // onUpdate hook on the model updates the indexes of all other items as needed.
      item.index = newIndex;
      await this.itemRepository.save(item);
    }
    return this.getListByToken(token);
  }

  async createTodoItem(listId: number, item: ITodoItem) {
    const model = mapFromTodoItemDomainToModel(listId, item);
    this.itemRepository.save(model);
  }

  async removeTodoList(token: string): Promise<void> {
    const list = await this.getListByToken(token);
    await this.listRepository.remove([list]);
  }

  async removeTodoItem(id: number): Promise<void> {
    const item = await this.getListItemById(id);
    await this.itemRepository.remove([item]);
  }
}