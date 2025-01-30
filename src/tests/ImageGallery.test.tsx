import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ImageGallery } from "../components";
import { mockImagesPage1, mockImagesPage2 } from "./data"; // Your mock data

describe("ImageGallery", () => {
  it("should render the ImageGallery and load images on scroll", async () => {
    // Mock the fetch API response to return mock data
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ photos: mockImagesPage1 }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ photos: mockImagesPage2 }),
      });

    const mockSetPage = jest.fn();
    const mockSetLoading = jest.fn();

    const page = 1;
    const loading = false;

    render(
      <ImageGallery
        page={page}
        setPage={mockSetPage}
        loading={loading}
        setLoading={mockSetLoading}
      />
    );

    // Check if images from the first page are rendered
    await waitFor(() => {
      mockImagesPage1.forEach((image) => {
        expect(screen.getByAltText(image.alt)).toBeInTheDocument();
      });
    });

    // Simulate scrolling to trigger loading of the second page
    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    // Wait for the second page of images to load
    await waitFor(() => {
      mockImagesPage2.forEach((image) => {
        expect(screen.getByAltText(image.alt)).toBeInTheDocument();
      });
    });
  });
});
