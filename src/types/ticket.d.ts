    export type TicketPriority = 'baixa' | 'média' | 'alta';
    export type TicketStatus = 'pending' | 'processing' | 'resolved' | 'closed';

    export interface Category {
        id: string;
        label: string;
        priority: TicketPriority;
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
        priority: TicketPriority;
        status: TicketStatus;
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

    // export interface AvailabilityOverride {
    //     id: string;
    //     date: string;
    //     type: 'holiday' | 'dayoff' | 'lunch' | 'custom';
    //     startTime?: string;
    //     endTime?: string;
    //     description: string;
    // }
    
    // export interface AvailabilityStatus {
    //     isAvailable: boolean;
    //     message: string;
    //     nextAvailableTime?: string;
    // }
    
    // export interface AvailabilityContextType {
    //     status: AvailabilityStatus;
    //     overrides: AvailabilityOverride[];
    //     addOverride: (override: AvailabilityOverride) => void;
    //     removeOverride: (date: string) => void;
    // }

    export interface DiscordWebhookMessage {
        content: string | null;
        embeds: Array<{
            title: string;
            color: string;
            fields: Array<{
                name: string;
                value: string;
                inline?: boolean;
            }>;
        }>;
    }
