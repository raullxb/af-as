import { Link, Outlet } from "react-router-dom";
import { useCarrinho } from "../hooks/useCarrinho";

export default function Layout() {
  const { totalItens } = useCarrinho();

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="brand">
            Mini Loja
          </Link>
          <nav className="site-nav">
            <Link to="/" className="site-nav__link">
              Home
            </Link>
            <Link to="/cadastro" className="site-nav__link">
              Novo produto
            </Link>
            <Link
              to="/carrinho"
              className="button button--header"
            >
              Carrinho ({totalItens})
            </Link>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}