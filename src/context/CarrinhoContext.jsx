import { createContext, useState } from "react";

export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);

  function adicionarAoCarrinho(produto) {
    setItens((atual) => {
      const existe = atual.find((item) => String(item.id) === String(produto.id));
      if (existe) {
        return atual.map((item) =>
          String(item.id) === String(produto.id)
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...atual, { ...produto, quantidade: 1 }];
    });
  }

  function aumentarQuantidade(id) {
    setItens((atual) =>
      atual.map((item) =>
        String(item.id) === String(id)
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  }

  function diminuirQuantidade(id) {
    setItens((atual) =>
      atual.map((item) =>
        String(item.id) === String(id) && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
    );
  }

  function removerDoCarrinho(id) {
    setItens((atual) => atual.filter((item) => String(item.id) !== String(id)));
  }

  function limparCarrinho() {
    setItens([]);
  }

  const totalItens = itens.reduce((soma, item) => soma + item.quantidade, 0);
  const valorTotal = itens.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarAoCarrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        removerDoCarrinho,
        limparCarrinho,
        totalItens,
        valorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
