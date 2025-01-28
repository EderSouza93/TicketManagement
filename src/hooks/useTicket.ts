import { DiscordWebhookMessage, TicketPriority, Ticket,  } from "@/types";
import { CATEGORIES } from "@/constants";
import { useDiscordWebhook } from "./useDiscordWebhookMessage";

export const useTicket = () => {
    const { sendWebhook } = useDiscordWebhook();

    const getPriorityColor = (priority: TicketPriority) => {
        switch (priority) {
            case TicketPriority.HIGH:
                return 0xff0000;
            case TicketPriority.MEDIUM:
                return 0xffa500;
            case TicketPriority.LOW:
                return 0x00ff00;
            default:
                return 0x808080;
        }
    };


    const generateCustomId = (): string => {
        const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
        return `${datePart}${randomPart}`
    }

    const createTicket = async (formData:{
        name: string;
        category: string;
        subcategory?: string;
        description: string;
        files?: File[]
    }): Promise<{ success: boolean; ticket: Ticket}> => {
        

        const selectedCategory = CATEGORIES.find((cat) => cat.id === formData.category);

        if (!selectedCategory) {
            throw new Error("Categoria inválida");
        }

        const priorityColor = getPriorityColor(selectedCategory.priority as TicketPriority);

        const ticket: Ticket = {
            id: generateCustomId(),
            name: formData.name,
            category: formData.category,
            description: formData.description,
            priority: selectedCategory.priority,
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const webhookMessage: DiscordWebhookMessage = {
            content: `Novo Chamado Criado de ${formData.name}`,
            embeds: [
                {
                    title: "Detalhes do Chamado",
                    color: priorityColor,
                    fields: [
                        { name: "ID do Ticket", value: ticket.id, inline: true },
                        { name: "Nome", value: ticket.name, inline: true },
                        { name: "Categoria", value: selectedCategory.label, inline: true },
                        {
                            name: "Subcategoria",
                            value:
                                selectedCategory.subcategories.find((sub) => sub.id === formData.subcategory)
                                ?.label || "Não especificada",
                            inline: true,
                        },
                        { name: "Descrição", value: ticket.description, inline: false },
                        { name: "Prioridade", value: ticket.priority, inline: true},
                    ],
                },
            ],
        };

        const success = await sendWebhook(webhookMessage, formData.files || []);

        return { success, ticket };
    };

    return { createTicket };
}