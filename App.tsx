import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { GlobalContext, GlobalProvider } from 'src/hooks/GlobalContext';

import { AppRoutes } from 'src/routes/Routes';

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
