import React, { useEffect } from 'react';
import './App.css';
import { NavBar } from '../NavBar/NavBar'
import { Switch, Route } from "react-router-dom";
import { DailyCurationTitle } from '../DailyCurationTitle/DailyCurationTitle'
import { DailyCuration } from '../DailyCuration/DailyCuration'
import { ExpandedView } from '../ExpandedView/ExpandedView'
import { OtherWorkByArtist } from '../OtherWorkByArtist/OtherWorkByArtist'
import { useStore } from "../store";



function App() {
  const { state } = useStore();
  
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/expanded-view/:artwork">
          <ExpandedView artwork={state.currentArtwork} />
          <OtherWorkByArtist artwork={state.currentArtwork} />
        </Route>
        <Route exact path="/">
          <DailyCurationTitle />
          <DailyCuration />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
