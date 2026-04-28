import { useEffect } from "react";
import NotificationService from "src/service/NotificationService";
import UserService from "src/service/UserService";
import { useError } from "src/hooks/useModal";
import { HeadersRequired } from "src/types";

interface Props {
  phoneId: string;
  getHeaders: () => HeadersRequired;
}

export function usePushNotification({ phoneId, getHeaders }: Props) {
  const { showError } = useError();

  useEffect(() => {
    async function register() {
      try {
        const token = await NotificationService.getDevicePushToken();
        if (token) {
          await UserService.registerPushToken(phoneId, token, getHeaders());
          return;
        }
        showError(
          "Erro de Notificação",
          "Não foi possível obter permissão para notificações. Por favor, verifique as configurações do seu dispositivo.",
        );
      } catch (error) {
        console.error("Error obtaining device token:", error);
        showError(
          "Erro de Notificação",
          "Não foi possível obter permissão para notificações. Por favor, verifique as configurações do seu dispositivo.",
        );
      }
    }

    register();
  }, []);
}
