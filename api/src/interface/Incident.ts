export interface Incident {
  id_incidente?: number;
  titulo: string;
  descricao: string;
  tipo?: "físico" | "digital" | "interno" | "outro";
  prioridade?: "baixa" | "média" | "alta";
  status?: "aberto" | "em análise" | "resolvido";
  id_usuario_reportou: number;
  data_registro?: Date;
}
