import { useEffect, useState } from "react";
import partyFetch from "../../axios/config";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await partyFetch.get("/admin/dashboard");
        setMetrics(res.data);
      } catch (error) {
        setError("Erro ao carregar métricas.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) return <div className="admin-status">Carregando...</div>;
  if (error) return <div className="admin-status">{error}</div>;

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Painel administrativo</h1>
        <span className="admin-badge">admin</span>
      </div>

      <div className="admin-metrics">
        <div className="metric-card">
          <span className="metric-label">Usuários cadastrados</span>
          <span className="metric-value">{metrics.totalUsers}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Festas criadas</span>
          <span className="metric-value">{metrics.totalParties}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Serviços cadastrados</span>
          <span className="metric-value">{metrics.totalServices}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Budget total</span>
          <span className="metric-value">
            R$ {metrics.totalBudget.toLocaleString("pt-BR")}
          </span>
        </div>
      </div>

      <div className="admin-sections">
        <div className="admin-section-card" onClick={() => navigate("/admin/users")}>
          <h2>Usuários</h2>
          <p>{metrics.totalUsers} cadastrados</p>
          <span className="admin-link">Ver todos →</span>
        </div>
        <div className="admin-section-card" onClick={() => navigate("/admin/parties")}>
          <h2>Festas</h2>
          <p>{metrics.totalParties} criadas</p>
          <span className="admin-link">Ver todas →</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;