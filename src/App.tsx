import AppRouter from '@/components/page';
import { RestfulApiProvider } from './hooks/ResfulApiContext';

function App() {
  // const { testContext } = React.useContext(RestfulApiContext);

  return (
    <RestfulApiProvider>
      <AppRouter />
    </RestfulApiProvider>
  );
}

export default App;
