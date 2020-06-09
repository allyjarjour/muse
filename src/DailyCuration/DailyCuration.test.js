import React from "react";
import { DailyCuration } from "./DailyCuration";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { StoreProvider } from "../store";
import { BrowserRouter } from "react-router-dom";
import { getDailyCollectionIds, getDailyCollection } from '../apiCalls.js'

getDailyCollectionIds.mockResolvedValue([436524, 11922]);
getDailyCollection.mockResolvedValue([
  {
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
  },
  {
    artistAlphaSort: "Rinehart, William Henry",
    artistBeginDate: "1825",
    artistDisplayBio: "American, Union Bridge, Maryland 1825–1874 Rome",
    artistDisplayName: "William Henry Rinehart",
    artistNationality: "American",
    culture: "American",
    department: "The American Wing",
    dimensions: "62 1/2 x 18 1/2 x 21 1/4 in. (158.8 x 47 x 54 cm)",
    isHighlight: false,
    medium: "Marble",
    metadataDate: "2020-03-03T07:20:07.517Z",
    objectBeginDate: 1869,
    objectDate: "1869–70; carved 1872",
    objectEndDate: 1872,
    objectID: 11922,
    objectName: "Sculpture",
    objectURL: "https://www.metmuseum.org/art/collection/search/11922",
    primaryImage: "https://images.metmuseum.org/CRDImages/ad/original/DT218366.jpg",
    primaryImageSmall: "https://images.metmuseum.org/CRDImages/ad/web-large/DT218366.jpg",
    title: "Clytie",
  }
]);
jest.mock("../apiCalls.js");



describe('DailyCuration', () => {
  it('should display a container for the images', async () => {
    const { getByTestId } = render(
      <StoreProvider>
        <BrowserRouter>
          <DailyCuration />
        </BrowserRouter>
      </StoreProvider>
    );
    await waitFor(() => {
      expect(getByTestId("images-container")).toBeInTheDocument();
    })
  })

  it('should display artwork previews for the data fetched from api', async () => {
    const { getByAltText } = render(
      <StoreProvider>
        <BrowserRouter>
          <DailyCuration />
        </BrowserRouter>
      </StoreProvider>
    );
    await waitFor(() => {
      expect(getByAltText("Sunflowers")).toBeInTheDocument()
      expect(getByAltText("Clytie")).toBeInTheDocument()
    })
  })
})