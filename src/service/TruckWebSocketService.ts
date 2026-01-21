import { io, Socket } from "socket.io-client";
import { TruckDistance, TruckDistanceSchema } from "src/types";

type TruckDistanceCallback = (trucks: TruckDistance) => void;
type ConnectionStatusCallback = (connected: boolean) => void;
type ConnectionFailedCallback = () => void;

class TruckWebSocketService {
    private socket ?: Socket;
    private onPositionUpdate ?: TruckDistanceCallback;
    private onConnectionChange ?: ConnectionStatusCallback;
    private onConnectionFailed ?: ConnectionFailedCallback;
    private phoneId ?: string;

    connect(
        phone_id: string, 
        onPositionUpdate: TruckDistanceCallback, 
        onConnectionChange?: ConnectionStatusCallback,
        onConnectionFailed?: ConnectionFailedCallback
    ) {
        if (this.socket?.connected) {
            return;
        }
        
        if (this.socket) {
            this.socket.disconnect();
        }

        this.phoneId = phone_id;
        this.onPositionUpdate = onPositionUpdate;
        this.onConnectionChange = onConnectionChange;
        this.onConnectionFailed = onConnectionFailed;

        const baseUrl = process.env.EXPO_PUBLIC_WEBSOCKET_URL;

        this.socket = io(baseUrl, {
            query: { deviceId: phone_id },
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 3000,
            reconnectionDelayMax: 7000,
        });

        this.socket.on('connect', () => {
            this.onConnectionChange?.(true);
        });

        this.socket.on('truck:update', (data) => {
            try {
                const result = TruckDistanceSchema.parse(data);
                this.onPositionUpdate?.(result);
            } catch (error) {
                console.error("Erro ao processar dados do caminhão:", error);
            }
        });

        this.socket.on('disconnect', (reason) => {
            console.log(`WebSocket desconectado: ${reason}`);
            this.onConnectionChange?.(false);
        });

        this.socket.on('connect_error', (error) => {
            console.error(`Erro ao conectar WebSocket: ${error.message}`);
        });

        this.socket.io.on('reconnect_failed', () => {
            console.error('Todas as tentativas de reconexão falharam');
            this.onConnectionFailed?.();
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = undefined;
        }

        this.phoneId = undefined;
        this.onPositionUpdate = undefined;
        this.onConnectionChange = undefined;
        this.onConnectionFailed = undefined;
    }

    isConnected(): boolean {
        return this.socket?.connected || false;
    }
}

export default new TruckWebSocketService();
