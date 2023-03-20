import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Index Page", () => {
  it("Should check for classnames", () => {
    render(<Home />);

    expect(screen.getByTestId("container")).toBeInTheDocument();
  });
});
