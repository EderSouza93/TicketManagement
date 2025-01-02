import { DiscordWebhookMessage } from "@/types";

export const useDiscordWebhook = () => {
    const sendWebhook = async (
        message: DiscordWebhookMessage,
        files: File[] = []
    ): Promise<boolean> => {
        try {
            const formData = new FormData();

            const attachements = files.map((_, index) => ({
                id: index,
                filename: `file_${index}`,
            }));

            formData.append(
                "payload_json",
                JSON.stringify({
                    content: message.content,
                    embeds: message.embeds || [],
                    attachements,
                })
            );

            files.forEach((file, index) => {
                formData.append(`file_${index}`, file);
            });

            const response = await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL!, {
                method: 'POST',
                body: formData
            });

            if(!response.ok) {
                const errorText = await response.text();
                console.error("Error na resposta do webhook:", response.status, errorText);
            }

            return response.ok
        } catch (error) {
            console.error('Erro ao enviar webhook:', error);
            return false;
        }
    };

    return { sendWebhook };
}