import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Game from "./Game";

describe("Game of Life UI", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should switch cell state on clicking on it", async () => {
    render(<Game random={false} size={3}></Game>);

    const cell = screen.getByTestId("1-1");
    expect(cell).toHaveClass("dead");
    fireEvent.click(cell);
    expect(cell).toHaveClass("alive");
    fireEvent.click(cell);
    expect(cell).toHaveClass("dead");
  });

  test("should make game alive and move to next generation", async () => {
    render(<Game random={false} size={3}></Game>);
    fireEvent.click(screen.getByTestId("1-0"));
    expect(screen.getByTestId("1-0")).toHaveClass("alive");
    fireEvent.click(screen.getByTestId("1-1"));
    expect(screen.getByTestId("1-1")).toHaveClass("alive");
    fireEvent.click(screen.getByTestId("1-2"));
    expect(screen.getByTestId("1-2")).toHaveClass("alive");

    fireEvent.click(screen.getByTestId("run"));
    vi.advanceTimersToNextTimer();

    await waitFor(() => {
      expect(screen.getByTestId("0-1")).toHaveClass("alive");
      expect(screen.getByTestId("1-1")).toHaveClass("alive");
      expect(screen.getByTestId("2-1")).toHaveClass("alive");
    });
  });
});
