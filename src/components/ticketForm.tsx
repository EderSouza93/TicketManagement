"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormData, TicketFormProps } from "@/types";
import { useCategories } from "@/hooks/useCategories";
import { useCreateRequester } from "@/hooks/useRequesters";
import { useCreateTicket } from "@/hooks/useTickets";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validateFiles } from "@/utils/fileValidation";
import { ButtonLoading } from "@/components/buttonLoading";

export const TicketForm: React.FC<TicketFormProps> = ({ className }) => {
  const { toast } = useToast();
  const router = useRouter();

  // Hooks de dados
  const { data: categories = [], isLoading: catLoading } = useCategories();
  const createRequester = useCreateRequester();
  const createTicket = useCreateTicket();

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
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
    setIsSubmitting(true);

    // Validação específic a para certa categoria
    if (
      formData.category === "brokersLeague" &&
      formData.files.length === 0
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
      const { id: requester_id } = await createRequester.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      const { ticket } = await createTicket.mutateAsync({
        description: formData.description,
        requester_id,
        subcategory_id: Number(formData.subcategory),
      });

      setFeedbackMessage({
        success: true,
        message: `Chamado criado com sucesso! ID: ${ticket.id}`,
      });
      toast({
        description: `Solicitação enviada com sucesso! ID: ${ticket.id}`,
      });

      setTimeout(() => {
        router.push(`/ticket/confirmation?ticketId=${ticket.id}`);
      }, 2000);

    } catch (err) {
      console.error(err);
      setFeedbackMessage({
        success: false,
        message: "Ocorreu um erro ao criar o chamado. Tente novamente.",
      });
      toast({
        variant: "destructive",
        description: "Ocorreu um erro ao criar o chamado. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const validation = validateFiles(files, 8 * 1024 * 1024, 10, formData.files.length);
    if (!validation.isValid) {
      toast({
        variant: "destructive",
        title: "Ops! Não é possível enviar esses anexos",
        description: validation.errorMessage,
      });
      return;
    }
    setFormData(fd => ({
      ...fd,
      files: [...fd.files, ...validation.validFiles!],
    }));
  };

  if (catLoading) return <div>Carregando categorias...</div>;

  return (
    <>
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <ButtonLoading size="lg" />
        </div>
      )}
      <Card
        className={`w-full max-w-2xl mx-auto ${className} ${isSubmitting ? "pointer-events-none opacity-50" : ""
          }`}
      >
        <CardHeader>
          <CardTitle className="text-center font-bold text-[#454B60]">
            Novo Chamado
          </CardTitle>
          <CardDescription className="text-center">
            Preencha os dados abaixo para abrir um novo chamado de suporte
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {feedbackMessage && (
              <div
                className={`p-4 rounded-md ${feedbackMessage.success
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                  }`}
              >
                {feedbackMessage.message}
              </div>
            )}

            {/* Nome, Email, Telefone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                required
                placeholder="Nome do solicitante"
                value={formData.name}
                onChange={e => setFormData(fd => ({ ...fd, name: e.target.value }))}
              />
              <Input
                required
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={e => setFormData(fd => ({ ...fd, email: e.target.value }))}
              />
              <Input
                placeholder="Telefone"
                value={formData.phone}
                onChange={e => setFormData(fd => ({ ...fd, phone: e.target.value }))}
              />
            </div>

            {/* Categoria e Subcategoria */}
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select
                required
                value={formData.category}
                onValueChange={value =>
                  setFormData(fd => ({ ...fd, category: value, subcategory: "" }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formData.category && (
              <div className="space-y-2">
                <Label>Subcategoria</Label>
                <Select
                  value={formData.subcategory}
                  onValueChange={value => setFormData(fd => ({ ...fd, subcategory: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a subcategoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .find(c => String(c.id) === formData.category)!
                      .subcategories.map(sub => (
                        <SelectItem key={sub.id} value={String(sub.id)}>
                          {sub.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Descrição e Upload */}
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                required
                placeholder="Descreva detalhadamente o problema ou solicitação"
                value={formData.description}
                onChange={e =>
                  setFormData(fd => ({ ...fd, description: e.target.value }))
                }
                className="min-h-[8rem]"
              />
              <Label htmlFor="files">Anexos (opcional)</Label>
              <Input
                id="files"
                type="file"
                accept=".jpg,.jpeg,.png"
                multiple
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              <p className="text-xs text-gray-500">
                Até 10 arquivos, max. 8 MB cada.
              </p>
            </div>

            {/* Botão */}
            <div className="flex justify-center">
              <Button type="submit" disabled={isSubmitting}>
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
