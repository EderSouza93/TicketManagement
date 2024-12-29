'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormData, TicketFormProps } from "@/types";
import { useTicket } from "@/hooks/useTicket";
import { CATEGORIES } from "@/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";


export const TicketForm: React.FC<TicketFormProps> = ({ className }) => {
  const { createTicket } = useTicket()
  const route = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    subcategory: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Manipula o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const { ticket } = await createTicket(formData);
      setSuccessMessage(`Chamado criado com sucesso! ID do Ticket: ${ticket.id}`);
      setFormData({ name: "", category: "", subcategory: "", description: ""});
      route.push('/ticket/confirmation')
    } catch (error) {
      console.error("Erro ao criar chamado:", error);
      setErrorMessage("Ocorreu um erro ao criar o chamado. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
   
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader>
        <CardTitle>Novo Chamado</CardTitle>
        <CardDescription>
          Preencha os dados abaixo para abrir um novo chamado de suporte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nome do solicitante"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Categoria</label>
            <Select 
              required
              onValueChange={(value) =>
                setFormData({ ...formData, category: value, subcategory: ""})
              }
              value={formData.category}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.category && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Subcategoria</label>
              <Select 
                onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
                value={formData.subcategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a subcategoria" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.find((cat) => cat.id === formData.category)?.subcategories.map((sub) => (
                    <SelectItem key={sub.id} value={sub.id}>
                      {sub.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição</label>
            <Textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva detalhadamente o problema ou solicitação"
              className="min-h-32"
            />
          </div>

          <div className="flex items-center justify-between">
            <Button type="submit" disabled={isSubmitting}>
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Enviando...": "Enviar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
