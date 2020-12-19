import React from 'react';
import { ITodoItem } from 'todo-interfaces';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
interface Props {
  todo: ITodoItem;
  deleteTodoItem: (itemId: number) => void;
}
/**
 * Component to show a single todo item.
 * Relies on the parent to pass in a function to delete the item. 
 * @param todo: ITodoItem - the todo item to display
 * @param deleteTodoItem - the function to call when the delete icon is pressed on the item.
 */
export const TodoItem: React.FC<Props> = props => {
  const stringId: string = props.todo.id.toString();

  //handle clicking on the delete button
  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    props.deleteTodoItem(props.todo.id);
  }

  return (
    <Draggable key={props.todo.id} draggableId={stringId} index={props.todo.index}>
      {(provided) => (
        <li className="list-group-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <p>
            {props.todo.text}
            {props.todo.pending &&
              <span className="pending-icon"> (pending) </span>
            }
            <span className="deleteItem" onClick={handleClick}><FontAwesomeIcon icon={faWindowClose} /> </span>
          </p>
        </li>
      )}
    </Draggable>);
};