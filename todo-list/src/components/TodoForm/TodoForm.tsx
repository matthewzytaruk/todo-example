import React, { FormEvent, useState } from 'react';

interface Props {
  addTodo: (text: string) => void;
}
/**
 * Component to show the form to add a new item to the todo list.
 * Relies on parent component to give the add function.
 * @param addTodo() - the function to call when the add button has been pressed.
 */
export const TodoForm: React.FC<Props> = props => {

  const [text, setText] = useState("");

  const handleSubmit = (evt: FormEvent<HTMLElement>) => {
    evt.preventDefault();
    props.addTodo(text);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input placeholder="Enter Item" className="form-control todo-form-input" name="text" type="text" id="addInput" onChange={e => setText(e.target.value)} value={text} />
        <button type="submit" className="btn btn-primary add-button">Add</button>
      </div>
    </form>
  );
};