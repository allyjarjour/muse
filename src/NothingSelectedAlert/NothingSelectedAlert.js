import React from 'react'
import './NothingSelectedAlert.css'

export const NothingSelectedAlert = ({ page }) => {
  return (
    <div className={`NothingSelectedAlert `+ page} >
      <h2>discover new art by searching a {page} above</h2>
    </div>
  );
}