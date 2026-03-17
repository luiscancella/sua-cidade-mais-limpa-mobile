import apiBackend from "src/lib/apiBackend";
import { TruckPosition } from "src/types";

class TruckService {
    async getTruckPositions(_signal: AbortSignal) : Promise<TruckPosition[]> {
        const response = await apiBackend.get<TruckPosition[]>("/trucks/positions", {
            signal: _signal
        });
        return response.data;
    }
}

export default new TruckService();