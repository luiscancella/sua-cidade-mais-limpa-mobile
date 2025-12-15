import { useState, useEffect, useCallback } from "react";
import TruckWebSocketService from "src/service/TruckWebSocketService";
import { TruckDistance } from "src/types";

interface UseTruckDistancesProps {
    phone_id?: string;
    enabled?: boolean;
}

export function useTruckDistances({ phone_id, enabled = true }: UseTruckDistancesProps) {
    const [ TruckDistance, setTruckDistance ] = useState<TruckDistance>();
    const [ connectionCount, setConnectionCount ] = useState(0);
    const [ isConnected, setIsConnected ] = useState(false);
    const [ error, setError ] = useState<string>();

    useEffect(() => {
        if (!phone_id || !enabled) {
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
                    setConnectionCount(connectionCount + 1);
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
    }, [phone_id, enabled]);

    const reconnect = useCallback(() => {
        if (phone_id) {
            TruckWebSocketService.disconnect();
            setTimeout(() => {
                TruckWebSocketService.connect(
                    phone_id,
                    setTruckDistance,
                    setIsConnected
                );
            }, 100);
        }
    }, [phone_id]);

    return {
        TruckDistance,
        isConnected,
        error,
        reconnect,
        connectionCount,
        setConnectionCount,
    };
}
