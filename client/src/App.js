import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom'
import Login from './pages/Login';
import JsonPatch from './pages/JsonPatch';
import history from './_utils/history'

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact={true} path="/login" component={props => <Login {...props} />} />
        <Route exact={true} path="/" component={props => <JsonPatch {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
