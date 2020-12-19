import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { TodoPage } from './components/TodoPage/TodoPage';
import { v4 as uuid } from 'uuid';

function App() {
  // generate new uuid if they want to create a new list.
  const token = uuid();
  return (

    <Router>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossOrigin="anonymous"
      />
      <div>
        <h2>Todo List</h2>

        <ul>
          <li>
            <Link to={`${token}`}>Create a new Todo List</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/:token" component={TodoPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
