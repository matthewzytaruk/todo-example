import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert, getRepository, BeforeUpdate } from 'typeorm';
import { TodoList } from './todo-list.entity';

@Entity()
export class TodoItem {
  @PrimaryGeneratedColumn({ name: "id" })
  id?: number;

  @Column({ name: "listId" })
  @ManyToOne(type => TodoList, todoList => todoList.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  listId: number;

  @Column({ name: "index" })
  index?: number;

  @Column({ name: "text" })
  text: string;

  /**
   * When a new item is added, automatically find the appropriate index for 
   * the new item.
   */
  @BeforeInsert()
  async updateToLatestIndex() {
    let lastIndex = await getRepository(TodoItem)
      .createQueryBuilder("toDoItem")
      .where("listId= :listId", { listId: this.listId })
      .orderBy("toDoItem.index", "DESC")
      .getOne();

    if (lastIndex) {
      this.index = lastIndex.index + 1;
    } else {
      this.index = 0;
    }

  }

  /**
   * When an item's index gets updated, update the items in the list to match
   * with the new index.
   */
  @BeforeUpdate()
  async reOrderItems() {
    let oldItem = await getRepository(TodoItem).findOne(this.id);

    if (oldItem.index > this.index) {

      // item being moved up the list.
      await getRepository(TodoItem)
        .createQueryBuilder()
        .update(TodoItem)
        .set({ index: () => "`index` + 1" })
        .where("listId = :listId", { listId: this.listId })
        .andWhere("index >= :index", { index: this.index })
        .andWhere("index <= :oldindex", { oldindex: oldItem.index })
        .execute();
    } else if (oldItem.index < this.index) {

      //item being moving down the list. 
      await getRepository(TodoItem)
        .createQueryBuilder()
        .update(TodoItem)
        .set({ index: () => "`index` - 1" })
        .where("listId = :listId", { listId: this.listId })
        .andWhere("index <= :index", { index: this.index })
        .andWhere("index >= :oldindex", { oldindex: oldItem.index })
        .execute();
    }
  }
}