import React from "react";
import { OtherWorkByArtist } from "./OtherWorkByArtist";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { StoreProvider } from "../store";
import { BrowserRouter } from "react-router-dom";
import { getOtherArtByArtist, getDailyCollection } from "../apiCalls.js";

getOtherArtByArtist.mockResolvedValue({ objectIDs: [438820, 436015] })
getDailyCollection.mockResolvedValue([
  {
    artistDisplayBio: "French, Ornans 1819–1877 La Tour-de-Peilz",
    artistDisplayName: "Gustave Courbet",
    artistNationality: "French",
    dimensions: "76 3/4 x 102 3/4 in. (194.9 x 261 cm)",
    isHighlight: true,
    medium: "Oil on canvas",
    objectDate: "1851–52",
    objectID: 438820,
    objectURL: "https://www.metmuseum.org/art/collection/search/438820",
    primaryImage:
      "https://images.metmuseum.org/CRDImages/ep/original/DT1967.jpg",
    primaryImageSmall:
      "https://images.metmuseum.org/CRDImages/ep/web-large/DT1967.jpg",
    title: "Young Ladies of the Village",
  },
  {
    artistDisplayBio: "French, Ornans 1819–1877 La Tour-de-Peilz",
    artistDisplayName: "Gustave Courbet",
    artistNationality: "French",
    dimensions: "76 3/4 x 102 3/4 in. (194.9 x 261 cm)",
    isHighlight: true,
    medium: "Oil on canvas",
    objectDate: "1857",
    objectID: 436015,
    objectURL: "https://www.metmuseum.org/art/collection/search/438820",
    primaryImage:
      "https://images.metmuseum.org/CRDImages/ep/original/DT1967.jpg",
    primaryImageSmall:
      "https://images.metmuseum.org/CRDImages/ep/web-large/DT1967.jpg",
    title: "Louis Gueymard (1822–1880) as Robert le Diable",
  },
]);
jest.mock("../apiCalls.js");

const artwork = {
  artistDisplayBio: "French, Ornans 1819–1877 La Tour-de-Peilz",
  artistDisplayName: "Gustave Courbet",
  artistNationality: "French",
  dimensions: "22 x 26 in. (55.9 x 66 cm)",
  isHighlight: false,
  medium: "Oil on canvas",
  objectDate: "1865-66",
  objectID: 436001,
  objectURL: "https://www.metmuseum.org/art/collection/search/438820",
  primaryImage: "https://images.metmuseum.org/CRDImages/ep/original/DT1967.jpg",
  primaryImageSmall:
    "https://images.metmuseum.org/CRDImages/ep/web-large/DT1967.jpg",
  title: "Jo, La Belle Irlandaise",
};


describe('OtherWorkByArtist', () => {
  it('should should display a title if there is other work by the same artist', async () => {
    const { getByAltText } = render(
      <BrowserRouter>
        <StoreProvider>
          <OtherWorkByArtist artwork={artwork} />
        </StoreProvider>
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(getByAltText("Young Ladies of the Village")).toBeInTheDocument();
      expect(getByAltText("Louis Gueymard (1822–1880) as Robert le Diable")).toBeInTheDocument();
    })
  })
})

