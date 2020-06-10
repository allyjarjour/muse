import React from "react";
import { NothingSelectedAlert } from "./NothingSelectedAlert";
import { render } from "@testing-library/react";


describe('NothingSelectedAlert', () => {
  it('should display a message if nothing has been selected', () => {
    const { getByText } = render(<NothingSelectedAlert page="culture-or-artist" />)
    expect(getByText('discover new art by searching by artist name or culture above')).toBeInTheDocument()
  })
})
