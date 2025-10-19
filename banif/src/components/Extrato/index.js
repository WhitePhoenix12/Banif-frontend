import { useState } from "react";
import {
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import {
  Container,
  PopupContainer,
  Header,
  Body,
  Transferencia,
  Footer,
  BotaoPagina,
  Titulo,
  Saldo,
  BotaoExtrato,
  ConteudoExtrato,
  ContainerSaldo,
  IconeOlho,
} from "./style";

export default function Extrato({ cliente }) {
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [extratoAberto, setExtratoAberto] = useState(false);
  const [saldoVisivel, setSaldoVisivel] = useState(false);
  const porPagina = 10;
  const extrato = cliente.extrato;
  const totalPaginas = Math.ceil(extrato.length / porPagina);

  const start = paginaAtual * porPagina;
  const end = start + porPagina;
  const transferenciasPagina = extrato.slice(start, end);

  const toggleExtrato = () => {
    setExtratoAberto(!extratoAberto);
  };

  const toggleSaldoVisivel = () => {
    setSaldoVisivel(!saldoVisivel);
  };

  // 🔧 FORMATA O SALDO (VISÍVEL OU OCULTO)
  const formatarSaldo = () => {
    if (saldoVisivel) {
      return cliente.saldo.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    } else {
      return "••••••••";
    }
  };

  // 🔧 FUNÇÃO PARA DETERMINAR SE O VALOR É POSITIVO OU NEGATIVO
  const getTipoValor = (transacao) => {
    // Se o valor for negativo, é saída (vermelho)
    if (transacao.valor < 0) {
      return "negativo";
    }
    // Se o valor for positivo, é entrada (verde)
    else if (transacao.valor > 0) {
      return "positivo";
    }
    // Valor zero (pode ser cinza ou outra cor)
    return "neutro";
  };

  // 🔧 FORMATA O VALOR COM SINAL
  const formatarValor = (valor) => {
    const valorAbsoluto = Math.abs(valor);
    const sinal = valor < 0 ? "- " : valor > 0 ? "+ " : "";

    return `${sinal}${valorAbsoluto.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`;
  };

  return (
    <Container>
      <PopupContainer>
        <Header>
          <Titulo>Extrato</Titulo>
        </Header>

        <ContainerSaldo>
          <Saldo>Saldo: {formatarSaldo()}</Saldo>
          <IconeOlho onClick={toggleSaldoVisivel}>
            {saldoVisivel ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </IconeOlho>
        </ContainerSaldo>

        <BotaoExtrato onClick={toggleExtrato} aberto={extratoAberto}>
          <span>Extrato</span>
          {extratoAberto ? (
            <FiChevronUp size={20} />
          ) : (
            <FiChevronDown size={20} />
          )}
        </BotaoExtrato>

        <ConteudoExtrato aberto={extratoAberto}>
          <Body>
            {transferenciasPagina.map((trans, idx) => (
              <Transferencia key={idx} tipo={getTipoValor(trans)}>
                <span>{trans.descricao}</span>
                <span>{formatarValor(trans.valor)}</span>
              </Transferencia>
            ))}
          </Body>
        </ConteudoExtrato>
      </PopupContainer>
    </Container>
  );
}
