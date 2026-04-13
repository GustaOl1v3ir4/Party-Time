import { useEffect, useState } from "react";
import partyFetch from "../../axios/config";
import { useNavigate } from "react-router-dom";
import "./Parties.css";

const AdminParties = () => {
    const [parties, setParties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchParties = async () => {
            try {
                const res = await partyFetch.get("/admin/parties");
                setParties(res.data);
            } catch (error) {
                setError("Erro ao carregar festas.");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchParties();
    }, []);

    if(loading) return <div className="admin-status">Carregando...</div>
    if(error) return <div className="admin-status">{error}</div>

    return (
        <div className="admin-parties">
            <div className="admin-header">
                <div className="admin-header-left">
                    <button className="btn-voltar" onClick={() => navigate("/admin")}>← Voltar</button>
                <h1>Festas</h1>
                <span className="admin-badge">{parties.length}</span>
                </div>
            </div>

            <div className="parties-table-wrap">
                <table className="parties-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Autor</th>
                            <th>Usuário</th>
                            <th>Budget</th>
                            <th>Serviços</th>
                            <th>Criado em</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parties.map((party) => (
                            <tr key={party._id}>
                                <td>
                                    <div className="party-title">{party.title}</div>
                                    <div className="party-desc">{party.description}</div>
                                </td>
                                <td>{party.author}</td>
                                <td>
                                    <div>{party.user?.name}</div>
                                    <div className="party-email">{party.user?.email}</div>
                                </td>
                                <td>R$ {party.budget.toLocaleString("pt-BR")}</td>
                                <td>{party.services?.length || 0}</td>

                                <td>
                                    {new Date(party.createdAt).toLocaleDateString("pt-BR")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>        
    );
};

export default AdminParties;