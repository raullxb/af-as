import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="empty-state not-found">
      <h1 className="not-found__code">404</h1>
      <p className="empty-state__message">Página não encontrada.</p>
      <Link to="/" className="button">
        Voltar para a Home
      </Link>
    </div>
  );
}