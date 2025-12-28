import { useState, useContext } from "react";
import { authContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const { register } = useContext(authContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register({ name, email, password, confirmPassword });
      navigate("/login");
    } catch (error) {
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Criar conta</h2>

        <form onSubmit={handleSubmit}>
          <label>Nome: </label>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>E-mail: </label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Senha: </label>
          <input
            type="password"
            placeholder="Crie uma senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirmar senha: </label>
          <input
            type="password"
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {password !== confirmPassword && 
          (<p style={{color: "red"}}>As senhas não são iguais</p>)}
          

          <button type="submit">Cadastrar</button>
        </form>

        <p>
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
