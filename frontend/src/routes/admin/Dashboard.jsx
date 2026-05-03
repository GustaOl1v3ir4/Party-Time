import { useEffect, useState } from "react";
import partyFetch from "../../axios/config";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./Dashboard.css";

const meses = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

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

  const chartData = metrics.partiesByMonth.map((item) => ({
    mes: meses[item._id - 1],
    festas: item.count,
  }));

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Dashboard</h1>
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

      <div className="admin-chart-card">
        <h2 className="chart-title">Festas criadas por mês</h2>
        {chartData.length === 0 ? (
          <p className="chart-empty">Nenhum dado disponível.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="mes"
                tick={{ fontSize: 12, fill: "#888", fontFamily: "DM Sans" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "#888", fontFamily: "DM Sans" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "0.5px solid #e2e2e2",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontFamily: "DM Sans",
                }}
                cursor={{ fill: "#f5f5f5" }}
                formatter={(value) => [`${value} festa${value !== 1 ? "s" : ""}`, ""]}
              />
              <Bar dataKey="festas" fill="#7703fc" radius={[4, 4, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        )}
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