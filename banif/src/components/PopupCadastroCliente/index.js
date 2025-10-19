// import { FiX } from "react-icons/fi";
// import { useState, useCallback, useEffect } from "react";
// import {
//   Container,
//   Popup,
//   Formulario,
//   Input,
//   Label,
//   LinhaEndereco,
//   BotaoFechar,
//   BotaoEnviar,
// } from "./style";
// import PopupMensagem from "../PopupMensagem";

// export default function PopupCadastroCliente({ fechar }) {
//   const [fechando, setFechando] = useState(false);
//   const [mensagem, setMensagem] = useState(null);
//   const [formData, setFormData] = useState({
//     nome: "",
//     cpf: "",
//     email: "",
//     cidade: "",
//     estado: "",
//     rua: "",
//     numero: "",
//   });

//   // 🔧 useCallback para todas as funções
//   const fecharMensagem = useCallback(() => {
//     setMensagem(null);
//   }, []);

//   const handleFechar = useCallback(() => {
//     setFechando(true);
//     setTimeout(() => {
//       if (fechar) fechar();
//     }, 250);
//   }, [fechar]);

//   // 🔧 Handler para inputs
//   const handleInputChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }, []);

//   const handleSubmit = useCallback(
//     (e) => {
//       e.preventDefault();

//       // exemplo: validação simples
//       const sucesso = true; // ou false se houver erro

//       if (sucesso) {
//         setMensagem({
//           texto: "Cliente cadastrado com sucesso!",
//           tipo: "success",
//         });
//         setTimeout(() => {
//           if (fechar) fechar();
//         }, 1500);
//       } else {
//         setMensagem({
//           texto: "Erro ao cadastrar cliente!",
//           tipo: "error",
//         });
//       }
//     },
//     [fechar]
//   );

//   // 🔧 Prevenir comportamento padrão do form
//   const handleFormSubmit = useCallback(
//     (e) => {
//       e.preventDefault();
//       handleSubmit(e);
//     },
//     [handleSubmit]
//   );

//   return (
//     <>
//       <Container className={fechando ? "fade-out" : ""}>
//         <Popup>
//           <BotaoFechar onClick={handleFechar}>
//             <FiX size={28} color="#fff" />
//           </BotaoFechar>

//           <Formulario onSubmit={handleFormSubmit}>
//             <Label>Nome</Label>
//             <Input
//               placeholder="Nome completo"
//               name="nome"
//               type="text"
//               value={formData.nome}
//               onChange={handleInputChange}
//               pattern="[A-Za-zÀ-ÿ ]+"
//               required
//             />

//             <Label>CPF</Label>
//             <Input
//               placeholder="000.000.000-00"
//               name="cpf"
//               value={formData.cpf}
//               onChange={handleInputChange}
//               pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
//               required
//             />

//             <Label>Email</Label>
//             <Input
//               placeholder="email@email.com"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />

//             <Label>Endereço</Label>
//             <LinhaEndereco>
//               <Input
//                 placeholder="Cidade"
//                 name="cidade"
//                 value={formData.cidade}
//                 onChange={handleInputChange}
//                 required
//               />
//               <Input
//                 placeholder="Estado"
//                 name="estado"
//                 value={formData.estado}
//                 onChange={handleInputChange}
//                 required
//               />
//             </LinhaEndereco>

//             <LinhaEndereco>
//               <Input
//                 placeholder="Rua"
//                 name="rua"
//                 value={formData.rua}
//                 onChange={handleInputChange}
//                 required
//               />
//               <Input
//                 placeholder="Número"
//                 name="numero"
//                 type="number"
//                 value={formData.numero}
//                 onChange={handleInputChange}
//                 required
//               />
//             </LinhaEndereco>

//             <BotaoEnviar type="submit">Enviar</BotaoEnviar>
//           </Formulario>
//         </Popup>
//       </Container>

//       {mensagem && (
//         <PopupMensagem
//           mensagem={mensagem.texto}
//           tipo={mensagem.tipo}
//           fechar={fecharMensagem}
//         />
//       )}
//     </>
//   );
// }
import React, { useState } from "react";
import { Overlay, Modal, Title, Input, Button, CloseButton } from "./style";

export default function PopupCadastroCliente({ fechar }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    cidade: "",
    estado: "",
    rua: "",
    numero: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cliente cadastrado:", form);
    fechar();
  };

  return (
    <Overlay onClick={fechar}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={fechar}>×</CloseButton>
        <Title>Cadastrar Cliente</Title>
        <form onSubmit={handleSubmit}>
          <Input
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            name="cpf"
            placeholder="CPF"
            value={form.cpf}
            onChange={handleChange}
            required
          />
          <Input
            name="cidade"
            placeholder="Cidade"
            value={form.cidade}
            onChange={handleChange}
            required
          />
          <Input
            name="estado"
            placeholder="Estado"
            value={form.estado}
            onChange={handleChange}
            required
          />
          <Input
            name="rua"
            placeholder="Rua"
            value={form.rua}
            onChange={handleChange}
            required
          />
          <Input
            name="numero"
            placeholder="Número"
            value={form.numero}
            onChange={handleChange}
            required
          />
          <Button type="submit">Cadastrar</Button>
        </form>
      </Modal>
    </Overlay>
  );
}
