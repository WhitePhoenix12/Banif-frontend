// import { useEffect, useRef, useState } from "react";
// import { FiX } from "react-icons/fi";
// import { Container, MensagemPopup, BotaoFechar } from "./style";

// export default function PopupMensagem({
//   mensagem,
//   tipo = "success",
//   fechar,
//   duracao = 3000,
// }) {
//   const fecharRef = useRef(fechar); // Mantém referência estável
//   const [visivel, setVisivel] = useState(true);

//   // Atualiza a referência se a função mudar
//   useEffect(() => {
//     fecharRef.current = fechar;
//   }, [fechar]);

//   // Fecha automaticamente depois de duracao ms
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setVisivel(false);
//     }, duracao);
//     return () => clearTimeout(timer);
//   }, [duracao]);

//   // Quando a animação de fade terminar, chama o fechar do pai
//   useEffect(() => {
//     if (!visivel) {
//       const timer = setTimeout(() => {
//         fecharRef.current?.();
//       }, 250); // corresponde à duração do fade-out no CSS
//       return () => clearTimeout(timer);
//     }
//   }, [visivel]);

//   return (
//     <Container className={!visivel ? "fade-out" : ""}>
//       <MensagemPopup tipo={tipo}>
//         {mensagem}
//         <BotaoFechar onClick={() => setVisivel(false)}>
//           <FiX size={20} color="#fff" />
//         </BotaoFechar>
//       </MensagemPopup>
//     </Container>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { Container, MensagemPopup, BotaoFechar } from "./style";

export default function PopupMensagem({
  mensagem,
  tipo = "success",
  fechar,
  duracao = 3000,
}) {
  const [visivel, setVisivel] = useState(true);
  const timerRef = useRef(null);

  // Limpa todos os timers ao desmontar
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Fecha automaticamente depois de duracao ms
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setVisivel(false);
    }, duracao);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duracao]);

  const handleFechar = () => {
    setVisivel(false);
    // Chama a função fechar do pai após a animação
    setTimeout(() => {
      fechar?.();
    }, 250);
  };

  // Fecha quando a animação terminar (apenas para auto-fechar)
  useEffect(() => {
    if (!visivel) {
      const timer = setTimeout(() => {
        fechar?.();
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [visivel, fechar]);

  return (
    <Container className={!visivel ? "fade-out" : ""}>
      <MensagemPopup tipo={tipo}>
        {mensagem}
        <BotaoFechar onClick={handleFechar}>
          <FiX size={20} color="#fff" />
        </BotaoFechar>
      </MensagemPopup>
    </Container>
  );
}
