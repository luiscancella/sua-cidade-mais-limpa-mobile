import { useState, useEffect, useCallback } from "react";
import TruckWebSocketService from "src/service/TruckWebSocketService";
import { TruckDistance } from "src/types";

interface UseTruckETAProps {
    phoneId?: string;
}

export function useTruckETA({ phoneId }: UseTruckETAProps) {
    const [ truckETA, setTruckETA ] = useState<TruckDistance>();
    const [ isConnected, setIsConnected ] = useState(false);
    const [ connectionFailed, setConnectionFailed ] = useState(false);

    useEffect(() => {
        if (!phoneId) {
            return;
        }

        TruckWebSocketService.connect(
            phoneId,
            setTruckETA,
            setIsConnected,
            () => setConnectionFailed(true)
        );

        return () => {
            TruckWebSocketService.disconnect();
        };
    }, [phoneId]);

    const reconnect = useCallback(() => {
        if (phoneId) {
            setConnectionFailed(false);
            TruckWebSocketService.disconnect();
            setTimeout(() => {
                TruckWebSocketService.connect(
                    phoneId,
                    setTruckETA,
                    setIsConnected,
                    () => setConnectionFailed(true)
                );
            }, 100);
        }
    }, [phoneId]);

    return {
        truckETA,
        isConnected,
        connectionFailed,
        reconnect,
    };
}
