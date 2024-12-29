import { DiscordWebhookMessage } from "@/types";

export const useDiscordWebhook = () => {
    const sendWebhook = async (message: DiscordWebhookMessage): Promise<boolean> => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL!, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });

            return response.ok;
        } catch (error) {
            console.error('Erro ao enviar webhook:', error);
            return false;
        }
    };

    return { sendWebhook };
}