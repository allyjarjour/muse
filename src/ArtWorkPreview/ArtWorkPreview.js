import React from "react";
import "./ArtWorkPreview.css";
import { useStore } from "../store";
import { Link } from "react-router-dom";




export const ArtWorkPreview = ({ artwork }) => {
  const { dispatch } = useStore();

  const findCurrentArtwork = () => {
    dispatch({ type: "updateCurrentArtwork", artDetails: artwork  })
  }

  return (
    <Link to={`/expanded-view/${artwork.title}`}>
      <img
        data-testid="artwork-preview"
        onClick={findCurrentArtwork}
        className="preview-image"
        src={artwork.primaryImageSmall}
        alt={artwork.title}
      />
    </Link>
  );
}