import { useEffect, useState } from "react";
import { getIncidents } from "../services/IncidentService";
import IncidentForm from "./IncidentForm";

interface Incident {
  id: number;
  title: string;
  status: string;
  created_at: string;
}

export default function IncidentList() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadIncidents() {
    try {
      const data = await getIncidents();
      setIncidents(data);
    } catch (err) {
      setError("Erro ao carregar incidentes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  if (loading) return <p className="text-gray-600">Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Incidentes</h1>

      {/* Formulário */}
      <IncidentForm onSuccess={loadIncidents} />

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Título</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Criado em</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((inc) => (
            <tr key={inc.id} className="text-center">
              <td className="p-2 border">{inc.id}</td>
              <td className="p-2 border">{inc.title}</td>
              <td className="p-2 border">{inc.status}</td>
              <td className="p-2 border">
                {new Date(inc.created_at).toLocaleDateString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
