import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {TodoListModule} from './todoList';

@Module({
  imports: [TypeOrmModule.forRoot(), TodoListModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
