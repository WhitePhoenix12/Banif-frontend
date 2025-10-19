import { useParams } from "react-router-dom";
import { Corpo } from "./style";
import Cabecalho from "../../components/Cabecalho";
import Rodape from "../../components/Rodape";
import { clientes } from "../../data/clientes";
import Extrato from "../../components/Extrato";

export default function Home() {
  const { email } = useParams();
  const emailDecodificado = decodeURIComponent(email);

  const cliente = clientes.find(
    (cliente) => cliente.email === emailDecodificado
  );

  return (
    <Corpo>
      <Cabecalho cliente={cliente} />
      <Extrato cliente={cliente} />
      <Rodape />
    </Corpo>
  );
}
