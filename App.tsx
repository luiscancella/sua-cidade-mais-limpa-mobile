import 'react-native-get-random-values';
import { AppProvider } from 'src/contexts/AppProvider';
import { AppRoutes } from 'src/routes/GlobalRoutes';
import NotificationService from 'src/service/NotificationService';

NotificationService.configureForegroundNotifications();
NotificationService.configureAndroidChannel();

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
