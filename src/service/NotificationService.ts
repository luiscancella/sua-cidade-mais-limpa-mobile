import * as Notifications from "expo-notifications";
import apiBackend from "src/lib/apiBackend";

class NotificacaoService {
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

    public async getToken(): Promise<string | null> {
        const granted = await this.hasNotificationPermission();
        if (!granted) {
            console.warn("Notification permissions not granted");
            return null;
        }

        const tokenData = await Notifications.getDevicePushTokenAsync();
        const fcm_token = tokenData.data;
        return fcm_token;
    }
}

export default new NotificacaoService