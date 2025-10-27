# Incident Management System

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

Sistema de gerenciamento de incidentes desenvolvido como projeto acadêmico.  
Permite cadastrar, listar e monitorar incidentes em uma aplicação full-stack com **Node.js, TypeScript, React, TailwindCSS e MySQL**.

---

##  Estrutura do projeto

incident-management-system/

├── api/ # Backend (Node.js + TypeScript + Express)

├── app/ # Frontend (React + TypeScript + Vite + TailwindCSS)

├── .gitignore

└── README.md


---

##  Tecnologias

**Backend:**

- Node.js + TypeScript  
- Express  
- MySQL (usando mysql2)  
- JWT para autenticação  
- Axios (para comunicação com frontend)

**Frontend:**

- React + TypeScript  
- Vite  
- TailwindCSS  
- Axios

---

##  Configuração do backend

1. Entre na pasta do backend:
   
```cd api```

3. Instale as dependências:
   
```npm install```

5. Configure o arquivo .env
6. Crie o banco de dados MySQL:
   
```CREATE DATABASE incident_db;```

8. Rode o backend:
   
```npm run dev```

---

## Configuração do frontend

1. Entre na pasta do frontend:
   
```cd app```

3. Instale as dependências:
   
```npm install```

5. Configure o `src/services/api.ts` com a URL do backend
6. Rode o frontend:
   
```npm run dev```

---

 ## Funcionalidades

- Listar incidentes cadastrados
- Cadastrar novos incidentes
- Comunicação frontend ↔ backend via API REST
> Futuramente pode incluir autenticação, filtros, relatórios e dashboards.

---

## Git Workflow

`main` — branch principal com o projeto completo
`feature/nome-da-funcionalidade` — branches individuais para cada funcionalidade
`dev` — branch de desenvolvimento para testes
- Pull Requests para integrar as features


