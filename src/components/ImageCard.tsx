import React from "react";
import styled from "styled-components";

import { PexelsImage } from "../types";

interface ImageCardProps {
  isFavourite: Boolean;
  image: PexelsImage;
  handleFavouriteClick: (id: number) => void;
}

const formatTitle = (input: string) => {
  if (!input || typeof input !== "string") {
    return "";
  }

  const shortString = input.split(" ").slice(0, 2).join(" ");
  return shortString;
};

const Picture = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const Title = styled.div`
  font-size: 20px;
  @media (min-width: 768px) {
    font-size: 24px;
  }
  font-weight: bold;
  padding: 10px;
  text-align: center;
`;

const Line = styled.div`
  border-top: 3px solid white;
  width: 30%;
  margin: 0 auto 0px auto;
`;

const Author = styled.div`
  font-style: italic;
  font-size: 18px;
  @media (min-width: 768px) {
    font-size: 22px;
  }
  margin-top: 8px;
  margin-bottom: 24px;
`;

const Spacer = styled.div`
  height: 15%;
  opacity: 0;
`;

const FavouriteButton = styled.div`
  padding: 16px 32px;
  background-color: transparent;
  color: white;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 18px;
  @media (min-width: 768px) {
    font-size: 20px;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ImageCardContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  @media (min-width: 768px) {
    height: clamp(300px, 30vw, 900px);
  }
  height: clamp(300px, 60vw, 900px);
  cursor: pointer;

  &:hover .overlay {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 8px;
  text-align: center;
`;

const ImageCard: React.FC<ImageCardProps> = ({ image, handleFavouriteClick, isFavourite }) => {
  return (
    <ImageCardContainer key={image.id}>
      <Picture
        srcSet={`${image.src.medium} 320w, ${image.src.large} 768w`}
        src={image.src.medium}
        alt={image.alt}
        loading="lazy"
      />
      <Overlay className="overlay">
        <Title>{formatTitle(image.alt)}</Title>
        <Line />
        <Author>{image.photographer}</Author>
        <FavouriteButton onClick={() => handleFavouriteClick(image.id)}>
          {isFavourite ? "Remove from Favorites" : "Add to Favorites"}
        </FavouriteButton>
        <Spacer></Spacer>
      </Overlay>
    </ImageCardContainer>
  );
};

export default ImageCard;
