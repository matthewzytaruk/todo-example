import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { ITodoItem } from 'todo-interfaces';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

interface Props {
  items: ITodoItem[];
  updateListOrder: (item: ITodoItem) => void;
  deleteTodoItem: (itemId: number) => void;
}
/**
 * Component that displays a drag and drop list of TodoItems.
 * @param items: the todo items in the list
 * @param updateListOrder: the function to call to change the order of items
 * @param deleteTodoItem: the function to call to delete an item.
 */
export const TodoList: React.FC<Props> = ({ items, updateListOrder, deleteTodoItem }) => {

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;
    // we assume the items are ordered by index and are contiguous 
    // so we can just remove and insert items in the array using the index.
    const [reorderedItem] = items.splice(result.source.index, 1);
    reorderedItem.index = result.destination.index;
    items.splice(result.destination.index, 0, reorderedItem);
    updateListOrder(reorderedItem);
  }

  return (
    <div className="todoList">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todoList">
          {(provided) => (
            <ul className="list-group" {...provided.droppableProps} ref={provided.innerRef}>
              {items.map(todo => (
                <TodoItem key={todo.id} todo={todo} deleteTodoItem={deleteTodoItem} />
              ))}
              {provided.placeholder}
            </ul>
          )}

        </Droppable>
      </DragDropContext>
    </div>
  );
};