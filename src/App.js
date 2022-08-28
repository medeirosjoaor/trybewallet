import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Router>
      <Switch>
        <Route component={ Login } exact path="/" />
        <Route component={ Wallet } exact path="/carteira" />
      </Switch>
    </Router>
  );
}

export default App;
