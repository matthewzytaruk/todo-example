import React, { useState } from 'react';
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

  const getToken = () => uuid();

  // generate new uuid if they want to create a new list.
  let [token, setToken] = useState(getToken());
  const handleClick = (evt: React.MouseEvent) => {
    setToken(getToken());
  }


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
            <Link to={`${token}`} onClick={handleClick}>Create a new Todo List</Link>
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
