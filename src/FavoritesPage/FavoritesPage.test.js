import React from "react";
import { FavoritesPage } from "./FavoritesPage";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { StoreProvider } from "../store";



describe('FavoritesPage', () => {

  it('should display a title', () => {
    const { getByText } = render(
      <StoreProvider>
        <FavoritesPage />
      </StoreProvider>
    );
    expect(getByText("Favorites")).toBeInTheDocument()
  })

  it('should display a message and an empty canvas icon if there are no favorites', () => {
    const { getByAltText } = render(
      <StoreProvider>
        <FavoritesPage />
      </StoreProvider>
    );
    expect(getByAltText("blank canvas symbolizing an empty favorites page")).toBeInTheDocument()
  })
  
})
