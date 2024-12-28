

export const generateTicketId = (category: string): string => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const prefix = category.substring(0, 3).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
};

export const getTicketPriorityColor = (priority: string): string => {
    switch (priority.toLowerCase()) {
        case 'alta':
            return 'bg-red-100 text-red-800';
        case 'média':
            return 'bg-yellow-100 text-yellow-800';
        case 'baixa':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const formatTicketDate = (date: Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short'
    }).format(date);
};

export const validateTicketData = (data: FormData): string[] => {
    const errors: string[] = [];

    if(!data.name.trim()) {
        errors.push('Nome é obrigatório');
    };

    if(!data.category) {
        errors.push('Categoria é obrigatório');
    };

    if(!data.subcategory && data.category) {
        errors.push('Subcategoria é obrigatório');
    };

    if(!data.description.trim()) {
        errors.push('Descrição é obrigatória');
    } else if (data.description.length < 10) {
        errors.push('Descrição deve ter pelo menos 10 caracteres');
    }
        
    
} 