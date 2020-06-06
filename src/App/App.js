import React from 'react';
import './App.css';
import { NavBar } from '../NavBar/NavBar'
import { Switch, Route } from "react-router-dom";
import { DailyCurationTitle } from '../DailyCurationTitle/DailyCurationTitle'
import { DailyCuration } from '../DailyCuration/DailyCuration'

function App() {

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <DailyCurationTitle />
          <DailyCuration />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
