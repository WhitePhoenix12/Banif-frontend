import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Titulo, Button, Sidebar, SidebarButton } from "./style";
import Logo from "../../images/logo.png";
import LogoBlack from "../../images/logoBlack.png";
import PopupCadastroCliente from "../PopupCadastroCliente";

export default function CabecalhoGerente() {
  const [clicado, setClicado] = useState(false);
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [popupClienteAberto, setPopupClienteAberto] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setClicado(!clicado);
    setSidebarAberta(!sidebarAberta);
  };

  const handleLogout = () => {
    // 🔧 FECHA A SIDEBAR
    setSidebarAberta(false);
    setClicado(false);

    // 🔧 REDIRECIONA PARA A TELA DE LOGIN
    navigate("/");
  };

  const handleCadastrarCliente = () => {
    setPopupClienteAberto(true);
    setSidebarAberta(false); // 🔧 FECHA A SIDEBAR AO ABRIR O POPUP
    setClicado(false);
  };

  return (
    <>
      <Header>
        <Button
          onClick={handleClick}
          clicado={clicado}
          imagem={clicado ? LogoBlack : Logo}
        />
        <Titulo>Bem Vindo ao Banif</Titulo>

        <Sidebar aberta={sidebarAberta}>
          <SidebarButton onClick={handleCadastrarCliente}>
            Cadastrar Cliente
          </SidebarButton>
          <SidebarButton onClick={handleLogout}>Sair</SidebarButton>
        </Sidebar>
      </Header>

      {popupClienteAberto && (
        <PopupCadastroCliente fechar={() => setPopupClienteAberto(false)} />
      )}
    </>
  );
}
