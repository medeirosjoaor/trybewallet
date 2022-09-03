import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route component={ Login } exact path="/" />
      <Route component={ Wallet } exact path="/carteira" />
    </Switch>
  );
}

export default App;
