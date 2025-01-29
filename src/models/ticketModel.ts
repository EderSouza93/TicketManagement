import { Schema, model, models } from 'mongoose'

const ticketSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        priority: {
            type: String,
            enum: ['LOW', 'MEDIUM', 'HIGH'],
            default: 'MEDIUM',
        },
        status: {
            type: ['PEDING', 'PROCESSING', 'RESOLVED', 'CLOSED'],
            default: 'PEDING',
        },
    },
    { timestamps: true }
);

export default models.Ticket || model('Ticket', ticketSchema)