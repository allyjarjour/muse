import React from 'react'
import './NavBar.css'
import { NavLink, Link } from "react-router-dom"

export const NavBar = () => {
  return (
    <header>
      <Link to="/">
        <div className="title-container">
           <h1 className="title">Muse</h1>
           <p className="subtitle">inspiration from the Met</p>
        </div>
      </Link>
      <div className="nav-btn-container">
        <NavLink exact to="/" activeClassName="active-page">
          <p>Daily Curation</p>
        </NavLink>
        <NavLink to="/medium" activeClassName="active-page">
          <p>Medium</p>
        </NavLink>
        <NavLink to="/location" activeClassName="active-page">
          <p>Location</p>
        </NavLink>
        <NavLink to="/favorites" activeClassName="active-page">
          <p>Favorites</p>
        </NavLink>
      </div>
    </header>
  );
}