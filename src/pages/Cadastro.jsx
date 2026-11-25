import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarProduto } from "../services/api";

export default function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    imagem: "",
    estoque: "",
  });
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [erroApi, setErroApi] = useState("");

  const refs = {
    nome: useRef(null),
    descricao: useRef(null),
    preco: useRef(null),
    imagem: useRef(null),
    estoque: useRef(null),
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validar() {
    const novosErros = {};

    if (form.nome.trim().length < 3) {
      novosErros.nome = "O nome deve ter pelo menos 3 caracteres.";
    }
    if (!form.descricao.trim()) {
      novosErros.descricao = "A descrição é obrigatória.";
    }
    const precoNum = Number(form.preco);
    if (!form.preco || isNaN(precoNum) || precoNum <= 0) {
      novosErros.preco = "Informe um preço válido maior que zero.";
    }
    if (!/^https?:\/\/.+/.test(form.imagem.trim())) {
      novosErros.imagem = "A URL deve começar com http:// ou https://";
    }
    const estoqueNum = Number(form.estoque);
    if (
      form.estoque === "" ||
      !Number.isInteger(estoqueNum) ||
      estoqueNum < 0
    ) {
      novosErros.estoque = "O estoque deve ser um número inteiro maior ou igual a zero.";
    }

    return novosErros;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErroApi("");
    const novosErros = validar();
    setErros(novosErros);

    const primeiroInvalido = Object.keys(novosErros)[0];
    if (primeiroInvalido) {
      refs[primeiroInvalido].current?.focus();
      return;
    }

    setEnviando(true);
    try {
      await criarProduto({
        nome: form.nome.trim(),
        descricao: form.descricao.trim(),
        preco: Number(form.preco),
        imagem: form.imagem.trim(),
        estoque: Number(form.estoque),
      });
      navigate("/");
    } catch {
      setErroApi("Falha ao cadastrar produto. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="panel form-panel">
      <h1 className="page-title">Cadastrar Novo Produto</h1>

      {erroApi && (
        <div role="alert" className="feedback feedback--error">
          {erroApi}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="product-form">
        <div>
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            id="nome"
            name="nome"
            ref={refs.nome}
            value={form.nome}
            onChange={handleChange}
            className={`form-control ${erros.nome ? "form-control--error" : ""}`}
          />
          {erros.nome && <p role="alert" className="form-error">{erros.nome}</p>}
        </div>

        <div>
          <label htmlFor="descricao" className="form-label">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            ref={refs.descricao}
            value={form.descricao}
            onChange={handleChange}
            rows="3"
            className={`form-control ${erros.descricao ? "form-control--error" : ""}`}
          />
          {erros.descricao && <p role="alert" className="form-error">{erros.descricao}</p>}
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="preco" className="form-label">Preço (R$)</label>
            <input
              id="preco"
              name="preco"
              type="number"
              step="0.01"
              ref={refs.preco}
              value={form.preco}
              onChange={handleChange}
              className={`form-control ${erros.preco ? "form-control--error" : ""}`}
            />
            {erros.preco && <p role="alert" className="form-error">{erros.preco}</p>}
          </div>

          <div>
            <label htmlFor="estoque" className="form-label">Estoque</label>
            <input
              id="estoque"
              name="estoque"
              type="number"
              ref={refs.estoque}
              value={form.estoque}
              onChange={handleChange}
              className={`form-control ${erros.estoque ? "form-control--error" : ""}`}
            />
            {erros.estoque && <p role="alert" className="form-error">{erros.estoque}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="imagem" className="form-label">URL da imagem</label>
          <input
            id="imagem"
            name="imagem"
            type="url"
            ref={refs.imagem}
            value={form.imagem}
            onChange={handleChange}
            placeholder="https://..."
            className={`form-control ${erros.imagem ? "form-control--error" : ""}`}
          />
          {erros.imagem && <p role="alert" className="form-error">{erros.imagem}</p>}
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="button button--submit"
        >
          {enviando ? "Salvando..." : "Cadastrar produto"}
        </button>
      </form>
    </section>
  );
}