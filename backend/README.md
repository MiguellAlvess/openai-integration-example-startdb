# Backend - Integração com OpenAI

Backend de um projeto para demonstração de integração de uma API Spring Boot com a OpenAI para um contexto de assistente virtual.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como executar](#como-executar)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [API Endpoints](#api-endpoints)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Troubleshooting](#troubleshooting)

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Java 21** ou superior
- **Maven 3.6+** (ou use o Maven Wrapper incluído no projeto)
- **OpenAI API Key** ([obtenha aqui](https://platform.openai.com/api-keys))

### Verificando a instalação

```bash
# Verificar versão do Java
java -version

# Verificar versão do Maven (se instalado globalmente)
mvn -version
```

## Instalação

1. **Clone o repositório** (se ainda não fez):

```bash
cd backend/openai_integration
```

2. **Instale as dependências**

O Maven irá baixar automaticamente todas as dependências na primeira execução. Você pode usar o Maven Wrapper incluído no projeto:

```bash
# Linux/Mac
./mvnw clean install

# Windows
mvnw.cmd clean install
```

Ou se você tiver Maven instalado globalmente:

```bash
mvn clean install
```

## Configuração

### Variáveis de ambiente

O projeto requer uma variável de ambiente para a chave da API da OpenAI.

#### Linux/Mac

Crie um arquivo `.env` na raiz do projeto `backend/openai_integration/` ou exporte a variável no terminal:

```bash
export OPENAI_API_KEY="sua-chave-api-aqui"
```

#### Windows (PowerShell)

```powershell
$env:OPENAI_API_KEY="sua-chave-api-aqui"
```

#### Windows (CMD)

```cmd
set OPENAI_API_KEY=sua-chave-api-aqui
```

### Configuração do servidor

O servidor está configurado para rodar na porta **8080** por padrão. Você pode alterar isso através da variável de ambiente `PORT`:

```bash
export PORT=<porta-que-você-quiser>
```

## Como executar

### Modo desenvolvimento

1. **Configure a variável de ambiente** (veja seção [Configuração](#configuração))

2. **Execute o projeto** usando o Maven Wrapper:

```bash
# Linux/Mac
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

Ou com Maven instalado globalmente:

```bash
mvn spring-boot:run
```

3. **Verifique se o servidor está rodando**

Você deve ver uma mensagem similar a:

```
Started OpenaiIntegrationApplication in X.XXX seconds
```

O servidor estará disponível em: `http://localhost:8080`

## Tecnologias utilizadas

- **Spring Boot 3.5.8** - Framework Java
- **Spring AI 1.0.0** - Integração com OpenAI
- **Spring Web** - API REST
- **Lombok** - Redução de boilerplate
- **Java 21** - Linguagem de programação
- **Maven** - Gerenciador de dependências

## API Endpoints

### POST /api/openai

Envia uma mensagem para a OpenAI e recebe uma resposta, mantendo o contexto da conversa por sessão.

**Request Body:**

```json
{
  "message": "Sua pergunta ou mensagem aqui"
}
```

**Response:**

```json
{
  "message": "Resposta da OpenAI"
}
```

**Exemplo de uso com cURL:**

```bash
curl -X POST http://localhost:8080/api/openai \
  -H "Content-Type: application/json" \
  -d '{"message": "O que é Clean Architecture?"}'
```

**Nota:** A memória da conversa é mantida por sessão HTTP. Cada cliente (navegador/frontend) terá sua própria sessão de conversa.

### CORS

O backend está configurado para aceitar requisições do frontend rodando em:

- `http://localhost:5173`
- `http://127.0.0.1:5173`

Para alterar as origens permitidas, edite o arquivo `src/main/java/br/com/db/openai_integration/config/CorsConfig.java`.

## Troubleshooting

### Erro: "OPENAI_API_KEY not found"

Certifique-se de que a variável de ambiente `OPENAI_API_KEY` está configurada corretamente antes de iniciar a aplicação.

### Erro de CORS no frontend

Verifique se o frontend está rodando em uma das origens permitidas (`http://localhost:5173` ou `http://127.0.0.1:5173`). Se necessário, atualize o arquivo `CorsConfig.java`.

## Notas Adicionais

- O modelo utilizado por padrão é o **gpt-4o-mini**
- O sistema utiliza um prompt de sistema configurado em `src/main/resources/system-prompt.txt`
- A memória da conversa é mantida por sessão HTTP usando `MessageWindowChatMemory`
- O projeto utiliza sessões HTTP para manter o contexto da conversa entre requisições

## Links Úteis

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring AI Documentation](https://docs.spring.io/spring-ai/reference/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Maven Documentation](https://maven.apache.org/guides/)
