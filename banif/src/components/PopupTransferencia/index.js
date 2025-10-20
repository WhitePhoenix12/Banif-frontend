import { FiX } from "react-icons/fi";
import { useState, useCallback, useEffect } from "react";
import {
  Container,
  Popup,
  Formulario,
  Label,
  LinhaCampos,
  BotaoFechar,
  BotaoEnviar,
  SaldoInfo,
} from "./style";
import PopupMensagem from "../PopupMensagem";
import InputSeguro from "../InputSeguro";
import { clientes } from "../../data/clientes"; // Importar a lista de clientes para validar

export default function PopupTransferencia({ cliente, fechar }) {
  const [fechando, setFechando] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [formData, setFormData] = useState({
    valor: "",
    contaDestino: "",
    agenciaDestino: "",
    senha: "",
  });

  const fecharMensagem = useCallback(() => {
    setMensagem(null);
  }, []);

  const handleFechar = useCallback(() => {
    setFechando(true);
    setTimeout(() => {
      if (fechar) fechar();
    }, 250);
  }, [fechar]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    if (name === "senha") {
      // 🔧 APENAS NÚMEROS E LIMITE DE 8 DÍGITOS
      const apenasNumeros = value.replace(/\D/g, "");
      const senhaLimitada = apenasNumeros.slice(0, 8);

      setFormData((prev) => ({
        ...prev,
        [name]: senhaLimitada,
      }));
    } else if (name === "valor") {
      // 🔧 APENAS NÚMEROS E DECIMAIS PARA VALOR
      const apenasNumeros = value.replace(/[^\d,]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: apenasNumeros,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }, []);

  // 🔧 FUNÇÃO PARA VALIDAR SE A CONTA DESTINO EXISTE
  const validarContaDestino = (agencia, conta) => {
    return clientes.some(
      (cliente) => cliente.agencia === agencia && cliente.conta === conta
    );
  };

  // 🔧 FUNÇÃO DE VALIDAÇÃO
  const validarFormulario = () => {
    const erros = [];

    // Validação do Valor
    if (!formData.valor.trim()) {
      erros.push("Valor é obrigatório");
    } else {
      const valorNumerico = parseFloat(formData.valor.replace(",", "."));
      if (isNaN(valorNumerico) || valorNumerico <= 0) {
        erros.push("Valor deve ser um número positivo");
      } else if (valorNumerico > cliente.saldo) {
        erros.push("Saldo insuficiente para realizar a transferência");
      }
    }

    // Validação da Conta Destino
    if (!formData.contaDestino.trim()) {
      erros.push("Conta destino é obrigatória");
    }

    // Validação da Agência Destino
    if (!formData.agenciaDestino.trim()) {
      erros.push("Agência destino é obrigatória");
    }

    // Validação se a conta destino existe
    if (formData.agenciaDestino.trim() && formData.contaDestino.trim()) {
      const contaExiste = validarContaDestino(
        formData.agenciaDestino,
        formData.contaDestino
      );
      if (!contaExiste) {
        erros.push("Conta destino não encontrada");
      }
    }

    // 🔧 VALIDAÇÃO DA SENHA
    if (!formData.senha.trim()) {
      erros.push("Senha é obrigatória");
    } else if (formData.senha.length !== 8) {
      erros.push("Senha deve ter exatamente 8 números");
    } else if (!/^\d{8}$/.test(formData.senha)) {
      erros.push("Senha deve conter apenas números");
    } else if (formData.senha !== cliente.senha) {
      erros.push("Senha incorreta");
    }

    return erros;
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // 🔧 VALIDA ANTES DE ENVIAR
      const erros = validarFormulario();

      if (erros.length > 0) {
        const mensagemErro = erros.map((erro) => `• ${erro}`).join("\n");

        setMensagem({
          texto: `Erros de validação:\n${mensagemErro}`,
          tipo: "error",
        });
        return;
      }

      // 🔧 SIMULAÇÃO DA TRANSFERÊNCIA
      try {
        const valorTransferencia = parseFloat(formData.valor.replace(",", "."));

        // Aqui você faria a chamada API real para a transferência
        const transferenciaSucesso = true; // Simulação

        if (transferenciaSucesso) {
          setMensagem({
            texto: `Transferência de R$ ${valorTransferencia.toFixed(
              2
            )} realizada com sucesso!`,
            tipo: "success",
          });
          setTimeout(() => {
            if (fechar) fechar();
          }, 2000);
        } else {
          setMensagem({
            texto: "Erro ao realizar transferência!",
            tipo: "error",
          });
        }
      } catch (error) {
        setMensagem({
          texto: "Erro inesperado ao processar transferência",
          tipo: "error",
        });
      }
    },
    [fechar, formData, cliente]
  );

  // 🔧 FORMATA O VALOR PARA EXIBIÇÃO
  const formatarSaldo = () => {
    return cliente.saldo.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <>
      <Container className={fechando ? "fade-out" : ""}>
        <Popup>
          <BotaoFechar onClick={handleFechar}>
            <FiX size={28} color="#fff" />
          </BotaoFechar>

          <Formulario onSubmit={handleSubmit}>
            <SaldoInfo>Saldo Disponível: {formatarSaldo()}</SaldoInfo>

            <Label>Valor da Transferência</Label>
            <InputSeguro
              placeholder="0,00"
              name="valor"
              value={formData.valor}
              onChange={handleInputChange}
            />

            <LinhaCampos>
              <div style={{ width: "100%" }}>
                <Label>Agência Destino</Label>
                <InputSeguro
                  placeholder="0000-0"
                  name="agenciaDestino"
                  value={formData.agenciaDestino}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ width: "100%" }}>
                <Label>Conta Destino</Label>
                <InputSeguro
                  placeholder="000000-0"
                  name="contaDestino"
                  value={formData.contaDestino}
                  onChange={handleInputChange}
                />
              </div>
            </LinhaCampos>

            <Label>Senha para Confirmação</Label>
            <InputSeguro
              placeholder="Digite sua senha"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleInputChange}
            />

            <BotaoEnviar type="submit">Transferir</BotaoEnviar>
          </Formulario>
        </Popup>
      </Container>

      {mensagem && (
        <PopupMensagem
          mensagem={mensagem.texto}
          tipo={mensagem.tipo}
          fechar={fecharMensagem}
          duracao={mensagem.tipo === "error" ? 5000 : 3000}
        />
      )}
    </>
  );
}
