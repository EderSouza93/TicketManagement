"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormData, TicketFormProps } from "@/types";
import { useTicket } from "@/hooks/useTicket";
import { CATEGORIES } from "@/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validateFiles } from "@/utils/fileValidation";
import { ButtonLoading } from "@/components/buttonLoading";

export const TicketForm: React.FC<TicketFormProps> = ({ className }) => {
  const { toast } = useToast();
  const { createTicket } = useTicket();
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    subcategory: "",
    description: "",
    files: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.category === "brokersLeague" &&
      (!formData.files || formData.files.length === 0)
    ) {
      toast({
        variant: "destructive",
        title: "Erro no envio",
        description: "É obrigatório anexar arquivos para esta categoria.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { ticket } = await createTicket(formData);
      
        setFeedbackMessage({
          success: true,
          message: `Chamado criado com sucesso! ID: ${ticket.id}`,
        });

        toast({
          description: `Solicitação enviada com sucesso! ID: ${ticket.id}`,
        });
        
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 3000));
        route.push(`/ticket/confirmation?ticketId=${ticket.id}`);
      
    } catch (error) {
      console.error("Erro ao criar chamado:", error);
      setFeedbackMessage({
        success: false,
        message: "Ocorreu um erro ao criar o chamado. Tente novamente.",
      });
      toast({
        variant: "destructive",
        description: "Ocorreu um erro ao criar o chamado. Tente novamente.",
      });
    } 
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const maxFiles = 10;
    const maxTotalSize = 8 * 1024 * 1024; // 8 MB
    const currentFilesCount = formData.files.length;

    const validation = validateFiles(
      files,
      maxTotalSize,
      maxFiles,
      currentFilesCount
    );

    if (!validation.isValid) {
      toast({
        variant: "destructive",
        title: "Ops! Não é possível enviar esses anexos",
        description: validation.errorMessage,
      });
      return; // Impede a execução do restante da função
    }

    setFormData({
      ...formData,
      files: [...formData.files, ...validation.validFiles!],
    });
  };

  return (
    <>
    {isLoading && (
      <div className="fixed inset-0 bg-black/50 blackdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-20 w-20 text-white animate-spin" />
        </div>
      </div>
    )
    }
    <Card className={`w-full max-w-2xl mx-auto ${className} ${isLoading ? "pointer-events-none opacity-0" : ""}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-center mt-4 font-bold text-[#454B60]">
          Novo Chamado
        </CardTitle>
        <CardDescription>
          Preencha os dados abaixo para abrir um novo chamado de suporte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {feedbackMessage && (
            <div
              className={`p-4 rounded-md ${
                feedbackMessage.success
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {feedbackMessage.message}
            </div>
          )}
          {/* Nome */}
          <div className="space-y-2">
            <Input
              required
              className="bg-[#F2F6FA] border-none"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nome do solicitante"
            />
          </div>
          {/* Categoria */}
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select
              required
              onValueChange={(value) =>
                setFormData({ ...formData, category: value, subcategory: "" })
              }
              value={formData.category}
            >
              <SelectTrigger className="bg-[#F2F6FA] border-none">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent className="text-[#454B60]">
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Subcategoria */}
          {formData.category && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Subcategoria</label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, subcategory: value })
                }
                value={formData.subcategory}
              >
                <SelectTrigger className="bg-[#F2F6FA] border-none">
                  <SelectValue placeholder="Selecione a subcategoria" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.find(
                    (cat) => cat.id === formData.category
                  )?.subcategories.map((sub) => (
                    <SelectItem key={sub.id} value={sub.id}>
                      {sub.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {/* Descrição */}
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Descreva detalhadamente o problema ou solicitação"
              className="min-h-32"
            />
            {/* Upload de Arquivos */}
            <Label htmlFor="picture">Enviar Foto</Label>
            <Input
              className="bg-[#F2F6FA] border-none cursor-pointer"
              id="picture"
              type="file"
              accept=".jpg,.jpeg,.png"
              multiple
              onChange={handleFileChange}
            />
            <p className="text-center text-xs text-red-500">
              Envie até 10 arquivos, com no máximo 8MB cada</p>
          </div>
              {/* Button */}
          <div className="flex items-center justify-center">
            <Button
              className="bg-[#222872] hover:bg-blue-500 hover:scale-110"
              type="submit"
              disabled={isSubmitting}
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? <ButtonLoading /> : "Enviar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </>
    );
};
