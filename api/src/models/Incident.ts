import { db } from "../config/db";

export interface Incident {
    id_incidente?: number,
    titulo: string,
    descricao: string,
    tipo?: "físico" | "digital" | "interno",
    prioridade?: "baixa" | "média" | "alta",
    status?: "aberto" | "em análise" | "resolvido",
    id_usuario_reportou: number,
    data_registro?: Date;
}