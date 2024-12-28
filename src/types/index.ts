export interface Category {
    id: string;
    label: string; 
    priority: 'baixa' | 'média' | 'alta';
    subcategories: Subcategory[];
};

export interface Subcategory {
    id: string;
    label: string;
}

export interface Ticket {
    id: string;
    name: string;
    category: string;
    description: string;
    priority: string;
    status: 'pnding' | 'processing' | 'resolved' | 'closed';
    createAt: Date;
    updatedAt: Date;
}

export interface FormData {
    name: string;
    category: string;
    subcategory: string;
    description: string;
}

export interface AvailabilityOverride {
    id: string;
    date: string;
    type: 'holiday' | 'dayoff' | 'lunch' | 'custom';
    startTime?: string;
    endTime?: string;
    description: string;
}

export interface AvailabilityStatus {
    isAvailable: boolean;
    message: string;
    nextAvailableTime?: string;
}

export interface DiscordWebhookMessage {
    content: string | null;
    embeds: Array<{
        title: string;
        color: number;
        fields: Array<{
            name: string;
            value: string;
            inline?: boolean;
        }>;
    }>;
}

export interface TicketFormProps {
    onSubmit?: (ticket: Omit<Ticket, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    className?: string;
}

export interface TicketConfirmationProps {
    ticketId: string;
    isAvailable: boolean;
    nextAvailableTime?: string;
}

export interface AvailabilityAdminProps {
    classname?: string;
}

export type ApiError = {
    code: string;
    message: string;
    details?: Record<string, unknown>;
};

export enum TicketPriority {
    LOW = 'baixa',
    MEDIUM = 'média',
    HIGH = 'alta'
}

export enum TicketStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    RESOLVED = 'resolved',
    CLOSED = 'closed'
}