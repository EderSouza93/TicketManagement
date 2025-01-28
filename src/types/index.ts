export type Priority = 'baixa' | 'média' | 'alta';
export type Status = 'pending' | 'processing' | 'resolved' | 'closed';

export interface Category {
    id: string;
    label: string;
    priority: Priority;
    subcategories: Subcategory[];
}

export interface Subcategory {
    id: string;
    label: string;
}

export interface Ticket {
    id: string;
    name: string;
    category: string;
    description: string;
    priority: Priority;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}

export interface FormData {
    name: string;
    category: string;
    subcategory: string;
    description: string;
    files: File[]
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

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
}

export interface AvailabilityAdminProps {
    classname?: string;
}

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