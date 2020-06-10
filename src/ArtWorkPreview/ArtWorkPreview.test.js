import React from "react";
import { ArtWorkPreview } from "./ArtWorkPreview";
import { render, waitFor } from "@testing-library/react";
import { StoreProvider } from "../store";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";


describe('ArtWorkPreview', () => {
  let artwork = {
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
    primaryImage: "https://images.metmuseum.org/CRDImages/ep/original/DP229743.jpg",
    primaryImageSmall: "https://images.metmuseum.org/CRDImages/ep/web-large/DP229743.jpg",
    title: "Sunflowers"
  }

  it('Should display an image of the artwork', () => {
    const { getByAltText } = render(
      <StoreProvider>
        <BrowserRouter>
          <ArtWorkPreview artwork={artwork} />
        </BrowserRouter>
      </StoreProvider>
    );
    expect(getByAltText("Sunflowers")).toBeInTheDocument();
  })

  it('Should take user to expanded view page once image is clicked', async () => {
    const { getByAltText, getByTestId } = render(
      <StoreProvider>
        <BrowserRouter>
          <ArtWorkPreview artwork={artwork} />
        </BrowserRouter>
      </StoreProvider>
    );
    waitFor(() => {
      userEvent.click(getByAltText("Sunflowers"))
      expect(getByTestId("artwork-preview")).not.toBeInTheDocument()
     })
  })
})
