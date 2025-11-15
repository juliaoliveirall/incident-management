import { api } from "./api";

export interface Incident {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

export const getIncidents = async (): Promise<Incident[]> => {
  const response = await api.get("/incidents");
  return response.data;
};
