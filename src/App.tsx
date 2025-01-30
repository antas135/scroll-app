import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { ImageGallery, Spinner } from "./components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow-y: auto;
`;

const Title = styled.h1`
  text-align: center;
  padding: 8px;
`;

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollTop + containerRef.current.clientHeight;
      const scrollHeight = containerRef.current.scrollHeight;

      if (scrollPosition >= scrollHeight - 50 && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [loading]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <Container ref={containerRef}>
      <Title>Pexels Image Gallery</Title>
      <ImageGallery page={page} setPage={setPage} loading={loading} setLoading={setLoading} />
      {loading && <Spinner />}
    </Container>
  );
};

export default App;
