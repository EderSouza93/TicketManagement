'use client'
import React from 'react';
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';

const Confirmation: React.FC = () => {
    const router = useRouter();

    const handleBackToHome = () => {
        router.push('/');
    };

    return (
        <div className="confirmation-container">
            <h1>Chamado Aberto com Sucesso!</h1>
            <p>Seu chamado foi registrado e nossa equipe entrará em contato em breve.</p>
            <Button color="primary" onClick={handleBackToHome}>
                Voltar para a Página Inicial
            </Button>
        </div>
    );
};

export default Confirmation;