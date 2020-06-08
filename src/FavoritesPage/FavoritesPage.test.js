import React from "react";
import { FavoritesPage } from "./FavoritesPage";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ExpandedView } from "../ExpandedView/ExpandedView";
import { StoreProvider } from "../store";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";


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
  
  it('should display image previews for artwork if user has favorited them', () => {
    const artwork = {
      artistAlphaSort: "Gogh, Vincent van",
      artistBeginDate: "1853",
      artistDisplayBio: "Dutch, Zundert 1853–1890 Auvers-sur-Oise",
      artistDisplayName: "Vincent van Gogh",
      artistEndDate: "1890",
      artistNationality: "Dutch",
      dimensions: "17 x 24 in. (43.2 x 61 cm)",
      isHighlight: false,
      medium: "Oil on canvas",
      objectDate: "1887",
      objectID: 436524,
      primaryImage:
        "https://images.metmuseum.org/CRDImages/ep/original/DP229743.jpg",
      primaryImageSmall:
        "https://images.metmuseum.org/CRDImages/ep/web-large/DP229743.jpg",
      title: "Sunflowers",
    };
    const { getByAltText, getByTestId } = render(
      <StoreProvider>
        <BrowserRouter>
          <ExpandedView artwork={artwork} />
          <FavoritesPage />
        </BrowserRouter>
      </StoreProvider>
    );
    
    userEvent.click(getByAltText("Icon for artwork not favorited"));
    expect(getByAltText("Icon for favorited artwork")).toBeInTheDocument();
    expect(getByTestId("artwork-preview")).toBeInTheDocument();
  })

})
