import { useState } from "react";
import { FiX } from "react-icons/fi";
import {
  Overlay,
  PopupContainer,
  Header,
  Body,
  Transferencia,
  Footer,
  BotaoPagina,
  Titulo,
  Saldo,
} from "./style";

export default function PopupExtrato({ cliente, onClose }) {
  const [paginaAtual, setPaginaAtual] = useState(0);
  const porPagina = 7;
  const extrato = cliente.extrato;
  const totalPaginas = Math.ceil(extrato.length / porPagina);

  const start = paginaAtual * porPagina;
  const end = start + porPagina;
  const transferenciasPagina = extrato.slice(start, end);

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
    <Overlay>
      <PopupContainer>
        <Header>
          <Titulo>Extrato</Titulo>
          <FiX size={24} cursor="pointer" onClick={onClose} />
        </Header>

        <Saldo>
          Saldo:{" "}
          {cliente.saldo.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Saldo>

        <Body>
          {transferenciasPagina.map((trans, idx) => (
            <Transferencia key={idx} tipo={getTipoValor(trans)}>
              <span>{trans.descricao}</span>
              <span>{formatarValor(trans.valor)}</span>
            </Transferencia>
          ))}
        </Body>

        <Footer>
          <BotaoPagina
            onClick={() => setPaginaAtual(paginaAtual - 1)}
            disabled={paginaAtual === 0}
          >
            Anterior
          </BotaoPagina>
          <span>
            {paginaAtual + 1} / {totalPaginas}
          </span>
          <BotaoPagina
            onClick={() => setPaginaAtual(paginaAtual + 1)}
            disabled={paginaAtual + 1 >= totalPaginas}
          >
            Próxima
          </BotaoPagina>
        </Footer>
      </PopupContainer>
    </Overlay>
  );
}
