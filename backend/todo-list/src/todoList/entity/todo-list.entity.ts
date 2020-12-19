import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { TodoItem } from './todo-item.entity';

@Entity()
@Unique(["token"])
export class TodoList {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "token" })
  token: string;

  @OneToMany(type => TodoItem, todoItem => todoItem.listId, { eager: true })
  items?: TodoItem[];

}