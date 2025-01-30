import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { PexelsImage } from "../types";
import ImageCard from "./ImageCard";

const API_KEY = "QmRSo03ZCUXxcqiBQGe6psgJ1ATO4lAkC1OpuqOqqj3CMR9L7tBcDvJP";
const BASE_URL = "https://api.pexels.com/v1";

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 50%;
  padding: 10px;
  margin: 20px 0;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 32px;
  margin: 32px;
  padding-bottom: 50px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

interface ImageGalleryProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ page, setPage, loading, setLoading }) => {
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [query, setQuery] = useState<string>("painting");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("painting");
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [favourites, setFavourites] = useState<number[]>(() => {
    const savedFavourites = localStorage.getItem("favourites");
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  useEffect(() => {
    if (isFirstLoad) return;

    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [query]);

  const fetchImages = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/search?query=${debouncedQuery}&per_page=12&page=${page}`,
        {
          headers: { Authorization: API_KEY },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch images");

      const data = await response.json();

      setImages((prevImages) => {
        return page === 1 ? data.photos : [...prevImages, ...data.photos];
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
      setIsFirstLoad(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [debouncedQuery, page]);

  const handleFavouriteClick = (id: number) => {
    setFavourites((prevFavourites) => {
      const newFavourites = prevFavourites.includes(id)
        ? prevFavourites.filter((favourite) => favourite !== id)
        : [...prevFavourites, id];
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
      return newFavourites;
    });
  };

  return (
    <GalleryContainer>
      <SearchInput
        type="text"
        placeholder="Search images..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Gallery>
        {!!images &&
          images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              handleFavouriteClick={handleFavouriteClick}
              isFavourite={favourites.includes(image.id)}
              data-testid={`image-${image.id}`}
            />
          ))}
      </Gallery>
    </GalleryContainer>
  );
};

export default ImageGallery;
