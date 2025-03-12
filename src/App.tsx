import AppRouter from '@/components/page';
import { RestfulApiProvider } from './hooks/ResfulApiContext';
import { Box } from '@chakra-ui/react';

function App() {
  // const { testContext } = React.useContext(RestfulApiContext);

  return (
    <RestfulApiProvider>
      <Box background="tomato" width="100%" padding="4" color="white">
        This is the Box
      </Box>
      <AppRouter />
    </RestfulApiProvider>
  );
}

export default App;
