import partyFetch from "../axios/config"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext"
import './Home.css'

const Home = () => {
  const { user, loading } = useAuth();
  const [parties, setParties] = useState([]);

  useEffect(() => {
    if (!loading && user) loadParties();
  }, [user, loading]);

  const loadParties = async () => {
    try {
      const res = await partyFetch.get("/parties");
      setParties(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <div className="home-status">Carregando...</div>;
  if (!user) return <div className="home-status">Você precisa estar logado!</div>;

  return (
    <div className="home">
      <div className="home-header">
        <h1>Suas festas</h1>
        {parties.length > 0 && (
          <span className="home-badge">{parties.length} festa{parties.length > 1 ? 's' : ''}</span>
        )}
      </div>

      {parties.length === 0 ? (
        <p className="home-empty">Nenhuma festa cadastrada ainda.</p>
      ) : (
        <div className="parties-grid">
          {parties.map((party) => (
            <div className="party-card" key={party._id}>
              <img src={party.image} alt={party.title} className="party-card-img" />
              <div className="party-card-body">
                <h3>{party.title}</h3>
                <Link to={`/party/${party._id}`} className="btn-detalhes">Ver detalhes</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;