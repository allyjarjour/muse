import React from 'react'
import './FavoritesPage.css'
import { useStore } from "../store";
import { ArtWorkPreview } from "../ArtWorkPreview/ArtWorkPreview";

export const FavoritesPage = () => {
  const { state } = useStore();

  return (
    <section className="FavoritesPage">
      <h1>Favorites</h1>
      <div className="images-container">
        {!state.favorites.length ? (
          <img className="blank-canvas" alt="blank canvas symbolizing an empty favorites page" src="/empty-canvas.png" />)
          : (state.favorites.map(fave => (
          <ArtWorkPreview artwork={fave} key={fave.objectID} />))
          )}
      </div>
    </section>
  );
}