import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Image, Text, Button, Spinner } from '@chakra-ui/react';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?end_date=2023-12-31&page=${page}&start_date=2023-12-01`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWNiNzIzY2UwZDIzODMwYzRjNDUyOGQ0MDQ5ZDYyMyIsInN1YiI6IjY1ZjU2NTBiMDZmOTg0MDEzMGM2OGRmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wc5V-HQCVqyQPZG3VAxkHqsTT9ysLc8i-LQnVew4AUw',
            },
          }
        );
        const data = await response.json();

        if (response.status === 200) {
          setMovies(data.results);
          setLoading(false);
          setError(null);
        } else {
          setError('Error fetching movies');
          setLoading(false);
        }

      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Error fetching movies');
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleBackToFirstPage = () => {
    setPage(1);
    setError(null);
  };

  return (
    <Box
      h="100vh"
      w="100%"
      backgroundColor="black"
      sx={{
        overflowX: 'hidden',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '0 !important',
          display: 'none !important',
        },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: "flex-start",
        paddingTop: "10px",
      }}
    >
      <Container maxW="container.lg" mt={20}>
        {loading ? (
          <Box
            h="100vh"
            w="100%"
            backgroundColor="black"
            display="flex"
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            alignContent='center'
          >
            <Spinner size="xl" thickness='4px' speed='0.65s' color="red" />
          </Box>
        ) : error ? (
          <Box>
            <Text color="red">{error}</Text>
            <Button mt={4} onClick={handleBackToFirstPage} backgroundColor="red" color="white" _hover={{ backgroundColor: "green" }}>
              Try again
            </Button>
          </Box>
        ) : (
          <Box position='relative'>
            <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={7} >
              {movies.map((movie) => (
                <Box
                  key={movie.id}
                  border="2px solid red"
                  borderRadius="1rem"
                  transition="border-color 0.3s"
                  _hover={{ borderColor: "green", transform: "scale(1.05)" }}
                  p={4}
                  textAlign="center"
                >
                  <Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                  <Text mt={2} fontSize="md" fontWeight="semibold" color="white">
                    {movie.title}
                  </Text>
                </Box>
              ))}
            </Grid>
            <Box p={4} display="flex" justifyContent="space-between">
              {page === 1 ? <Button disabled backgroundColor="red"
                color="white"
                _hover={{ backgroundColor: "green" }} > Previous </Button> :
                <Button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  backgroundColor="red"
                  color="white"
                  _hover={{ backgroundColor: "green" }}
                >
                  Previous
                </Button>}
              <Button
                onClick={handleNextPage}
                backgroundColor="red"
                color="white"
                _hover={{ backgroundColor: "green" }}
              >
                Next
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MovieList;
