"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

// Suspense Boundary for useSearchParams
const ConfirmationPageContent = () => {
  const [ticketId, setTicketId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const id = searchParams.get("ticketId");
    if (id) {
      setTicketId(id);
    } else {
      // Redireciona ou exibe 404 caso o ticketId não esteja presente
      router.push("/404");
    }
  }, [searchParams, router]);

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <main className="flex flex-col items-center justify-center mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#454B60] uppercase">
        Cohab Inovação
      </h1>
      <div className="flex items-center justify-center mb-9">
        <Card className="w-96 h-52 p-2">
          <CardTitle className="flex items-center justify-center my-5">
            Solicitação enviada com Sucesso!
          </CardTitle>
          <CardDescription className="text-center my-5">
            Chamado aberto com sucesso! Seu chamado foi registrado com o número
            #{ticketId}. Entraremos em contato em breve.
          </CardDescription>
          <div className="flex items-end justify-center">
            <Button
              className="bg-[#222872] hover:bg-blue-500"
              onClick={handleBackToHome}
            >
              Voltar para a Página Inicial
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationPageContent />
    </Suspense>
  );
}
