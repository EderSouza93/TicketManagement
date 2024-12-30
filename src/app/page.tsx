"use client";
import React from "react";
import { TicketForm } from "@/components/ticketForm";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#454B60] uppercase">Cohab Inovação</h1>
        <div className="flex flex-col items-center justify-center mb-9">
          <Card className="w-80 p-2 bg-red-50">
            <CardTitle className="flex items-center justify-center text-red-500">Aviso</CardTitle>
            <CardDescription className=" text-xs text-left my-1">
            Esta aplicação está em sua versão alfa e atualmente oferece apenas funcionalidades básicas. 
            Estamos trabalhando no desenvolvimento de novas funcionalidades para aprimorar a experiência. 
            Agradecemos sua paciência e feedback!
            </CardDescription>
          </Card>
          <div className="mt-6">
          <TicketForm />
          </div>
        </div>
      </main>
    </>
  );
}
