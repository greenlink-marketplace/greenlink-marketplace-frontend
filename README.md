# 🌿 GreenLink Marketplace — Frontend

Este repositório contém o **frontend da plataforma GreenLink Marketplace**, desenvolvido em **React + TypeScript**.
A aplicação fornece a interface web e mobile responsiva que conecta **consumidores sustentáveis**, **empresas** e **recicladores**, promovendo a economia circular e incentivando práticas ambientais responsáveis.

---

## 💡 Visão Geral

O **GreenLink** é uma plataforma digital que transforma resíduos recicláveis em valor econômico, por meio de um sistema de **créditos verdes**.
Os usuários podem registrar materiais reutilizáveis, empresas podem dar destino sustentável aos resíduos, e recicladores encontram oportunidades de compra direta — tudo em um só ecossistema.

---

## 🚀 Tecnologias Utilizadas

* [React](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/) (para build e desenvolvimento)
* [Axios](https://axios-http.com/) (requisições HTTP)
* [React Router](https://reactrouter.com/)
* [TailwindCSS](https://tailwindcss.com/) (estilização)
* [ESLint + Prettier](https://eslint.org/) (padronização de código)

---

## ⚙️ Como Rodar o Projeto Localmente

### 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/greenlink-marketplace-frontend.git
cd greenlink-marketplace-frontend
```

### 2. Instale as dependências:

```bash
npm install
```

### 3. Crie o arquivo de variáveis de ambiente `.env` na raiz do projeto:

```ini
VITE_API_URL=http://127.0.0.1:8000/api
```

> Altere `VITE_API_URL` conforme o endereço do backend em produção ou desenvolvimento.

### 4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em:

```bash
http://localhost:5173/
```

---

## 🧩 Estrutura do Projeto

```bash
src/
├── assets/                 # Imagens, ícones, fontes e arquivos estáticos
│   ├── images/
│   ├── icons/
│   └── logos/
│
├── components/             # Componentes reutilizáveis (botões, inputs, modais, etc.)
│   ├── ui/                 # Componentes básicos de interface (atoms)
│   ├── layout/             # Header, Footer, Navbar, Sidebar, etc.
│   └── common/             # Cards, badges, listas, etc.
│
├── pages/                  # Páginas e views principais da aplicação
│   ├── auth/               # Login, Registro, Recuperar Senha
│   ├── home/               # Página inicial / Marketplace
│   ├── products/           # Listagem e detalhes de produtos sustentáveis
│   ├── dashboard/          # Painel do usuário, empresa ou reciclador
│   ├── profile/            # Edição de perfil
│   └── not-found/          # Página 404
│
├── hooks/                  # Hooks customizados (useAuth, useFetch, etc.)
│
├── context/                # Contextos globais (AuthContext, ThemeContext, etc.)
│
├── services/               # Comunicação com a API (Axios configs e endpoints)
│   ├── api.ts              # Configuração base do Axios
│   ├── authService.ts      # Endpoints de autenticação
│   ├── userService.ts      # Endpoints de usuários
│   └── productService.ts   # Endpoints de produtos
│
├── routes/                 # Definição das rotas e controle de acesso
│   ├── index.tsx           # Roteador principal
│   ├── ProtectedRoute.tsx  # Protege rotas autenticadas
│   └── PublicRoute.tsx
│
├── store/                  # Estado global (Zustand, Redux Toolkit, ou Context API)
│   ├── authStore.ts
│   └── uiStore.ts
│
├── styles/                 # Estilos globais (Tailwind base, variáveis, etc.)
│   ├── index.css
│   └── theme.ts
│
├── utils/                  # Funções utilitárias e helpers
│   ├── formatDate.ts
│   ├── formatCurrency.ts
│   └── validateEmail.ts
│
├── types/                  # Tipos e interfaces TypeScript
│   ├── user.ts
│   ├── product.ts
│   └── auth.ts
│
├── App.tsx                 # Componente raiz
├── main.tsx                # Ponto de entrada da aplicação
└── vite-env.d.ts
```

---

## 🧪 Testes

Testes de componentes e páginas podem ser executados com:

```bash
npm run test
# ou
yarn test
```

---

## 📦 Deploy

O build para produção pode ser gerado com:

```bash
npm run build
```

Os arquivos gerados estarão na pasta `dist/`.

---

## 👥 Contribuidores

Rodrigo Cruz ([@rodrig-crzz](https://github.com/rodrig-crzz)) — Desenvolvedor principal

---

### 💚 Juntos pela Economia Circular

A **GreenLink** é mais do que um marketplace — é uma ponte entre **sustentabilidade**, **tecnologia** e **impacto social positivo**.
Vamos construir um futuro mais verde e conectado! 🌱