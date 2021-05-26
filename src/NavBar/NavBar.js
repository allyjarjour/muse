import React from 'react'
import './NavBar.css'
import { NavLink, Link } from "react-router-dom"
import { useStore } from "../store";
import { Menu, Dropdown } from "antd";

import { MenuOutlined } from "@ant-design/icons";

export const NavBar = () => {
  const { dispatch } = useStore();

  const getNavigationContainer = (containerClass) => (
    <div className={containerClass}>
      <NavLink exact to="/" activeClassName="active-page">
        <p>Daily Curation</p>
      </NavLink>
      <NavLink
        to="/medium"
        activeClassName="active-page"
        onClick={() =>
          dispatch({
            type: "updateCultureOrArtistQuery",
            cultureOrArtistQuery: "",
          })
        }
      >
        <p>Medium</p>
      </NavLink>
      <NavLink
        to="/culture_or_artist"
        activeClassName="active-page"
        onClick={() => dispatch({ type: "updateMediumQuery", mediumQuery: "" })}
      >
        <p>Artist</p>
      </NavLink>
      <NavLink to="/favorites" activeClassName="active-page">
        <p>Favorites</p>
      </NavLink>
    </div>
  );

  const menu = (
    <Menu className="dropdown-hamburger-menu">
      <Menu.Item>
        {getNavigationContainer("mobile")}
      </Menu.Item>
    </Menu>
  );

  return (
    <header>
      <Link to="/">
        <div className="title-container">
          <h1 className="title">Muse</h1>
          <p className="subtitle">inspiration from the Met</p>
        </div>
      </Link>
      {getNavigationContainer("desktop nav-btn-container")}
        <Dropdown overlay={menu}>
          <MenuOutlined className="hamburger-menu" />
        </Dropdown>
    </header>
  );
}