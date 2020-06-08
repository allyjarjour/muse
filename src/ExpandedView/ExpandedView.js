import React from 'react'
import './ExpandedView.css'
import { useStore } from "../store";


export const ExpandedView = ({ artwork }) => {
  const { state, dispatch } = useStore();
  const unFaveHeart = "/not-liked.svg"
  const faveHeart = "/like.svg" 

  const toggleFavorite = () => {
    if ((state.favorites.some(fave => fave.objectID === artwork.objectID))) {
      dispatch({ type: "deleteFromFavorites", artDetails: artwork });
    }
    if (!(state.favorites.some(fave => fave.objectID === artwork.objectID))) {
      dispatch({ type: "addToFavorites", artDetails: artwork });
    }    
  }

  return (
    <div className="ExpandedView">
      <img
        className="expanded-view-image"
        src={artwork.primaryImageSmall}
        alt={artwork.title}
      />
      <div className="artwork-details">
        <div className="title-container-expanded">
          <h1>{artwork.title}</h1>
          <img
            onClick={toggleFavorite}
            alt={
              state.favorites.some((fave) => fave.objectID === artwork.objectID)
                ? "Icon for favorited artwork"
                : "Icon for artwork not favorited"
            }
            className="heart-icon"
            src={
              state.favorites.some((fave) => fave.objectID === artwork.objectID)
                ? faveHeart
                : unFaveHeart
            }
          />
        </div>
        {artwork.artistDisplayName && (
          <p>
            <span>{artwork.artistDisplayName}</span> {artwork.artistDisplayBio}
          </p>
        )}
        <p>
          <span>Date:</span> {artwork.objectDate}
        </p>
        <p>
          <span>Medium:</span> {artwork.medium}
        </p>
        <p>
          <span>Dimensions:</span> {artwork.dimensions}
        </p>
        <p>
          <a href={artwork.objectURL}>Read more at the Met</a>
        </p>
      </div>
    </div>
  );
}