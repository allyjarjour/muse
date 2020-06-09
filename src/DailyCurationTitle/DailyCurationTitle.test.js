import React from "react";
import { DailyCurationTitle } from "./DailyCurationTitle";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { StoreProvider } from "../store";

describe('DailyCurationTitle', () => {
  it('Should display a title', () => {
    const { getByText } = render(
      <StoreProvider>
        <DailyCurationTitle />
      </StoreProvider>
    );
    expect(
      getByText("Explore a collection of art chosen around a daily theme. Today find inspiration through")).toBeInTheDocument();
  })
  it('Should display the daily curation theme', () => {
    const { getByRole } = render(
      <StoreProvider>
        <DailyCurationTitle />
      </StoreProvider>
    );
    expect(getByRole('heading')).toBeInTheDocument()
})
})
