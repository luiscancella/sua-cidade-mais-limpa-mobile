import apiBackend from "src/lib/apiBackend";
import { HeadersRequired } from "src/types";
import { SupportReason } from "src/types/support/support.schema";

export interface SupportTicketRequest {
    phoneId: string;
    email: string;
    reason: SupportReason;
    description: string;
}

class SupportService {
    async createTicket(ticket: SupportTicketRequest, headers: HeadersRequired): Promise<void> {
        await apiBackend.post("/support/tickets", ticket, { headers });
    }
}

export default new SupportService();
