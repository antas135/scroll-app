import fetchMock from "jest-fetch-mock";

import { mockImagesPage1 } from "./tests/data";
fetchMock.enableMocks();

global.fetch = fetchMock as unknown as jest.MockedFunction<typeof fetch>;

fetchMock.mockResponseOnce(
  JSON.stringify({ json: () => Promise.resolve({ photos: mockImagesPage1 }) })
);
