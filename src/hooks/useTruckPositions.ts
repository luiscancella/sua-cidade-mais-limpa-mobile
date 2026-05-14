import { useState, useEffect, useCallback } from "react";
import TruckWebSocketService from "src/service/TruckWebSocketService";
import { TruckDistance } from "src/types";

interface UseTruckDistancesProps {
    phoneId?: string;
    enabled?: boolean;
}

export function useTruckDistances({ phoneId, enabled = true }: UseTruckDistancesProps) {
    const [ TruckDistance, setTruckDistance ] = useState<TruckDistance>();
    const [ isConnected, setIsConnected ] = useState(false);
    const [ connectionFailed, setConnectionFailed ] = useState(false);

    useEffect(() => {
        if (!phoneId || !enabled) {
            return;
        }

        TruckWebSocketService.connect(
            phoneId,
            setTruckDistance,
            setIsConnected,
            () => setConnectionFailed(true)
        );

        return () => {
            TruckWebSocketService.disconnect();
        };
    }, [phoneId, enabled]);

    const reconnect = useCallback(() => {
        if (phoneId) {
            setConnectionFailed(false);
            TruckWebSocketService.disconnect();
            setTimeout(() => {
                TruckWebSocketService.connect(
                    phoneId,
                    setTruckDistance,
                    setIsConnected,
                    () => setConnectionFailed(true)
                );
            }, 100);
        }
    }, [phoneId]);

    return {
        TruckDistance,
        isConnected,
        connectionFailed,
        reconnect,
    };
}
