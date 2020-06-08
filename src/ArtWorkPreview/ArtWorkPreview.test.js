import React from "react";
import { ArtWorkPreview } from "./ArtWorkPreview";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { StoreProvider } from "../store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";


describe('ArtWorkPreview', () => {
  const history = createMemoryHistory();

  it('Should display an image of the artwork', () => {
    history.push("/");
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
    const { getByAltText } = render(
      <StoreProvider>
        <Router history={history}>
          <ArtWorkPreview artwork={artwork} />
        </Router>
      </StoreProvider>
    );
    expect(getByAltText("Sunflowers")).toBeInTheDocument();
  })
})
