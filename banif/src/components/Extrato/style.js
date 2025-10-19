import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const slideDown = keyframes`
  from { 
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
  }
  to { 
    max-height: 500px;
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from { 
    max-height: 500px;
    opacity: 1;
    transform: translateY(0);
  }
  to { 
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 76vh;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
  transition: opacity 0.25s ease;

  &.fade-out {
    opacity: 0;
  }
`;

export const PopupContainer = styled.div`
  background: #fff;
  border-radius: 1rem;
  width: 90%;
  max-width: 600px;
  max-height: 90%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #002f6c, #0047ab);
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
`;

export const Titulo = styled.p`
  font-size: calc(calc(3vw + 4vh) / 2);
  color: #fff;
  text-shadow: 2px 2px 2px rgba(255, 255, 255, 0.45);
`;

// 🔧 CONTAINER DO SALDO COM ÍCONE
export const ContainerSaldo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background: rgba(0, 71, 171, 0.1);
  border-bottom: 2px solid rgba(0, 71, 171, 0.2);
  position: relative;
`;

export const Saldo = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: #002f6c;
  letter-spacing: ${(props) => (props.oculto ? "2px" : "normal")};
`;

// 🔧 ÍCONE DO OLHO
export const IconeOlho = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #002f6c;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 71, 171, 0.1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// 🔧 BOTÃO DO EXTRATO
export const BotaoExtrato = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: ${(props) =>
    props.aberto ? "rgba(0, 71, 171, 0.15)" : "rgba(0, 71, 171, 0.08)"};
  border: none;
  border-bottom: ${(props) =>
    props.aberto ? "2px solid rgba(0, 71, 171, 0.3)" : "none"};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 600;
  color: #002f6c;

  &:hover {
    background: rgba(0, 71, 171, 0.2);
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

// 🔧 CONTEÚDO DO EXTRATO COM ANIMAÇÃO
export const ConteudoExtrato = styled.div`
  max-height: ${(props) => (props.aberto ? "500px" : "0")};
  opacity: ${(props) => (props.aberto ? "1" : "0")};
  overflow: hidden;
  animation: ${(props) => (props.aberto ? slideDown : slideUp)} 0.4s ease-in-out;
  transition: max-height 0.4s ease-in-out, opacity 0.3s ease-in-out;
`;

export const Body = styled.div`
  padding: 1rem 1.5rem;
  overflow-y: auto;
  flex: 1;
  max-height: 300px;
`;

// 🔧 ATUALIZADO: TRANSFERÊNCIA BASEADA NO VALOR (POSITIVO/NEGATIVO)
export const Transferencia = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ tipo }) => {
    switch (tipo) {
      case "positivo":
        return "#28a745"; // Verde para valores positivos
      case "negativo":
        return "#dc3545"; // Vermelho para valores negativos
      case "neutro":
        return "#6c757d"; // Cinza para valor zero
      default:
        return "#6c757d";
    }
  }};
  transition: color 0.3s ease;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.02);

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.03);
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  span {
    font-weight: 600;
    color: #002f6c;
  }
`;

export const BotaoPagina = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #002f6c, #0047ab);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:disabled {
    background: #aaa;
    cursor: default;
  }

  &:hover:not(:disabled) {
    filter: brightness(1.2);
    transform: translateY(-1px);
  }
`;
