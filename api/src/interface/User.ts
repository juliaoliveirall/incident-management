export interface User {
    id_usuario?: number,
    nome: string,
    email: string,
    senha_hash: string,
    cargo?: "comum" | "gestor" | "administrador"; // opcional, padrão "comum"
  data_cadastro?: Date;
}

