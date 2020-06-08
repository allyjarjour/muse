import React from "react";
import { ExpandedView } from "./ExpandedView";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { StoreProvider } from "../store";
import userEvent from "@testing-library/user-event";


describe('ExpandedView', () => {
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
  it('should display an image of the artwork', () => {
    const { getByAltText } = render(
      <StoreProvider>
        <ExpandedView artwork={artwork} />
      </StoreProvider>
    );
    expect(getByAltText('Sunflowers')).toBeInTheDocument();
  })

  it('should display artwork details', () => {
    const { getByText } = render(
      <StoreProvider>
        <ExpandedView artwork={artwork} />
      </StoreProvider>
    );
    expect(getByText('Sunflowers')).toBeInTheDocument();
    expect(getByText('Vincent van Gogh')).toBeInTheDocument();
    expect(getByText('Dutch, Zundert 1853–1890 Auvers-sur-Oise')).toBeInTheDocument();
    expect(getByText('1887')).toBeInTheDocument();
    expect(getByText('Oil on canvas')).toBeInTheDocument();
    expect(getByText('17 x 24 in. (43.2 x 61 cm)')).toBeInTheDocument();
    expect(getByText('Read more at the Met')).toBeInTheDocument();
  })

  it('should display an empty heart if not favorited', () => {
    const { getByAltText } = render(
      <StoreProvider>
        <ExpandedView artwork={artwork} />
      </StoreProvider>
    );
    expect(getByAltText("Icon for artwork not favorited")).toBeInTheDocument();
  }) 

  it('should display a favorited heart once the user clicks the unfavorited icon', () => {
    const { getByAltText, queryByAltText } = render(
      <StoreProvider>
        <ExpandedView artwork={artwork} />
      </StoreProvider>
    );
    userEvent.click(getByAltText("Icon for artwork not favorited"));
    expect(getByAltText("Icon for favorited artwork")).toBeInTheDocument();
    expect(queryByAltText("Icon for artwork not favorited")).not.toBeInTheDocument();
  })

  it('should display an unfavorited heart once the user clicks the favorited icon', () => {
    const { getByAltText, queryByAltText } = render(
      <StoreProvider>
        <ExpandedView artwork={artwork} />
      </StoreProvider>
    );
    userEvent.click(getByAltText("Icon for artwork not favorited"));
    userEvent.click(getByAltText("Icon for favorited artwork"));
    expect(getByAltText("Icon for artwork not favorited")).toBeInTheDocument();
    expect(queryByAltText("Icon for favorited artwork")).not.toBeInTheDocument();
  })

})

