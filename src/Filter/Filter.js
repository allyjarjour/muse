import React, { useState, useEffect } from 'react'
import './Filter.css'
import { useStore } from "../store";
import goIcon from "./go.png"


export const Filter = ({ page }) => {
  const [searchTerms, updateSearch] = useState({search: ''})
  const { dispatch } = useStore()

  useEffect(() => {
    return () => {
      dispatch({ type: "updateCultureOrArtistQuery", cultureOrArtistQuery: "" })
      dispatch({ type: "updateMediumQuery", mediumQuery: "" })
    }
  }, [])

  const handleChange = (e) => {
    if (page === "medium") {
      const name = e.target.name;      
      const value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
      const search = {[name]: value}
      updateSearch(search)
    } else {
      const name = e.target.name;
      const value = e.target.value;
      const search = { [name]: value };
      updateSearch(search);
    }
  }

  const handleClick = () => {
    if (page === "culture-or-artist") {
      dispatch({ type: "updateCultureOrArtistQuery", cultureOrArtistQuery: searchTerms });
    }
    if (page === "medium") {
      dispatch({ type: "updateMediumQuery", mediumQuery: searchTerms });
    }
    updateSearch({search: ''});
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
            value={searchTerms.search}
            name="search"
            placeholder={
              page === "culture-or-artist"
                ? "French, Spanish, Vincent Van Gogh, Edgar Degas, etc."
                : "ceramics, furniture, paintings, sculpture, textiles, etc"
            }
          />
          <img
            className="search-icon"
            alt="search icon arrow"
            src={goIcon}
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