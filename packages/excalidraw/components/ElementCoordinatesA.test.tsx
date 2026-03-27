import { render, screen } from "@testing-library/react";
import { ElementCoordinatesA } from "./ElementCoordinatesA";

const mockElement = {
  id: "test-1",
  type: "rectangle",
  x: 100,
  y: 200,
  width: 300,
  height: 150,
  angle: 0,
  strokeColor: "#000000",
  backgroundColor: "transparent",
  fillStyle: "hachure",
  strokeWidth: 1,
  strokeStyle: "solid",
  roughness: 1,
  opacity: 100,
  seed: 1,
  version: 1,
  versionNonce: 1,
  isDeleted: false,
  groupIds: [],
  boundElements: null,
  updated: 1,
  link: null,
  locked: false,
  frameId: null,
  index: "a0" as any,
  roundness: null,
  scale: [1, 1] as [number, number],
} as any;

describe("ElementCoordinatesA", () => {
  it("renders without crashing", () => {
    render(<ElementCoordinatesA />);
  });

  it("shows empty state when no element provided", () => {
    render(<ElementCoordinatesA />);
    expect(screen.getByText("No element selected")).toBeTruthy();
  });

  it("displays element coordinates", () => {
    render(<ElementCoordinatesA element={mockElement} />);
    expect(screen.getByText("X")).toBeTruthy();
    expect(screen.getByText("100")).toBeTruthy();
    expect(screen.getByText("Y")).toBeTruthy();
    expect(screen.getByText("200")).toBeTruthy();
  });

  it("displays element dimensions", () => {
    render(<ElementCoordinatesA element={mockElement} />);
    expect(screen.getByText("Width")).toBeTruthy();
    expect(screen.getByText("300")).toBeTruthy();
    expect(screen.getByText("Height")).toBeTruthy();
    expect(screen.getByText("150")).toBeTruthy();
  });
});
