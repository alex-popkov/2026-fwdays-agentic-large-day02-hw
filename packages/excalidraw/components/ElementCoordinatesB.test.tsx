import { render, screen } from "@testing-library/react";

import { ElementCoordinatesB } from "./ElementCoordinatesB";

const createMockApp = (elements: any[] = []) => {
  return {
    scene: {
      getSelectedElements: () => elements,
    },
  } as any;
};

const mockElement = {
  id: "test-1",
  x: 100.567,
  y: 200.123,
  width: 300.999,
  height: 150.001,
  angle: 0,
  type: "rectangle",
};

vi.mock("./App", () => ({
  useExcalidrawAppState: () => ({
    selectedElementIds: { "test-1": true },
  }),
}));

describe("ElementCoordinatesB", () => {
  it("renders without crashing", () => {
    const app = createMockApp();
    render(<ElementCoordinatesB app={app} />);
  });

  it("shows empty message when no element is selected", () => {
    const app = createMockApp([]);
    render(<ElementCoordinatesB app={app} />);
    expect(screen.getByText("No element selected")).toBeTruthy();
  });

  it("shows message when multiple elements are selected", () => {
    const app = createMockApp([mockElement, { ...mockElement, id: "test-2" }]);
    render(<ElementCoordinatesB app={app} />);
    expect(screen.getByText("Multiple elements selected")).toBeTruthy();
  });

  it("displays coordinates for a single selected element", () => {
    const app = createMockApp([mockElement]);
    render(<ElementCoordinatesB app={app} />);

    expect(screen.getByText("X")).toBeTruthy();
    expect(screen.getByText("100.57")).toBeTruthy();
    expect(screen.getByText("Y")).toBeTruthy();
    expect(screen.getByText("200.12")).toBeTruthy();
    expect(screen.getByText("W")).toBeTruthy();
    expect(screen.getByText("301")).toBeTruthy();
    expect(screen.getByText("H")).toBeTruthy();
    expect(screen.getByText("150")).toBeTruthy();
  });

  it("displays integer coordinates without decimals", () => {
    const intElement = { ...mockElement, x: 50, y: 75, width: 200, height: 100 };
    const app = createMockApp([intElement]);
    render(<ElementCoordinatesB app={app} />);

    expect(screen.getByText("50")).toBeTruthy();
    expect(screen.getByText("75")).toBeTruthy();
    expect(screen.getByText("200")).toBeTruthy();
    expect(screen.getByText("100")).toBeTruthy();
  });
});
