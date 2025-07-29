import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppRoutes } from 'src/routes/Routes';
import { AddressAndTerms } from 'src/screens/AddressAndTermsScreen';

export default function App() {
  return (
    <AppRoutes />
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
