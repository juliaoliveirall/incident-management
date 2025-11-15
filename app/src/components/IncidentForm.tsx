import { useState } from "react";
import { createIncident } from "../services/IncidentService";

interface IncidentFormProps {
  onSuccess: () => void;
}

export default function IncidentForm({ onSuccess }: IncidentFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await createIncident({ title, description, status });
      setSuccess("incidente criado com sucesso!");
      setTitle("");
      setDescription("");
      setStatus("open");

      onSuccess(); 
    } catch (err) {
      setError("erro ao criar incidente");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-4 shadow">
      <h2 className="text-lg font-bold mb-2">criar Incidente</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <div className="mb-3">
        <label className="block mb-1">título</label>
        <input
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">descrição</label>
        <textarea
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Status</label>
        <select
          className="w-full border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="aberto">aberto</option>
          <option value="em análise">em análise</option>
          <option value="resolvido">resolvido</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "salvando..." : "criar incidente"}
      </button>
    </form>
  );
}
