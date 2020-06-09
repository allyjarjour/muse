import React, { useState, useEffect } from 'react'
import './Filter.css'
import { useStore } from "../store";

// import { fetchByArtistOrCulture } from '../apiCalls'

export const Filter = ({ page }) => {
  const [searchTerms, updateSearch] = useState({})
  const { state, dispatch } = useStore()

  useEffect(() => {

    return () => {
      dispatch({ type: "updateCultureOrArtistQuery", cultureOrArtistQuery: "" })
    }
  }, [])

  const handleChange = (e) => {
    if (page === 'culture-or-artist') {
      const name = e.target.name;      
      const value = e.target.value;
      const search = {[name]: value}
      updateSearch(search)
    }
  }

  const handleClick = () => {
    if (page === "culture-or-artist") {
      dispatch({ type: "updateCultureOrArtistQuery", cultureOrArtistQuery: searchTerms });
    }
    console.log(state.cultureOrArtistQuery);
  }

  const filterByDisplay = (e) => {
    if (e.target.checked) {
      dispatch({ type: "updateFilterByDisplay", filterByDisplay: true });
    }
    if (!e.target.checked) {
      dispatch({ type: "updateFilterByDisplay", filterByDisplay: false });
    }
  }

  return (
    <section className="Filter">
      <h1>
        Explore by{" "}
        {page === "culture-or-artist" ? "culture or artist" : "medium"}
      </h1>
      <form className="filter-form">
        <div className="input-container">
          <input
            onChange={handleChange}
            className="search-input"
            type="text"
            name="search"
            placeholder={
              page === "culture-or-artist"
                ? "French, Spanish, Vincent Van Gogh, Edgar Degas, etc."
                : "ceramics, furniture, paintings, sculpture, textiles, etc"
            }
          />
          {/* <img className="cancel-icon" src="./cancel-icon.svg" alt="clear input icon" /> */}
          <img
            className="search-icon"
            alt="search icon arrow"
            src="./go.png"
            role="button"
            aria-pressed="false"
            tabIndex="0"
            onClick={handleClick}
            onKeyDown={handleClick}
          />
        </div>
        <div className="on-display-checkbox">
          <label htmlFor="on-display">
            View only artwork on display at the Met
          </label>
          <input type="checkbox" id="on-display" name="on-display" onClick={filterByDisplay}/>
        </div>
      </form>
    </section>
  );
}