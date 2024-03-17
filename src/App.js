import { ChakraProvider } from '@chakra-ui/react';
import MovieList from './component/MovieList';

function App() {
  return (
    <ChakraProvider>
      <MovieList />
    </ChakraProvider>
  );
}

export default App;
