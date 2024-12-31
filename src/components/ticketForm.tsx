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
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validateFiles } from "@/utils/fileValidation";
import { ButtonLoading } from "@/components/buttonLoading";

export const TicketForm: React.FC<TicketFormProps> = ({ className }) => {
  const { toast } = useToast();
  const { createTicket } = useTicket();
  const route = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    subcategory: "",
    description: "",
    files: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ success: boolean; message: string } | null>(null);

  const resetForm = () => {
    setFormData({ name: "", category: "", subcategory: "", description: "", files: [] });
  };

  // Manipula o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedbackMessage(null)
    

    try {
      const { ticket } = await createTicket(formData);
      setFeedbackMessage({ success: true, message: `Chamado criado com sucesso! ID: ${ticket.id}` });
      toast({ description: `Solicitação enviada com sucesso! ID: ${ticket.id}` });
      resetForm()
      route.push(`/ticket/confirmation?ticketId=${ticket.id}`);
    } catch (error) {
      console.error("Erro ao criar chamado:", error);
      setFeedbackMessage({ success: false, message: "Ocorreu um erro ao criar o chamado. Tente novamente."});
      toast({ variant: "destructive", description: "Ocorreu um erro ao criar o chamado. Tente novamente.",});
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(!files) return;

    const { isValid, errorMessage, validFiles } = validateFiles(files, 8 * 1024 * 1024);
    if (!isValid) {
      toast({ variant: "destructive", title: "Erro no upload do arquivo", description: errorMessage });
      return
    }

    setFormData({ ...formData, files: validFiles || []});
  }



  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-center font-bold text-[#454B60]">
          Novo Chamado
        </CardTitle>
        <CardDescription>
          Preencha os dados abaixo para abrir um novo chamado de suporte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {feedbackMessage && (
            <div className={`p-4 rounded-md ${
            feedbackMessage.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700" 
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

          {/* Categoria  */}
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
                <SelectTrigger>
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
            id="picture" 
            type="file"
            accept=".jpg,.jpeg,.png"
            multiple
            onChange={handleFileChange}
            />
          </div>

          <div className="flex items-center justify-center">
            <Button
              className="bg-[#222872] hover:bg-blue-500"
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
  );
};
