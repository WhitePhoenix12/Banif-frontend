// import styled, { keyframes } from "styled-components";

// const fadeIn = keyframes`
//   from { opacity: 0; transform: scale(0.9); }
//   to { opacity: 1; transform: scale(1); }
// `;

// export const Container = styled.div`
//   display: flex;
//   position: fixed;
//   background: rgba(255, 255, 255, 0.7);
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   min-height: 88vh;
//   max-height: 88vh;
//   z-index: 15;
//   opacity: 1;
//   margin-top: 12vh;
//   transition: opacity 0.25s ease;

//   &.fade-out {
//     opacity: 0;
//   }
// `;

// export const Popup = styled.div`
//   display: flex;
//   position: relative;
//   flex-flow: column;
//   background: linear-gradient(45deg, #002f6c, #0047ab);
//   width: calc(calc(60vh + 50vw) / 2);
//   height: calc(calc(60vh + 60vw) / 2);
//   max-height: 75vh;
//   border-radius: 15px;
//   justify-content: center;
//   align-items: center;
//   padding: 20px;
//   box-shadow: 0 4px 20px rgba(0, 71, 171, 0.8);
//   animation: ${fadeIn} 0.3s ease;
// `;

// export const Formulario = styled.form`
//   display: flex;
//   flex-flow: column;
//   align-items: center;
//   gap: 10px;
//   width: 100%;
// `;

// export const Label = styled.label`
//   color: #f8f9fa;
//   font-size: calc(calc(4vw + 0.5vh) / 2);
//   font-weight: 500;
//   align-self: flex-start;
// `;

// export const Input = styled.input`
//   background-color: #f8f9fa;
//   width: 80%;
//   height: calc(calc(3vh + 4vw) / 2);
//   border: none;
//   border-radius: 50px;
//   font-size: calc(calc(2vw + 0.5vh) / 2);
//   color: #ffffff;
//   padding: 8px 15px;
//   outline: none;
//   transition: 0.3s;

//   &::placeholder {
//     color: #6c757d;
//   }

//   @media (max-width: 800px) {
//     width: 90%;
//     font-size: calc(calc(3vw + 0.5vh) / 2);
//   }
// `;

// export const LinhaEndereco = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 80%;
//   gap: 10px;

//   ${Input} {
//     width: 100%;
//   }
// `;

// export const BotaoFechar = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 15px;
//   background: none;
//   border: none;
//   cursor: pointer;
//   transition: transform 0.2s ease;

//   &:hover {
//     transform: scale(1.1);
//   }
// `;

// export const BotaoEnviar = styled.button`
//   margin-top: 15px;
//   padding: 8px 25px;
//   background: linear-gradient(45deg, #00aaff, #0047ab);
//   color: #fff;
//   font-size: calc(calc(3vw + 0.5vh) / 2);
//   font-weight: bold;
//   border: none;
//   border-radius: 50px;
//   cursor: pointer;
//   transition: transform 0.2s ease, background 0.3s ease;

//   &:hover {
//     transform: scale(1.05);
//     background: linear-gradient(45deg, #0077cc, #003c99);
//   }

//   &:active {
//     transform: scale(0.98);
//   }
// `;

import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  animation: ${fadeIn} 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  margin-bottom: 0.8rem;
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

export const Button = styled.button`
  padding: 0.7rem;
  margin-top: 1rem;
  border-radius: 6px;
  border: none;
  background-color: #0077cc;
  color: #fff;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  position: absolute;
  top: 15px;
  right: 20px;
  cursor: pointer;
`;
