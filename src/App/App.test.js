import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from './App';
import "@testing-library/jest-dom/extend-expect";
import { StoreProvider } from "../store";
import { Router } from "react-router-dom";
import {
  getOtherArtByArtist,
  getDailyCollection,
  getDailyCollectionIds,
} from "../apiCalls.js";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";


getDailyCollectionIds.mockResolvedValue([436524, 11922]);
// getDailyCollection.mockResolvedValue([
//   {
//     artistAlphaSort: "Gogh, Vincent van",
//     artistBeginDate: "1853",
//     artistDisplayBio: "Dutch, Zundert 1853–1890 Auvers-sur-Oise",
//     artistDisplayName: "Vincent van Gogh",
//     artistEndDate: "1890",
//     artistNationality: "Dutch",
//     dimensions: "17 x 24 in. (43.2 x 61 cm)",
//     isHighlight: false,
//     medium: "Oil on canvas",
//     objectDate: "1887",
//     objectID: 436524,
//     primaryImage:
//       "https://images.metmuseum.org/CRDImages/ep/original/DP229743.jpg",
//     primaryImageSmall:
//       "https://images.metmuseum.org/CRDImages/ep/web-large/DP229743.jpg",
//     title: "Sunflowers",
//   },
//   {
//     artistAlphaSort: "Rinehart, William Henry",
//     artistBeginDate: "1825",
//     artistDisplayBio: "American, Union Bridge, Maryland 1825–1874 Rome",
//     artistDisplayName: "William Henry Rinehart",
//     artistNationality: "American",
//     culture: "American",
//     department: "The American Wing",
//     dimensions: "62 1/2 x 18 1/2 x 21 1/4 in. (158.8 x 47 x 54 cm)",
//     isHighlight: false,
//     medium: "Marble",
//     metadataDate: "2020-03-03T07:20:07.517Z",
//     objectBeginDate: 1869,
//     objectDate: "1869–70; carved 1872",
//     objectEndDate: 1872,
//     objectID: 11922,
//     objectName: "Sculpture",
//     objectURL: "https://www.metmuseum.org/art/collection/search/11922",
//     primaryImage:
//       "https://images.metmuseum.org/CRDImages/ad/original/DT218366.jpg",
//     primaryImageSmall:
//       "https://images.metmuseum.org/CRDImages/ad/web-large/DT218366.jpg",
//     title: "Clytie",
//   },
// ]);
getOtherArtByArtist.mockResolvedValue({ objectIDs: [438820, 436015] });
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

describe("App", () => {

  it("should load the daily curation page on startup", async () => {
    const history = createMemoryHistory()
    history.push('/')
    const { getByText, getByTestId } = render(
      <StoreProvider>
        <Router history={history}>
          <App />
        </Router>
      </StoreProvider>
    );
    await waitFor(() => {
      expect(getByText("Explore a collection of art chosen around a daily theme." +
        " Today find inspiration through")).toBeInTheDocument()
      expect(getByTestId("images-container")).toBeInTheDocument()
    })
  })

  it("should redirect to the expanded artwork page when an image preview is clicked", async () => {
    const history = createMemoryHistory();
    history.push("/");
    const { queryByTestId, getAllByTestId, getByText } = render(
      <StoreProvider>
        <Router history={history}>
          <App />
        </Router>
      </StoreProvider>
    );
    await waitFor(() => {
      expect(getAllByTestId("artwork-preview")).toHaveLength(2);
      userEvent.click(getAllByTestId('artwork-preview')[0])
      expect(queryByTestId("images-container")).not.toBeInTheDocument();
      expect(getByText("Young Ladies of the Village")).toBeInTheDocument();
    })
  })

  it('should switch expanded view artwork to the the artwork selected from OtherWorkByArtist section' +
    'when user clicks the image', async () => {
       const history = createMemoryHistory();
       history.push("/");
       const { queryByTestId, getAllByTestId, getByText, debug, getByAltText } = render(
         <StoreProvider>
           <Router history={history}>
             <App />
           </Router>
         </StoreProvider>
       );
      await waitFor(() => {
      expect(getAllByTestId("artwork-preview")).toHaveLength(2);
      userEvent.click(getAllByTestId('artwork-preview')[0])
      expect(queryByTestId("images-container")).not.toBeInTheDocument();
      expect(getByText("Young Ladies of the Village")).toBeInTheDocument();
      })

      await waitFor(() => {
        userEvent.click(getByAltText("Louis Gueymard (1822–1880) as Robert le Diable"));
      })

      await waitFor(() => {
        expect(getByText("Louis Gueymard (1822–1880) as Robert le Diable")).toBeInTheDocument();
      })
  })
  
  it('should be able to update favorites and display them once the user clicks on the favorites tab', async () => {
       const history = createMemoryHistory();
       history.push("/");
       const { queryByTestId, getByTestId, getAllByTestId, getByText, getByAltText } = render(
         <StoreProvider>
           <Router history={history}>
             <App />
           </Router>
         </StoreProvider>
       );
      await waitFor(() => {
        userEvent.click(getAllByTestId("artwork-preview")[0]);
        expect(queryByTestId("images-container")).not.toBeInTheDocument();
        expect(getByText("Young Ladies of the Village")).toBeInTheDocument();
        userEvent.click(getByAltText("Icon for artwork not favorited"));
        expect(getByAltText("Icon for favorited artwork")).toBeInTheDocument();
        userEvent.click(getByText("Favorites"));
        expect(getByTestId("fave-images-container")).toBeInTheDocument();
        expect(getAllByTestId("artwork-preview")).toHaveLength(1)
      })
  })
  
  it('should return to homepage/Daily Curation page once the user clicks the logo', async () => {
    const history = createMemoryHistory();
    history.push("/favorites");
    const { getByText, debug } = render(
      <StoreProvider>
        <Router history={history}>
          <App />
        </Router>
      </StoreProvider>
    );
    await waitFor(() => {
      userEvent.click(getByText('Muse'))
      expect(
        getByText("Explore a collection of art chosen around a daily theme. Today find inspiration through"
        )).toBeInTheDocument();
    })
  })
})