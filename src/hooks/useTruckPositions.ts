import { useState, useEffect, useCallback } from "react";
import TruckWebSocketService from "src/service/TruckWebSocketService";
import { TruckDistance } from "src/types";

interface UseTruckDistancesProps {
    phone_id?: string;
    enabled?: boolean;
}

export function useTruckDistances({ phone_id, enabled = true }: UseTruckDistancesProps) {
    const [ TruckDistance, setTruckDistance ] = useState<TruckDistance>();
    const [ isConnected, setIsConnected ] = useState(false);
    const [ connectionFailed, setConnectionFailed ] = useState(false);

    useEffect(() => {
        if (!phone_id || !enabled) {
            return;
        }

        TruckWebSocketService.connect(
            phone_id,
            setTruckDistance,
            setIsConnected,
            () => setConnectionFailed(true)
        );

        return () => {
            TruckWebSocketService.disconnect();
        };
    }, [phone_id, enabled]);

    const reconnect = useCallback(() => {
        if (phone_id) {
            setConnectionFailed(false);
            TruckWebSocketService.disconnect();
            setTimeout(() => {
                TruckWebSocketService.connect(
                    phone_id,
                    setTruckDistance,
                    setIsConnected,
                    () => setConnectionFailed(true)
                );
            }, 100);
        }
    }, [phone_id]);

    return {
        TruckDistance,
        isConnected,
        connectionFailed,
        reconnect,
    };
}
