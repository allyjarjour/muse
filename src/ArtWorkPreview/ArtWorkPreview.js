import React from "react";
import "./ArtWorkPreview.css";


export const ArtWorkPreview = ({src, alt}) => {
  return (
    <img
      className="preview-image"
        src={src}
        alt={alt}
    />
  );
}