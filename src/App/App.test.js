import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from './App';
import { StoreProvider } from "../store";
import { Router } from "react-router-dom";
import {
  getOtherArtByArtist,
  getDailyCollection,
  getDailyCollectionIds,
  fetchByArtistOrCulture,
  fetchByArtistOrCultureAndOnDisplay,
} from "../apiCalls.js";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

fetchByArtistOrCultureAndOnDisplay.mockResolvedValue([12345])
fetchByArtistOrCulture.mockResolvedValue([11922]);
getDailyCollectionIds.mockResolvedValue([436524, 11922]);
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
       const { queryByTestId, getAllByTestId, getByText, getByAltText } = render(
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
    const { getByText } = render(
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

  it('should direct to the search by artist or culture page upon clicking the search tab in the nav bar', async () => {
    const history = createMemoryHistory();
    history.push("/");
    const { getByText } = render(
      <StoreProvider>
        <Router history={history}>
          <App />
        </Router>
      </StoreProvider>
    );
    await waitFor(() => {
      userEvent.click(getByText('Artist'))
      expect(getByText("discover new art by searching by artist name or culture above")).toBeInTheDocument();
      expect(getByText("Explore by culture or artist")).toBeInTheDocument();
      expect(getByText("View only artwork on display at the Met")).toBeInTheDocument();
    })
  })

  it('should direct to the search by medium page upon clicking the medium tab in the nav bar', async () => {
    const history = createMemoryHistory();
    history.push("/");
    const { getByText } = render(
      <StoreProvider>
        <Router history={history}>
          <App />
        </Router>
      </StoreProvider>
    );
    await waitFor(() => {
      userEvent.click(getByText('Medium'))
      expect(getByText("discover new art by searching a medium above")).toBeInTheDocument();
      expect(getByText("Explore by medium")).toBeInTheDocument();
      expect(getByText("View only artwork on display at the Met")).toBeInTheDocument();
    })
  })
})