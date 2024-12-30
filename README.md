# Sistema de Chamados e Demandas - MVP

Este projeto é um MVP (Minimum Viable Product) de um sistema de chamados e demandas desenvolvido para atender os colaboradores de uma imobiliária. O objetivo é oferecer uma interface intuitiva para categorizar e priorizar demandas, utilizando tecnologias modernas como **Next.js 14** e **Tailwind CSS**.

## Tecnologias Utilizadas

- **Next.js 14**: Framework para aplicações web com renderização do lado do servidor.
- **Tailwind CSS**: Framework utilitário para estilização.
- **TypeScript**: Para tipagem estática e maior segurança no desenvolvimento.
- **Discord Webhook**: Para envio de notificações dos chamados.

## Funcionalidades

1. **Formulário de Criação de Chamados**:
   - Campos: Nome, categoria e descrição.
   - Prioridade definida automaticamente com base na categoria.

2. **Categorias de Demandas**:
   - **Dúvidas** (Prioridade Média).
   - **Problemas Técnicos** (Prioridade Alta).
   - **Solicitações** (Prioridade Média)
   - **Sugestões de Melhorias** (Prioridade Baixa).

3. **Integração com Discord**:
   - Envio automático de notificações para um canal via webhook.

4. **Indicação de Disponibilidade**:
   - **Nota:** Esta funcionalidade será implementada em versões futuras, juntamente com a criação de um backend.

## Estrutura do Projeto

```
.
├── src
│   ├── app
│   │   ├── fonts
│   │   │   ├── GeistMonoVF.woff
│   │   │   ├── GeistVF.woff
│   │   ├── ticket
│   │   │   └── confirmation
│   │   │       └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── buttonLoading.tsx
│   │   ├── ticketForm.tsx
│   │   └── ui
│   │       ├── alert.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       └── toaster.tsx
│   ├── constants
│   │   └── index.tsx
│   ├── hooks
│   │   ├── use-toast.ts
│   │   ├── useDiscordWebhookMessage.ts
│   │   └── useTickets.ts
│   ├── lib
│   │   └── utils.ts
│   ├── types
│   │   └── index.ts
│   └── utils
│       └── ticketUtils.ts
├── .env
├── .eslintrc.json
├── .gitignore
├── .components.json
├── .next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Configuração do Projeto

### 1. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/mvp-chamados.git
cd mvp-chamados
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar o Tailwind CSS
O arquivo `tailwind.config.ts` está pronto para uso. Certifique-se de que o diretório `content` inclua todos os caminhos corretos:
```javascript
content: [
  "./src/app/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
]
```

### 4. Configurar o Webhook do Discord
Atualize a URL do webhook no arquivo `src/hooks/useDiscordWebhookMessage.ts`:
```javascript
const webhookUrl = "https://discord.com/api/webhooks/SEU_WEBHOOK";
```

### 5. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Uso

1. Acesse a página inicial e clique em "Abrir um Chamado".
2. Preencha o formulário com:
   - Nome do colaborador.
   - Categoria da demanda.
   - Descrição detalhada.
3. Envie o chamado e verifique a notificação no Discord.

## Melhorias Futuras

- Revisar a necessidade da pasta `fonts` e do arquivo `ticketUtils.ts`.
- Adicionar backend para armazenamento de dados.
- Implementar sistema de autenticação para colaboradores.
- Criar painel de administração para gerenciar chamados.
- Incluir dashboard com relatórios e estatísticas.

## Licença
Este projeto é de uso interno e não possui licença aberta.

---

Se tiver dúvidas ou sugestões, entre em contato!

