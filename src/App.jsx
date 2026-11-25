import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarrinhoProvider } from "./context/CarrinhoContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Detalhes from "./pages/Detalhes";
import Carrinho from "./pages/Carrinho";
import Cadastro from "./pages/Cadastro";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <CarrinhoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="produto/:id" element={<Detalhes />} />
            <Route path="carrinho" element={<Carrinho />} />
            <Route path="cadastro" element={<Cadastro />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CarrinhoProvider>
  );
}