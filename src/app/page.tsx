"use client";
import React, { useState, useEffect} from "react";
import { TicketForm } from "@/components/ticketForm";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import BackgroundLayout from "@/components/backgroundCurved";
import { WarningModal } from "@/components/modal";

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
    }, 2000);
  }, []);

  const LoadingScreen = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-20 w-20 animate-spin text-white"/>
      </div>
    </div>
  );
  return (
    <BackgroundLayout>
      {isLoading && <LoadingScreen />}
      <WarningModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <main className={`flex flex-col items-center justify-center mx-auto py-8 px-4 ${showModal ? 'blur-sm' : ''}`} >
        <Image
          alt='Logo'
          src={'/icons/Logo.png'}
          width={100}
          height={100}
        />
        <h1 className="text-3xl font-bold mb-8 text-center text-[#454B60] ">Cohab Inovações</h1>
        <div className="flex flex-col items-center justify-center mb-9"> 
          <div className="mt-6">
          <TicketForm />
          </div>
        </div>
      </main>
    </BackgroundLayout>
  );
}
