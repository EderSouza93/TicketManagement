import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WarningModal: React.FC<WarningModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40">
      <div className="relative">
        <Card className="w-80 p-2 bg-red-50">
          <CardTitle className="flex items-center justify-center text-red-500">
            Aviso
          </CardTitle>
          <CardDescription className="text-xs space-y-2 my-5">
              <p>
                Esta aplicação está em sua versão beta e atualmente oferece
                apenas funcionalidades básicas. Nova atualização disponível.
              </p>
              <ul className="list-disc pl-4 space-y-2">
                <li>Melhoria no design e navegação</li>
                <li>Adição da funconalidade de envio de fotos</li>
                <li>Para os corretores agora é possivel enviar os prints das avaliações e reels para liga</li>
              </ul>
          </CardDescription>
          <div className="flex justify-center m-4">
            <Button
              onClick={onClose}
              className="bg-[#222872] hover:bg-blue-500"
            >
              Entendi
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
