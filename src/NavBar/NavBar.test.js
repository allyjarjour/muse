import React from "react";
import { NavBar } from "./NavBar";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";


describe("NavBar", () => {
  it("should display the MUSE logo", () => {
    const { getByText } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    expect(getByText("Muse")).toBeInTheDocument()
    expect(getByText("inspiration from the Met")).toBeInTheDocument()
  }) 

  it("should display four page tabs for navigation", () => {
    const { getByText } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    expect(getByText("Daily Curation")).toBeInTheDocument()
    expect(getByText("Medium")).toBeInTheDocument()
    expect(getByText("Location")).toBeInTheDocument()
    expect(getByText("Favorites")).toBeInTheDocument()
  })

})