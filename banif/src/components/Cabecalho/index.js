import { useState } from "react";
import { Header, Titulo, Button, Sidebar, SidebarButton } from "./style";
import Logo from "../../images/logo.png";
import LogoBlack from "../../images/logoBlack.png";
import { useNavigate } from "react-router-dom";
import PopupInformacoesPessoais from "../PopupInformacoesPessoais";
import PopupTransferencia from "../PopupTransferencia";
import PopupAplicacao from "../PopupAplicacao"; // 🔧 NOVO IMPORT

export default function Cabecalho({ cliente }) {
  const [clicado, setClicado] = useState(false);
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [mostrarInformacoes, setMostrarInformacoes] = useState(false);
  const [mostrarTransferencia, setMostrarTransferencia] = useState(false);
  const [mostrarAplicacao, setMostrarAplicacao] = useState(false); // 🔧 NOVO ESTADO
  const navigate = useNavigate();

  const handleClick = () => {
    setClicado(!clicado);
    setSidebarAberta(!sidebarAberta);
  };

  const handleLogout = () => {
    setSidebarAberta(false);
    setClicado(false);
    navigate("/");
  };

  // 🔧 FUNÇÃO PARA ABRIR POPUP DE INFORMAÇÕES PESSOAIS
  const handleInformacoesPessoais = () => {
    setSidebarAberta(false);
    setClicado(false);
    setMostrarInformacoes(true);
  };

  // 🔧 FUNÇÃO PARA FECHAR POPUP DE INFORMAÇÕES
  const handleFecharInformacoes = () => {
    setMostrarInformacoes(false);
  };

  // 🔧 FUNÇÃO PARA ABRIR POPUP DE TRANSFERÊNCIA
  const handleAbrirTransferencia = () => {
    setSidebarAberta(false);
    setClicado(false);
    setMostrarTransferencia(true);
  };

  // 🔧 FUNÇÃO PARA FECHAR POPUP DE TRANSFERÊNCIA
  const handleFecharTransferencia = () => {
    setMostrarTransferencia(false);
  };

  // 🔧 FUNÇÃO PARA ABRIR POPUP DE APLICAÇÃO
  const handleAbrirAplicacao = () => {
    setSidebarAberta(false);
    setClicado(false);
    setMostrarAplicacao(true);
  };

  // 🔧 FUNÇÃO PARA FECHAR POPUP DE APLICAÇÃO
  const handleFecharAplicacao = () => {
    setMostrarAplicacao(false);
  };

  return (
    <>
      <Header>
        <Button
          onClick={handleClick}
          clicado={clicado}
          imagem={clicado ? LogoBlack : Logo}
        />
        <Titulo>BANIF DIGITAL BANK</Titulo>

        <Sidebar aberta={sidebarAberta}>
          <SidebarButton onClick={handleInformacoesPessoais}>
            Informações Pessoais
          </SidebarButton>
          <SidebarButton onClick={handleAbrirTransferencia}>
            Realizar Transferência
          </SidebarButton>
          <SidebarButton onClick={handleAbrirAplicacao}>
            {" "}
            {/* 🔧 NOVO BOTÃO */}
            Realizar Aplicação
          </SidebarButton>
          <SidebarButton onClick={handleLogout}>Sair</SidebarButton>
        </Sidebar>
      </Header>

      {mostrarInformacoes && cliente && (
        <PopupInformacoesPessoais
          cliente={cliente}
          fechar={handleFecharInformacoes}
        />
      )}

      {mostrarTransferencia && cliente && (
        <PopupTransferencia
          cliente={cliente}
          fechar={handleFecharTransferencia}
        />
      )}

      {mostrarAplicacao && cliente && (
        <PopupAplicacao cliente={cliente} fechar={handleFecharAplicacao} />
      )}
    </>
  );
}
