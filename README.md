# Mini Loja - E-commerce com React e JSON Server

Projeto de uma pequena loja virtual feito em React para a Avaliação Semestral (formato individual). A aplicação permite listar produtos, ver detalhes, cadastrar, excluir e gerenciar um carrinho de compras usando uma API simulada com JSON Server.

## Tecnologias usadas
- React 19 + Vite (JavaScript)
- react-router-dom
- TailwindCSS
- JSON Server (versão 1.0.0-beta.3)
- Fetch API nativo

## Como rodar o projeto
1. Instale as dependências:
   npm install

2. Em um terminal, inicie a API (JSON Server):
   npm run server

3. Em outro terminal, inicie o frontend:
   npm run dev

4. Abra o navegador no link que aparecer no terminal (normalmente http://localhost:5173).

## Estrutura de pastas e rotas
- src/components/Layout.jsx: cabeçalho fixo com menu, contador do carrinho e Outlet.
- src/context/CarrinhoContext.jsx: estado global do carrinho.
- src/hooks/useCarrinho.js: hook personalizado para usar o carrinho.
- src/services/api.js: centraliza a URL da API e as funções de fetch.
- src/pages/: páginas da aplicação.

Rotas:
- / : Home (lista de produtos)
- /produto/:id : Detalhes do produto
- /carrinho : Carrinho de compras
- /cadastro : Formulário de cadastro
- * : Página 404 (não encontrada)

## Uso do Context API
O carrinho foi criado em CarrinhoContext.jsx usando createContext e useState, e envolve o app no App.jsx. Ele guarda a lista de itens (com quantidade), o total de itens e o valor total. Possui funções para adicionar, aumentar, diminuir, remover e limpar o carrinho. Os componentes Layout, Home, Detalhes e Carrinho acessam esses dados pelo hook useCarrinho.

## Consumo da API
Todas as requisições ficam em src/services/api.js apontando para http://localhost:3001/produtos:
- GET /produtos: lista os produtos na Home.
- GET /produtos/:id: busca os detalhes de um produto (trata erro 404 se não existir).
- POST /produtos: cadastra um novo produto.
- DELETE /produtos/:id: exclui um produto.

A Home e a tela de Detalhes tratam os estados de carregamento, lista vazia e erro de conexão (com botão "Tentar novamente").

## Funcionalidades implementadas
- Listagem de produtos com selo "Esgotado" quando o estoque é 0 e imagem padrão caso a foto falhe.
- Exclusão com confirmação que também remove o item do carrinho.
- Carrinho com soma de subtotais, total geral e botão para limpar.
- Formulário de cadastro com validação (nome mínimo 3 letras, descrição obrigatória, preço maior que 0, URL com http/https e estoque inteiro >= 0). Se houver erro, mostra a mensagem abaixo do campo e foca o primeiro campo inválido com useRef.

## Decisões técnicas e dificuldades
Separei as chamadas da API em services/api.js para deixar o código mais limpo e usei String(id) nas comparações do carrinho para evitar erros de tipo do JSON Server. A maior dificuldade foi organizar os caminhos das pastas e fazer o foco automático com useRef na validação, o que resolvi mapeando uma ref para cada campo.

## Declaração de uso de IA
Usei o Gemini como apoio para organizar as pastas, tirar dúvidas sobre Context API, validação com useRef e revisar este README. Todo o código foi testado e revisado por mim.

## Capturas de tela

1. Home com listagem de produtos e item esgotado
![Home](./prints/01-home.png)

2. Home no celular (375px)
![Home mobile](./prints/02-home-mobile.png)

3. Detalhes do produto
![Detalhes](./prints/03-detalhes.png)

4. Cadastro preenchido corretamente
![Cadastro valido](./prints/04-cadastro-valido.png)

5. Cadastro com erros de validação
![Cadastro erros](./prints/05-cadastro-erros.png)

6. Confirmação de exclusão
![Excluir](./prints/06-excluir.png)

7. Carrinho com itens
![Carrinho](./prints/07-carrinho.png)

8. Erro de conexão com a API desligada
![Erro API](./prints/08-erro-api.png)

9. Página 404
![404](./prints/09-404.png)
