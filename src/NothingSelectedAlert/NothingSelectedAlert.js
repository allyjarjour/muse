import React from 'react'
import './NothingSelectedAlert.css'

export const NothingSelectedAlert = ({ page }) => {
  return (
    <div className={`NothingSelectedAlert `+ page} >
      <h2>{page === 'culture-or-artist' ? "discover new art by searching by artist name or culture above" :
        `discover new art by searching a ${page} above`}</h2>
    </div>
  );
}