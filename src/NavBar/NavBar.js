import React from 'react'
import { useStore } from '../store'
import './NavBar.css'
import { NavLink } from "react-router-dom"

export const NavBar = () => {
  return (
    <header>
      <div className="title-container">
        <h1 className="title">Muse</h1>
        <p className="subtitle">inspiration from the Met</p>
      </div>
      <div className="nav-btn-container">
        <NavLink to="/daily_curation" activeClassName="active-page">
          <p>Daily Curation</p>
        </NavLink>
        <NavLink to="/medium" activeClassName="active-page">
          <p>Medium</p>
        </NavLink>
        <NavLink to="/location" activeClassName="active-page">
          <p>Location</p>
        </NavLink>
      </div>
    </header>
  );
}