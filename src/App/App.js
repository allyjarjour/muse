import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { NavBar } from '../NavBar/NavBar'
import { FavoritesPage } from '../FavoritesPage/FavoritesPage'
import { Switch, Route } from "react-router-dom";
import { DailyCurationTitle } from '../DailyCurationTitle/DailyCurationTitle'
import { DailyCuration } from '../DailyCuration/DailyCuration'
import { ExpandedView } from '../ExpandedView/ExpandedView'
import { Filter } from '../Filter/Filter'
import { NothingSelectedAlert } from '../NothingSelectedAlert/NothingSelectedAlert'
import { OtherWorkByArtist } from '../OtherWorkByArtist/OtherWorkByArtist'
import { useStore } from "../store";


function App() {
  const { state } = useStore();
  
  return (
    <div className="App">
      <NavBar />
      <main>
        <Switch>
          <Route path="/expanded-view/:artwork">
            <ExpandedView artwork={state.currentArtwork} />
            <OtherWorkByArtist artwork={state.currentArtwork} />
          </Route>
          <Route path="/favorites">
            <FavoritesPage />
          </Route>
          <Route path="/culture_or_artist">
            <Filter page="culture-or-artist" />
            {!state.cultureOrArtistQuery && (
              <NothingSelectedAlert page="culture-or-artist" />
            )}
            {state.cultureOrArtistQuery && (
              <DailyCuration page="culture-or-artist" />
            )}
          </Route>
          <Route path="/medium">
            <Filter page="medium" />
            {!state.mediumQuery && <NothingSelectedAlert page="medium" />}
            {state.mediumQuery && <DailyCuration page="medium" />}
          </Route>
          <Route exact path="/">
            <DailyCurationTitle />
            <DailyCuration page="daily-curation" />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
