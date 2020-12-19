import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListService } from './todoList.service';
import { TodoListController } from './todoList.controller';
import { TodoList } from './entity/todo-list.entity';
import { TodoItem } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList, TodoItem])],
  providers: [TodoListService],
  controllers: [TodoListController],
  exports: [TypeOrmModule]
})
export class TodoListModule { }