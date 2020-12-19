import { Body, Controller, Get, Param, Post, Delete, Put, HttpStatus, HttpException } from '@nestjs/common';
import { TodoListService } from './todoList.service';
import { ITodoListDTO } from 'todo-interfaces';
import { mapFromTodoListModelToDomain } from './mappers/todoListMapper';
import { TodoItemDTO, TodoParams, TodoIndexUpdateDTO, TokenOnlyParam } from './validators';

@Controller('/api/todo')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) { }

  @Get(':token')
  async findList(@Param() params: TokenOnlyParam): Promise<ITodoListDTO> {
    const list = await this.todoListService.findOrCreateByToken(params.token);
    // interface for findOrCreateByToken return is same as DTO, if that changes, do some type mapping here.
    return list;
  }

  @Post(':token')
  async createTodoItem(@Param() params: TokenOnlyParam, @Body() dto: TodoItemDTO) {
    return await this.todoListService.createItemOnTodoList(params.token, dto.text).catch(e => {
      // rethrow any errors as http exceptions to be nicer for the client.
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    });
  }

  @Put(':token/:id')
  async updateTodoItem(@Param() params: TodoParams, @Body() dto: TodoIndexUpdateDTO) {
    const list = await this.todoListService.updateItemIndex(params.token, params.id, dto.index).catch(e => {
      // rethrow any errors as http exceptions to be nicer for the client.
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    });
    const newList = mapFromTodoListModelToDomain(list);
    return newList;

  }

  @Delete(':token/:id')
  async deleteTodoItem(@Param() params: TodoParams) {
    const list = await this.todoListService.getListByToken(params.token);
    const item = await this.todoListService.getListItemById(params.id);

    if (list.id !== item.listId) {
      throw new HttpException('This item and list token do not match', HttpStatus.BAD_REQUEST);
    }

    await this.todoListService.removeTodoItem(params.id);

    return await this.todoListService.getListByToken(params.token);
  }

  @Delete(':token')
  async resetList(@Param() params: TokenOnlyParam) {
    await this.todoListService.removeTodoList(params.token);

    //re-create list using this token to return to client.
    const list = await this.todoListService.findOrCreateByToken(params.token);
    //if we are resetting the list, we don't want the 'new list' notification to show.
    list.isNewList = false;
    return list;
  }
}
