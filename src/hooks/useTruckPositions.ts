import { useState, useEffect, useCallback } from "react";
import TruckWebSocketService from "src/service/TruckWebSocketService";
import { TruckDistance } from "src/types";

interface UseTruckDistancesProps {
    phone_id?: string;
    enabled?: boolean;
    isUserSavedOnServer?: boolean;
}

export function useTruckDistances({ phone_id, enabled = true, isUserSavedOnServer = false }: UseTruckDistancesProps) {
    const [TruckDistance, setTruckDistance] = useState<TruckDistance>();
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (!phone_id || !enabled || !isUserSavedOnServer) {
            if (!isUserSavedOnServer) {
                console.log("Aguardando sincronização com servidor...");
            }
            return;
        }

        try {
            TruckWebSocketService.connect(
                phone_id,
                (position : TruckDistance) => {
                    setTruckDistance(position);
                },
                (connected : boolean) => {
                    setIsConnected(connected);
                    if (!connected) {
                        setError("Conexão perdida");
                    }
                }
            );
        } catch (err) {
            setError("Erro ao conectar ao WebSocket");
            console.error(err);
        }

        return () => {
            TruckWebSocketService.disconnect();
        };
    }, [phone_id, enabled, isUserSavedOnServer]);

    const reconnect = useCallback(() => {
        if (phone_id && isUserSavedOnServer) {
            TruckWebSocketService.disconnect();
            setTimeout(() => {
                TruckWebSocketService.connect(
                    phone_id,
                    setTruckDistance,
                    setIsConnected
                );
            }, 100);
        }
    }, [phone_id, isUserSavedOnServer]);

    return {
        TruckDistance,
        isConnected,
        error,
        reconnect,
    };
}
