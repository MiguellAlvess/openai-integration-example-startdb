# Frontend - Integração com OpenAI

Frontend de um projeto para demonstração de integração de uma API Spring Boot com a OpenAI para um contexto de assistente virtual.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como executar](#como-executar)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Integração com Backend](#integração-com-backend)
- [Desenvolvimento](#desenvolvimento)
- [Troubleshooting](#troubleshooting)

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js 18+** (recomendado: Node.js 20 ou superior)
- **npm** ou **yarn** (geralmente vem com o Node.js)
- **Backend rodando** (veja o README do backend)

### Verificando a instalação

```bash
# Verificar versão do Node.js
node -version

# Verificar versão do npm
npm -version
```

## Instalação

1. **Navegue até a pasta do frontend**:

```bash
cd frontend
```

2. **Instale as dependências**:

```bash
npm install
```

Este comando irá instalar todas as dependências listadas no `package.json`, incluindo:

- React e React DOM
- TypeScript
- Vite (build tool)
- TailwindCSS
- Axios (para requisições HTTP)
- React Query (para gerenciamento de estado do servidor)
- React Hook Form (para formulários)
- Radix UI (componentes acessíveis)
- E outras dependências

## Configuração

### Configuração do Backend

O frontend está configurado para se comunicar com o backend através de um proxy. Por padrão, o Vite está configurado para fazer proxy das requisições `/api` para `http://localhost:8080`.

A configuração está no arquivo `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api': 'http://localhost:8080/',
  },
}
```

**Importante:** Certifique-se de que o backend está rodando na porta 8080 antes de iniciar o frontend.

### Alterando a URL do Backend

Se o backend estiver rodando em uma porta diferente ou em outro servidor, você pode alterar a configuração do proxy no arquivo `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api': 'http://localhost:PORTA_AQUI/',
  },
}
```

Para produção, você pode configurar variáveis de ambiente. No entanto, atualmente o projeto utiliza o proxy do Vite em desenvolvimento.

## Como Executar

### Modo Desenvolvimento

#### Passo 1: Inicie o Backend

Primeiro, certifique-se de que o backend está rodando na porta 8080. Navegue até a pasta do backend e inicie o servidor:

```bash
# No diretório backend/openai_integration
export OPENAI_API_KEY="sua-chave-api-aqui"
./mvnw spring-boot:run
```

Para mais detalhes, consulte o [README do backend](../backend/README.md).

#### Passo 2: Inicie o Frontend

Em um novo terminal, navegue até a pasta do frontend e inicie o servidor de desenvolvimento:

```bash
# No diretório frontend
npm run dev
```

#### Passo 3: Acesse a aplicação

O servidor de desenvolvimento do frontend estará disponível em: `http://localhost:5173`

O Vite abrirá automaticamente no seu navegador, ou você pode acessar manualmente a URL acima.

**Nota:** Ambos os servidores (backend na porta 8080 e frontend na porta 5173) precisam estar rodando simultaneamente para a aplicação funcionar corretamente.

## Tecnologias utilizadas

### Core

- **React 19.2.0** - Biblioteca para construção de interfaces
- **TypeScript 5.9.3** - Superset do JavaScript com tipagem estática
- **Vite 7.2.4** - Build tool e servidor de desenvolvimento

### Estilização

- **TailwindCSS 3.4.18** - Framework CSS utility-first
- **Radix UI** - Componentes acessíveis e sem estilo
- **shadcn/ui** - Componentes construídos sobre Radix UI
- **Lucide React** - Ícones

### Gerenciamento de estado e dados

- **TanStack React Query 5.90.12** - Gerenciamento de estado do servidor e cache
- **React Hook Form 7.68.0** - Gerenciamento de formulários
- **Axios 1.13.2** - Cliente HTTP

### Validação

- **Zod 4.2.0** - Validação de schemas

### Desenvolvimento

- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formatador de código

## Integração com Backend

O frontend se comunica com o backend através de requisições HTTP. A configuração do Axios está em `src/lib/axios.ts`:

```typescript
import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
})
```

Todas as requisições começam com `/api`, que é redirecionado para o backend através do proxy do Vite em desenvolvimento.

### Exemplo de uso da API

O serviço de OpenAI está em `src/api/services/openai.ts`:

```typescript
import { api } from '@/lib/axios'

export const OpenAiService = {
  ask: async (input: PromptInput): Promise<PromptResponse> => {
    const response = await api.post('/openai', input)
    return response.data
  },
}
```

## Troubleshooting

### Erro: "Cannot connect to backend"

Certifique-se de que:

1. O backend está rodando na porta 8080
2. O proxy está configurado corretamente no `vite.config.ts`
3. Não há erros de CORS (verifique a configuração do backend)

## Links Úteis

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
