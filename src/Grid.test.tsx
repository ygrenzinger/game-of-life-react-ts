import { beforeEach, describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Grid from "./Grid";
import "@testing-library/jest-dom";

describe("Grid UI", () => {
  beforeEach(() => {
    render(<Grid size={3}></Grid>);
  });

  test("should switch cell state on clicking on it", () => {
    const cell = screen.getByTestId("1-1");
    expect(cell).toHaveClass("dead");
    fireEvent.click(cell);
    expect(cell).toHaveClass("alive");
    fireEvent.click(cell);
    expect(cell).toHaveClass("dead");
  });
});
