export interface SecurityLog {
    id_log?: number;
    id_usuario?: number | null;
    acao: string;
    ip?: string;
    user_agent?: string;
    detalhes?: string;
    data_registro?: Date;
}
