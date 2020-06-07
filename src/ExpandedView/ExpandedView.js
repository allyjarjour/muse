import React from 'react'
import './ExpandedView.css'

export const ExpandedView = ({ artwork }) => {
  return (
    <div className="ExpandedView">
      <img
        className="expanded-view-image"
        src={artwork.primaryImage}
        alt={artwork.title}
      />
      <div className="artwork-details">
        <h1>{artwork.title}</h1>
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