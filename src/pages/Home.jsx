import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarProdutos, excluirProduto } from "../services/api";
import { useCarrinho } from "../hooks/useCarrinho";

const IMAGEM_PADRAO = "https://via.placeholder.com/400x300?text=Sem+Imagem";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const { removerDoCarrinho } = useCarrinho();

  async function carregar() {
    setCarregando(true);
    setErro("");
    try {
      const dados = await listarProdutos();
      setProdutos(dados);
    } catch {
      setErro("Não foi possível conectar à API. Verifique se o JSON Server está rodando.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleExcluir(id, nome) {
    const confirmou = window.confirm(`Deseja realmente excluir "${nome}"?`);
    if (!confirmou) return;

    try {
      await excluirProduto(id);
      setProdutos((atual) => atual.filter((p) => String(p.id) !== String(id)));
      removerDoCarrinho(id);
    } catch {
      alert("Erro ao excluir o produto.");
    }
  }

  if (carregando) {
    return <p className="feedback feedback--muted">Carregando produtos...</p>;
  }

  if (erro) {
    return (
      <div role="alert" className="feedback feedback--error">
        <p className="feedback__message">{erro}</p>
        <button
          onClick={carregar}
          className="button button--danger"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (produtos.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state__message">Nenhum produto cadastrado.</p>
        <Link to="/cadastro" className="button">
          Cadastrar primeiro produto
        </Link>
      </div>
    );
  }

  return (
    <section>
      <h1 className="page-title">Produtos disponíveis</h1>
      <div className="product-grid">
        {produtos.map((produto) => (
          <article key={produto.id} className="product-card">
            <div>
              <div className="product-card__media">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  onError={(e) => (e.currentTarget.src = IMAGEM_PADRAO)}
                  className="product-card__image"
                />
                {produto.estoque === 0 && (
                  <span className="stock-badge">
                    Esgotado
                  </span>
                )}
              </div>
              <h2 className="product-card__title">{produto.nome}</h2>
              <p className="product-card__price">
                R$ {Number(produto.preco).toFixed(2)}
              </p>
            </div>

            <div className="product-card__actions">
              <Link
                to={`/produto/${produto.id}`}
                className="button product-card__details"
              >
                Ver detalhes
              </Link>
              <button
                onClick={() => handleExcluir(produto.id, produto.nome)}
                className="button button--subtle-danger"
              >
                Excluir
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}