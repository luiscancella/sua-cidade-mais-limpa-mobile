import { useEffect, useRef, useState } from "react";
import { AnimatedRegion } from "react-native-maps";
import { z } from "zod";
import apiBackend from "src/lib/apiBackend";
import { TruckPositionSchema } from "src/types";

const POLL_INTERVAL = 3000;
const ANIMATION_DURATION = 2500;

// Calcula o ângulo (em graus, 0 = norte, sentido horário) entre dois pontos GPS.
function calculateBearing(
    fromLat: number, fromLng: number,
    toLat: number, toLng: number,
): number {
    const lat1 = (fromLat * Math.PI) / 180;
    const lat2 = (toLat * Math.PI) / 180;
    const dLng = ((toLng - fromLng) * Math.PI) / 180;
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x =
        Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

export function useTruckMapPositions() {
    const animatedRegions = useRef<Map<number, AnimatedRegion>>(new Map());
    const prevPositions = useRef<Map<number, { lat: number; lng: number }>>(new Map());
    const [truckIds, setTruckIds] = useState<number[]>([]);
    const [bearings, setBearings] = useState<Record<number, number>>({});
    const controllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        async function fetchPositions() {
            controllerRef.current?.abort();
            controllerRef.current = new AbortController();

            try {
                const response = await apiBackend.get<unknown[]>("/trucks/positions", {
                    signal: controllerRef.current.signal,
                });

                const trucks = z.array(TruckPositionSchema).parse(response.data);

                let hasNew = false;
                const bearingUpdates: Record<number, number> = {};

                for (const truck of trucks) {
                    const coord = { latitude: truck.lat, longitude: truck.lng };
                    const existing = animatedRegions.current.get(truck.id);
                    const prev = prevPositions.current.get(truck.id);

                    if (existing) {
                        if (prev && (prev.lat !== truck.lat || prev.lng !== truck.lng)) {
                            bearingUpdates[truck.id] = calculateBearing(
                                prev.lat, prev.lng,
                                truck.lat, truck.lng,
                            );
                        }
                        existing.timing({
                            ...coord,
                            latitudeDelta: 0,
                            longitudeDelta: 0,
                            duration: ANIMATION_DURATION,
                            useNativeDriver: false,
                        }).start();
                    } else {
                        animatedRegions.current.set(
                            truck.id,
                            new AnimatedRegion({
                                ...coord,
                                latitudeDelta: 0,
                                longitudeDelta: 0,
                            }),
                        );
                        hasNew = true;
                    }

                    prevPositions.current.set(truck.id, { lat: truck.lat, lng: truck.lng });
                }

                if (Object.keys(bearingUpdates).length > 0) {
                    setBearings((prev) => ({ ...prev, ...bearingUpdates }));
                }

                if (hasNew) {
                    setTruckIds(Array.from(animatedRegions.current.keys()));
                }
            } catch (error: any) {
                if (error?.name !== "AbortError" && error?.code !== "ERR_CANCELED") {
                    console.error("Erro ao buscar posições dos caminhões:", error);
                }
            }
        }

        fetchPositions();
        const interval = setInterval(fetchPositions, POLL_INTERVAL);

        return () => {
            clearInterval(interval);
            controllerRef.current?.abort();
        };
    }, []);

    return {
        truckIds,
        animatedRegions: animatedRegions.current,
        bearings,
    };
}
