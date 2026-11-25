import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { buscarProdutoPorId } from "../services/api";
import { useCarrinho } from "../hooks/useCarrinho";

const IMAGEM_PADRAO = "https://via.placeholder.com/400x300?text=Sem+Imagem";

export default function Detalhes() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [naoEncontrado, setNaoEncontrado] = useState(false);
  const { adicionarAoCarrinho } = useCarrinho();

  async function carregar() {
    setCarregando(true);
    setErro("");
    setNaoEncontrado(false);
    try {
      const dados = await buscarProdutoPorId(id);
      if (!dados) {
        setNaoEncontrado(true);
      } else {
        setProduto(dados);
      }
    } catch {
      setErro("Erro ao buscar os detalhes do produto.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, [id]);

  if (carregando) {
    return <p className="feedback feedback--muted">Carregando detalhes...</p>;
  }

  if (erro) {
    return (
      <div role="alert" className="feedback feedback--error">
        <p className="feedback__message">{erro}</p>
        <button onClick={carregar} className="button button--danger">
          Tentar novamente
        </button>
      </div>
    );
  }

  if (naoEncontrado || !produto) {
    return (
      <div className="empty-state">
        <h1 className="page-title">Produto não encontrado</h1>
        <p className="empty-state__message">O item que você procura não existe ou foi removido.</p>
        <Link to="/" className="button">
          Voltar para a Home
        </Link>
      </div>
    );
  }

  return (
    <div className="panel product-details">
      <img
        src={produto.imagem}
        alt={produto.nome}
        onError={(e) => (e.currentTarget.src = IMAGEM_PADRAO)}
        className="product-details__image"
      />
      <div className="product-details__content">
        <div>
          <h1 className="page-title">{produto.nome}</h1>
          <p className="product-details__description">{produto.descricao}</p>
          <p className="product-details__price">
            R$ {Number(produto.preco).toFixed(2)}
          </p>
          <p className="product-details__stock">
            Estoque disponível: <strong>{produto.estoque}</strong>
          </p>
        </div>

        <div className="product-details__actions">
          <button
            onClick={() => adicionarAoCarrinho(produto)}
            disabled={produto.estoque === 0}
            className="button button--success"
          >
            {produto.estoque === 0 ? "Produto esgotado" : "Adicionar ao carrinho"}
          </button>
          <Link to="/" className="text-button text-button--center">
            Voltar para a listagem
          </Link>
        </div>
      </div>
    </div>
  );
}