import React from "react";
import { Filter } from "./Filter";
import { render, fireEvent } from '@testing-library/react'
import { StoreProvider } from "../store";


describe('Filter', () => {
  describe('filter by culture or artist page', () => {
    it('should display a title', () => {
      const { getByText } = render(
        <StoreProvider>
          <Filter page="culture-or-artist" />
        </StoreProvider>
      );
      expect(getByText("Explore by culture or artist")).toBeInTheDocument();
    })

    it("should update the search query on change", () => {
      const { getByPlaceholderText } = render(
        <StoreProvider>
          <Filter page="culture-or-artist" />
        </StoreProvider>
      );
      fireEvent.change(getByPlaceholderText("French, Spanish, Vincent Van Gogh, Edgar Degas, etc."),
        { target: { value: "Van Gogh" } })
      expect(getByPlaceholderText("French, Spanish, Vincent Van Gogh, Edgar Degas, etc.").value).toBe("Van Gogh")
    });

    it("should allow user to select the option to view only artwork on display", () => {
      const { getByLabelText, getByText } = render(
        <StoreProvider>
          <Filter page="culture-or-artist" />
        </StoreProvider>
      );
      fireEvent.click(getByText("View only artwork on display at the Met"));
      expect(getByLabelText("View only artwork on display at the Met").checked).toBe(true);
    });
  })
})
