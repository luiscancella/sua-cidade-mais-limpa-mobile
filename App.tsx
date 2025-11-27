import { StyleSheet, Text, View } from 'react-native';
import 'react-native-get-random-values';

import { GlobalContext, GlobalProvider } from 'src/hooks/GlobalContext';

import { AppRoutes } from 'src/routes/GlobalRoutes';

export default function App() {
  return (
    <GlobalProvider>
      <AppRoutes />
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
