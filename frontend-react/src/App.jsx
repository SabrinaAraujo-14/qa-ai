import { useState } from "react";
import { Loader2, Clipboard, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function App() {
  const [requirement, setRequirement] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function generateTests() {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://127.0.0.1:8000/generate-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requirement })
      });

      const data = await res.json();
      setResult(data.tests);
    } catch (err) {
      setResult("Erro ao gerar testes.");
    }

    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white", padding: "20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "28px", fontWeight: "bold" }}
        >
          <Sparkles size={24} /> QA.AI SaaS
        </motion.h1>

        <p style={{ color: "#94a3b8" }}>
          Gere casos de teste automaticamente com IA
        </p>

        <div style={{ marginTop: "20px", padding: "15px", background: "#1e293b", borderRadius: "10px" }}>
          <textarea
            placeholder="Descreva o requisito..."
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            style={{
              width: "100%",
              minHeight: "120px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #334155",
              background: "#0f172a",
              color: "white"
            }}
          />

          <button
            onClick={generateTests}
            disabled={loading}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: "#3b82f6",
              color: "white",
              cursor: "pointer"
            }}
          >
            {loading ? "Gerando..." : "Gerar Testes"}
          </button>
        </div>

        {result && (
          <div style={{ marginTop: "20px", background: "#1e293b", padding: "15px", borderRadius: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>Resultados</h2>

              <button
                onClick={() => navigator.clipboard.writeText(result)}
                style={{
                  background: "#334155",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                <Clipboard size={14} /> Copiar
              </button>
            </div>

            <pre style={{ 
              whiteSpace: "pre-wrap", 
              marginTop: "10px", 
              color: "#cbd5e1",
              textAlign: "left"
            }}>
             {result}
           </pre>
           
          </div>
        )}

      </div>
    </div>
  );
}