import { useEffect, useState } from "react";
import partyFetch from "../../axios/config";
import { useNavigate } from "react-router-dom";
import "./Users.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await partyFetch.get("/admin/users");
        setUsers(res.data);
      } catch (error) {
        setError("Erro ao carregar usuários.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="admin-status">Carregando...</div>;
  if (error) return <div className="admin-status">{error}</div>;

  return (
    <div className="admin-users">
      <div className="admin-header">
        <div className="admin-header-left">
          <button className="btn-voltar" onClick={() => navigate("/admin")}>
            ← Voltar
          </button>
          <h1>Usuários</h1>
          <span className="admin-badge">{users.length}</span>
        </div>
      </div>

      <div className="users-table-wrap">
        <table className="users-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Role</th>
              <th>Cadastrado em</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge role-${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;