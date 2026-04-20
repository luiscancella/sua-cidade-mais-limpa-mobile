import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

class NotificacaoService {
    private configuredForegroundHandler = false;

    configureForegroundNotifications() {
        if (this.configuredForegroundHandler) {
            return;
        }

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowBanner: true,
                shouldShowList: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
        });

        this.configuredForegroundHandler = true;
    }

    async configureAndroidChannel() {
        if (Platform.OS !== "android") {
            return;
        }

        await Notifications.setNotificationChannelAsync("default", {
            name: "Padrão",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#1CB788",
        });
    }

    async requestNotificationPermission() {
        const { status } = await Notifications.requestPermissionsAsync();
        return status === 'granted';
    }

    async hasNotificationPermission() {
        const { status } = await Notifications.getPermissionsAsync();
        if (status === 'granted') {
            return true;
        }

        return await this.requestNotificationPermission();
    }

    public async getDevicePushToken(): Promise<string | null> {
        const granted = await this.hasNotificationPermission();
        if (!granted) {
            console.warn("Permissão não concedida");
            return null;
        }

        // Isso garante que você receberá um token FCM tanto no Android quanto no iOS
        const fcm_token = await messaging().getToken();
        return fcm_token;
    }
}

export default new NotificacaoService