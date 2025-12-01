import { StyleSheet, Text, View } from 'react-native';
import 'react-native-get-random-values';

import { CurrentLocationProvider, useCurrentLocation } from 'src/hooks/useCurrentLocation';
import { UserSyncProvider } from 'src/hooks/useUserSync';

import { AppRoutes } from 'src/routes/GlobalRoutes';

function AppContent() {
  const { currentLocation, setUserCreatedOnServer } = useCurrentLocation();
  
  return (
    <UserSyncProvider 
      location={currentLocation}
      onUserCreated={() => setUserCreatedOnServer(true)}
    >
      <AppRoutes />
    </UserSyncProvider>
  );
}

export default function App() {
  return (
    <CurrentLocationProvider>
      <AppContent />
    </CurrentLocationProvider>
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
