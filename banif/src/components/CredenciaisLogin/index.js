import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Titulo,
  SubTitulo,
  SubContainer,
  CampoTexto,
  IconeOlho,
  BotaoLogar,
  SenhaEsquecida,
  ContainerInput,
} from "./style";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { clientes } from "../../data/clientes";

export default function CredenciaisLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [salvar, setSalvar] = useState(false);
  const navigate = useNavigate();
  const cliente = clientes.find((c) => c.email === email && c.senha === senha);
  if (cliente) {
    navigate(`/Home/${encodeURIComponent(cliente.email)}`); // 🔧 Isso converte @ para %40
  }
  const handleLogin = () => {
    if (email === "gerente@banifbank.com" && senha === "gerente123") {
      navigate("/Home/Gerente");
      return;
    }

    const cliente = clientes.find(
      (cliente) => cliente.email === email && cliente.senha === senha
    );

    if (cliente) {
      navigate(`/Home/${encodeURIComponent(cliente.email)}`);
    } else {
      alert("Email ou senha incorretos!");
    }
  };

  return (
    <Container>
      <Titulo>Login</Titulo>

      <SubContainer>
        <ContainerInput>
          <SubTitulo>Email</SubTitulo>
          <CampoTexto
            type="email"
            placeholder="Digite seu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </ContainerInput>
        <ContainerInput>
          <SubTitulo>Senha</SubTitulo>
          <CampoTexto
            type={mostrarSenha ? "text" : "password"}
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </ContainerInput>
        <IconeOlho onClick={() => setMostrarSenha(!mostrarSenha)}>
          {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
        </IconeOlho>
        <SenhaEsquecida>Esqueceu sua Senha?</SenhaEsquecida>
        <BotaoLogar onClick={handleLogin}>Realizar Login</BotaoLogar>
      </SubContainer>
    </Container>
  );
}
