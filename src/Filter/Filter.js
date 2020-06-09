import React, { useState } from 'react'
import './Filter.css'

export const Filter = ({ page }) => {
  const [searchTerms, updateSearch] = useState({})

  const handleChange = (e) => {
    if (page === 'location') {
      const name = e.target.name;      
      const value = e.target.value;
      const search = {[name]: value}
      updateSearch(search)
      
    }
    console.log(searchTerms);
  }

  return (
    <section className="Filter">
      <h1>Explore by {page}</h1>
      <form className="filter-form">
        <div className="input-container">
          <input
            onChange={handleChange}
            className="search-input"
            type="text"
            name="search"
            placeholder={
              page === "location"
                ? "Europe, France, Paris, China, New York, etc."
                : "ceramics, furniture, paintings, sculpture, textiles, etc"
            }
          />
          {/* <img className="cancel-icon" src="./cancel-icon.svg" alt="clear input icon" /> */}
          <img className="search-icon" alt="search icon arrow" src="./go.png" />
        </div>
        <div className="on-display-checkbox">
          <label htmlFor="on-display">
            View only artwork on display at the Met
          </label>
          <input type="checkbox" id="on-display" name="on-display" />
        </div>
      </form>
    </section>
  );
}