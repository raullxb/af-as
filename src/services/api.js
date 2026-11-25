const API_URL = "http://localhost:3001/produtos";

export async function listarProdutos() {
  const resposta = await fetch(API_URL);
  if (!resposta.ok) throw new Error("Erro ao carregar produtos.");
  return resposta.json();
}

export async function buscarProdutoPorId(id) {
  const resposta = await fetch(`${API_URL}/${id}`);
  if (resposta.status === 404) return null;
  if (!resposta.ok) throw new Error("Erro ao buscar produto.");
  return resposta.json();
}

export async function criarProduto(produto) {
  const resposta = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  if (!resposta.ok) throw new Error("Erro ao cadastrar produto.");
  return resposta.json();
}

export async function excluirProduto(id) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!resposta.ok) throw new Error("Erro ao excluir produto.");
}