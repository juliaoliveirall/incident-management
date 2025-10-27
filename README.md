# Incident Management System - Projeto Acadêmico

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

Este projeto foi desenvolvido para a disciplina de Segurança da Informação. O sistema é uma aplicação full-stack que simula uma plataforma interna para o registro e acompanhamento de ocorrências de segurança (físicas, digitais ou internas).

🎯Objetivo principal
O objetivo central deste trabalho é aplicar na prática os conceitos fundamentais de Segurança da Informação (como RBAC e hashing de senhas) para proteger a própria plataforma e os dados sensíveis que ela gerencia.

---

##  Estrutura do projeto

incident-management-system/

├── api/  

├── app/  

├── .gitignore

└── README.md

---

##  Tecnologias

**Backend:**

- Node.js + TypeScript  
- Express  
- MySQL (usando mysql2)  
- JWT para autenticação
- bcrypt para hash de senhas

**Frontend:**

- React + TypeScript  
- Vite  
- TailwindCSS  
- Axios

---

## Status Atual do Desenvolvimento
A fase atual do projeto concluiu o alicerce (scaffolding) da aplicação full-stack. A base tecnológica está configurada e pronta para a implementação das funcionalidades centrais. O que foi finalizado até o momento:

**Planejamento e Estrutura do Projeto:**
- Definição de objetivos e escopo.
- Escolha da stack tecnológica (Node.js, React, TypeScript, MySQL).
- Criação do repositório no GitHub.
- Documentação inicial e organização de tarefas (Kanban).

**Fundação do Backend (Node.js):**
- A estrutura base do servidor com Node.js e TypeScript está criada.
- A conexão com o banco de dados MySQL foi estabelecida e validada.

**Modelagem do Banco de Dados (MySQL):**
- O schema inicial foi modelado e as tabelas principais (usuarios e incidentes) foram criadas no banco.

**Fundação do Frontend (React):**
- A aplicação base em React está configurada e pronta para o desenvolvimento das telas.

---

## Roadmap (próximos passos)

**🧩 1. Funcionalidades Principais:**
- CRUD completo de Usuários
- CRUD completo de Incidentes
- Criação das tabelas possíveis extras:
`atualizacoes_incidentes` 🕒
`departamentos` 🏢
`responsaveis_incidente` 👥

**🔒 2. Autenticação e Segurança:**
- Criptografia de senhas com bcrypt
- Login e registro de usuários
- Geração de JWT Tokens
- Controle de acesso por nível de permissão (RBAC)

**🔗 3. Integração e Fluxo de Dados:**
- Conectar frontend (React) com API Node.js
- Exibir incidentes cadastrados em tempo real
- Implementar feedbacks visuais (alertas e status)

**🎨 4. Interface e Experiência:**
- Telas de Login, Dashboard e Gerenciamento de Incidentes
- Layout responsivo e intuitivo
- Melhorias de UX com mensagens e validações

**🧪 5. Testes e Documentação:**
- Testes básicos de API (Swagger)
- Documentar endpoints e rotas principais
- Atualizar README com instruções de uso


##  Configuração do backend

1. Entre na pasta do backend:
   
```
cd api
```

2. Instale as dependências:
   
```
npm install
```

3. Configure o arquivo .env
4. Crie o banco de dados MySQL:
   
```
CREATE DATABASE incident_db;
```

5. Rode o backend:
   
```
npm run dev
```

---

## Configuração do frontend

1. Entre na pasta do frontend:
   
```
cd app
```

2. Instale as dependências:
   
```
npm install
```

3. Configure o `src/services/api.ts` com a URL do backend
4. Rode o frontend:
   
```
npm run dev
```

---

## Git Workflow

`main` — branch principal com o projeto completo

`feature/nome-da-funcionalidade` — branches individuais para cada funcionalidade

`dev` — branch de desenvolvimento para testes

- Pull Requests para integrar as features


