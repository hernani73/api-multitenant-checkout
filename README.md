# API REST Multitenant & Checkout Stripe 💳

Uma API REST resiliente e de arquitetura avançada que implementa os conceitos de **SaaS Multitenant** com isolamento dinâmico de dados baseado em inquilinos (`x-tenant-slug`), autenticação segura ponta a ponta e fluxo completo de checkout simulado através da API do **Stripe**.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição / Função |
| :--- | :--- |
| **Node.js** | Ambiente de execução JavaScript Server-side |
| **TypeScript** | Superconjunto com tipagem estática estruturada |
| **Express** | Framework robusto para gerenciamento de rotas e middlewares HTTP |
| **JWT (JsonWebToken)** | Geração e validação de chaves criptográficas de segurança |
| **BcryptJS** | Hash seguro de senhas compatível com Windows e ambientes locais |
| **Stripe SDK** | Gateway de pagamentos integrado para simulação de e-commerce |

---

## 📐 Princípios de Arquitetura Avançada

A arquitetura do ecossistema foi projetada visando modularidade e alta escalabilidade:
* **Tenant Isolation Middleware:** Intercepta dinamicamente a requisição por meio do cabeçalho `x-tenant-slug`, impedindo que os dados de um cliente corporativo (inquilino) vazem para outro.
* **Connection Context Management:** Simulação realista de uma factory que altera repositórios ou esquemas de banco de dados sob demanda em tempo de execução.
* **Double-Layer Authentication Shield:** O middleware de autorização valida o JWT e realiza uma blindagem cruzada, impedindo que um usuário logado em uma empresa tente forjar acesso ao painel de outro cliente SaaS.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter instalado o [Node.js](https://nodejs.org/) na sua máquina de desenvolvimento.

### Instalação e Execução

1. Clone o repositório ou navegue até a pasta do projeto:
   ```bash
   cd api-multitenant-checkout
   ```

2. Instale todas as dependências requeridas pelo ecossistema:
   ```bash
   npm install
   ```

3. Crie e configure o arquivo `.env` na raiz do seu projeto com base no modelo fornecido:
   ```text
   PORT=3001
   NODE_ENV=development
   JWT_SECRET=uma_chave_secreta_e_longa_para_o_seu_saas_123
   STRIPE_API_KEY=sk_test_... (sua chave de testes do Stripe)
   ```

4. Suba o servidor em modo de desenvolvimento (o ambiente recarregará automaticamente com as suas alterações):
   ```bash
   npm run dev
   ```

---

## 🧪 Roteiro de Testes (Visualizando o Funcionamento)

Abaixo estão os cenários prontos mapeados no banco de dados em memória para validar o isolamento e as rotas:

### 1. Dados Base para Teste
* **Inquilino A:** `x-tenant-slug: tech-alpha` | Login: `admin@techalpha.com` | Senha: `123456`
* **Inquilino B:** `x-tenant-slug: fashion-beta` | Login: `admin@fashionbeta.com` | Senha: `123456`

### 2. Fluxo Prático no Postman / Insomnia

#### Passo 1: Autenticação (Login Isolado)
* **Método:** `POST`
* **Rota:** `http://localhost:3001/auth/login`
* **Headers:** 
  * `Content-Type: application/json`
  * `x-tenant-slug: tech-alpha`
* **Body (JSON):**
  ```json
  {
    "email": "admin@techalpha.com",
    "password": "123456"
  }
  ```
> *Envie a requisição para obter o seu token de acesso em formato JWT.*

#### Passo 2: Geração do Link de Checkout (Stripe)
* **Método:** `POST`
* **Rota:** `http://localhost:3001/checkout/session`
* **Headers:** 
  * `Content-Type: application/json`
  * `x-tenant-slug: tech-alpha`
  * `Authorization: Bearer <INSIRA_O_TOKEN_JWT_GERADO_AQUI>`
* **Body (JSON):**
  ```json
  {
    "productName": "Curso Avançado de Clean Architecture SaaS",
    "unitAmountInCents": 19990,
    "quantity": 1,
    "successUrl": "https://google.com?status=sucesso",
    "cancelUrl": "https://google.com?status=cancelado"
  }
  ```
> *Ao enviar, a API retornará uma propriedade `checkoutUrl`. Copie o link e cole-o no seu navegador para ver o painel oficial de testes do Stripe!*

Documentação Postman: https://hernani-souza-s-team.docs.buildwithfern.com/my-collection/introduction