import { Category } from "@/types";

export const CATEGORIES: Category[] = [
    {
        id: 'Doubts',
        label: 'Dúvidas sobre sistemas',
        priority: 'média',
        subcategories: [
            { id: 'bitrix', label: 'Bitrix24' },
            { id: 'KSI', label: 'KSI - Kurole' },
            { id: 'cleo', label: 'Cléo - Atendimento com IA' },
            { id: 'takeblip', label: 'TakeBlip' },
        ]
    },
    {
        id: 'technical-bitrix',
        label: 'Problemas técnicos com Bitrix',
        priority: 'alta',
        subcategories: [
            { id: 'leadLose', label: 'Lead Perdido' },
            { id: 'receivingLeads', label: 'Recebimento de leads' },
            { id: 'leadRoulette', label: 'Roleta de Leads' },
            { id: 'reportBug', label: 'Bug do Sistema'},
            { id: 'others', label: 'Outros' },
        ]
    },
    {
        id: 'technical-KSI',
        label: 'Problemas técnicos com Ksi',
        priority: 'alta',
        subcategories: [
            { id: 'leadLose', label: 'Lead Perdido' },
            { id: 'receivingLeads', label: 'Recebimento de leads' },
            { id: 'leadRoulette', label: 'Roleta de Leads' },
            { id: 'reportBug', label: 'Bug do Sistema'},
            { id: 'others', label: 'Outros' },
        ]
    },
    {
        id: 'technical-Cleo',
        label: 'Problemas técnicos com a Cléo',
        priority: 'alta',
        subcategories: [
            { id: 'badInformation', label: 'Informação Imprecisa' },
            { id: 'leadTargeting', label: 'Leads redirecionados erroneamente' },
            { id: 'others', label: 'Outros' },
        ]
    },
    {
        id: 'Requests',
        label: 'Solicitações',
        priority: 'média',
        subcategories: [
            { id: 'createUser', label: 'Criação de Usuário KSI' },
            { id: 'removeUser', label: 'Remoção do Usuário KSI' },
            { id: 'createUserBitrix', label: 'Criação de Usuário no Bitrix' },
            { id: 'removeUserBitrix', label: 'Remoção do Usuário no Bitrix' },
            { id: 'createUserTakeBlip', label: 'Criação de Usuário no TakeBlip' },
            { id: 'removeUserTakeBlip', label: 'Remoção do Usuário no TakeBlip' },
            { id: 'createUserBoth', label: 'Criação de Usuário no Bitrix e KSI' },
            { id: 'removeUserBoth', label: 'Remoção do Usuário no Bitrix e KSI' },
            { id: 'permissions', label: 'Liberação de acesso no KSI' },
            { id: 'permissionsBritix', label: 'Liberação de acesso no Bitrix' },
            { id: 'permissionsTakeBlip', label: 'Liberação de acesso no TakeBlip' },
            { id: 'permissionsBoth', label: 'Liberação de acesso no Bitrix e KSI' },
            { id: 'createField', label: 'Criação de Campo no Bitrix'},
            { id: 'others', label: 'Outros' },
        ]
    },
    {
        id: 'improvements',
        label: 'Sugestão de melhorias',
        priority:'baixa',
        subcategories: [
            { id: 'new-feature', label: 'Nova Funcionalidade' },
            { id: 'enhancement', label: 'Melhoria em Funcionalidade Existente' },
            { id: 'process', label: 'Melhoria em Processo' },
            { id: 'interface', label: 'Interface/Usabilidade' }
        ]
    }
];

export const BUSSINESS_HOURS = {
    start: 8,
    end: 15,
    lunchStart: 12,
    lunchEnd: 14
};

export const DISCORD_WEBHOOK_COLORS = {
    available: 0x00ff00,  
    unavailable: 0xff9900, 
    error: 0xff0000, 
    high: 0xff0000, 
    medium: 0xffff00, 
    low: 0x00ff00, 
} as const;