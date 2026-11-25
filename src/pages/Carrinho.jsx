import { Link } from "react-router-dom";
import { useCarrinho } from "../hooks/useCarrinho";

const IMAGEM_PADRAO = "https://via.placeholder.com/400x300?text=Sem+Imagem";

export default function Carrinho() {
  const {
    itens,
    aumentarQuantidade,
    diminuirQuantidade,
    removerDoCarrinho,
    limparCarrinho,
    valorTotal,
  } = useCarrinho();

  if (itens.length === 0) {
    return (
      <div className="panel empty-state">
        <h1 className="page-title">Seu carrinho está vazio</h1>
        <p className="empty-state__message">Adicione produtos na loja para vê-los aqui.</p>
        <Link to="/" className="button">
          Ir para a Home
        </Link>
      </div>
    );
  }

  return (
    <section className="panel cart-panel">
      <div className="cart-header">
        <h1 className="page-title">Carrinho de Compras</h1>
        <button
          onClick={limparCarrinho}
          className="text-button text-button--danger"
        >
          Limpar carrinho
        </button>
      </div>

      <ul className="cart-list">
        {itens.map((item) => (
          <li key={item.id} className="cart-item">
            <img
              src={item.imagem || IMAGEM_PADRAO}
              alt={item.nome}
              onError={(e) => (e.currentTarget.src = IMAGEM_PADRAO)}
              className="cart-item__image"
            />
            <div className="cart-item__info">
              <h2 className="cart-item__title">{item.nome}</h2>
              <p className="cart-item__meta">
                Unitário: R$ {Number(item.preco).toFixed(2)} | Estoque: {item.estoque}
              </p>
            </div>

            <div className="cart-item__controls">
              <button
                onClick={() => diminuirQuantidade(item.id)}
                disabled={item.quantidade <= 1}
                className="quantity-button"
                aria-label={`Diminuir quantidade de ${item.nome}`}
              >
                -
              </button>
              <span className="quantity-value">{item.quantidade}</span>
              <button
                onClick={() => aumentarQuantidade(item.id)}
                className="quantity-button"
                aria-label={`Aumentar quantidade de ${item.nome}`}
              >
                +
              </button>
              <span className="cart-item__subtotal">
                R$ {(item.preco * item.quantidade).toFixed(2)}
              </span>
              <button
                onClick={() => removerDoCarrinho(item.id)}
                className="text-button text-button--danger"
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-total">
        <span>Total geral:</span>
        <span className="cart-total__value">R$ {valorTotal.toFixed(2)}</span>
      </div>
    </section>
  );
}