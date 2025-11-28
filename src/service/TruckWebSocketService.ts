import { io, Socket } from "socket.io-client";
import { TruckDistance, TruckDistanceSchema } from "src/types";

type TruckDistanceCallback = (trucks: TruckDistance) => void;
type ConnectionStatusCallback = (connected: boolean) => void;

class TruckWebSocketService {
    private socket ?: Socket;
    private onPositionUpdate ?: TruckDistanceCallback;
    private onConnectionChange ?: ConnectionStatusCallback;
    private phoneId ?: string;

    connect(phone_id: string, onPositionUpdate: TruckDistanceCallback, onConnectionChange?: ConnectionStatusCallback) {
        if (this.socket?.connected) {
            console.log("Socket.IO já está conectado");
            return;
        }
        
        // Desconectar socket anterior se existir
        if (this.socket) {
            console.log("Desconectando socket anterior...");
            this.socket.disconnect();
        }

        this.phoneId = phone_id;
        this.onPositionUpdate = onPositionUpdate;
        this.onConnectionChange = onConnectionChange;

        const baseUrl = process.env.EXPO_PUBLIC_WEBSOCKET_URL;
        console.log(`[Socket.IO] Conectando ao servidor: ${baseUrl}`);
        console.log(`[Socket.IO] Phone ID: ${phone_id}`);

        this.socket = io(baseUrl, {
            query: { deviceId: phone_id },
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 3000,
            reconnectionDelayMax: 10000,
        });

        this.socket.on('connect', () => {
            console.log(`[Socket.IO] ✓ Conectado com sucesso (ID: ${this.socket?.id})`);
            this.onConnectionChange?.(true);
        });

        this.socket.on('truck:update', (data) => {
            try {
                const result = TruckDistanceSchema.parse(data);
                this.onPositionUpdate?.(result);
                console.log("[Socket.IO] Mensagem recebida:", result);
            } catch (error) {
                console.error("Erro ao processar mensagem Socket.IO:", error);
            }
        });

        this.socket.on('disconnect', (reason) => {
            console.log(`[Socket.IO] ✗ Desconectado: ${reason}`);
            console.log(`[Socket.IO] Phone ID era: ${this.phoneId}`);
            this.onConnectionChange?.(false);
        });

        this.socket.on('connect_error', (error) => {
            console.error(`[Socket.IO] ✗ Erro na conexão:`, error.message);
            console.error(`[Socket.IO] URL: ${baseUrl}, Phone ID: ${phone_id}`);
            this.onConnectionChange?.(false);
        });

        this.socket.on('error', (error) => {
            console.error("✗ Erro no Socket.IO:", error);
        });
    }

    disconnect() {
        if (this.socket) {
            console.log(`[Socket.IO] Desconectando manualmente (Phone ID: ${this.phoneId})`);
            this.socket.disconnect();
            this.socket = undefined;
        }

        this.phoneId = undefined;
        this.onPositionUpdate = undefined;
        this.onConnectionChange = undefined;
    }

    isConnected(): boolean {
        return this.socket?.connected || false;
    }
}

export default new TruckWebSocketService();
