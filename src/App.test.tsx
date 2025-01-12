import App from "./App";
import { preloadedState, render, screen } from "./utils/test-utils";

const mockAction = jest.fn();
jest.mock("./hooks/useAraSaac", () => () => ({
  getSearchPictogram: mockAction,
  toUrlPath: mockAction,
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("Give a App", () => {
  describe("When it's rendered with title", () => {
    test("Then should show this title", () => {
      const expectTitle = "SequenceSAAC";

      render(<App />, { preloadedState: { ...preloadedState } });
      const title = screen.getByRole("heading", {
        name: expectTitle,
        level: 1,
      });

      expect(title).toBeInTheDocument();
    });
  });
});
