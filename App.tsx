import 'react-native-get-random-values';
import { AppProvider } from 'src/contexts/AppProvider';
import { AppRoutes } from 'src/routes/GlobalRoutes';

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
