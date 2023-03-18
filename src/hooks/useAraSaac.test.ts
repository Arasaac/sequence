import { renderHook } from "@testing-library/react";
import useAraSaac from "./useAraSaac";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

beforeEach(() => jest.clearAllMocks());

describe("Given a useAraSacc hook", () => {
  describe("When getSearchPictogram it's called with search wordMock and indexPict", () => {
    test("Then should called dispatch with action creator", async () => {
      const indexPict = 0;
      const wordSearchMock = "girl";
      const expectAction = {
        payload: {
          indexPict: 0,
          word: { keyWord: "girl", pictograms: [234, 234] },
        },
        type: "sequence/upDatePictWord",
      };

      const { result } = renderHook(() => useAraSaac());

      await result.current.getSearchPictogram(wordSearchMock, indexPict);

      expect(mockDispatch).toHaveBeenCalledWith(expectAction);
    });
  });

  describe("When getSearchPictogram it's called with search invalid wordMock", () => {
    test("Then should called dispatch with action creator", async () => {
      const indexPict = 0;
      const wordSearchMock = "asdfas";
      const expectAction = {
        payload: {
          indexPict: 0,
          word: { keyWord: "asdfas", pictograms: [-1] },
        },
        type: "sequence/upDatePictWord",
      };

      const { result } = renderHook(() => useAraSaac());

      await result.current.getSearchPictogram(wordSearchMock, indexPict);

      expect(mockDispatch).toHaveBeenCalledWith(expectAction);
    });
  });
});
