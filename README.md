# Catálogo Interativo Mobile com Listagem de Produtos por Categoria

Aplicativo mobile simples desenvolvido em **React Native com Expo** para a disciplina de **Mobile Development**.

O objetivo do projeto é simular um catálogo de produtos para e-commerce, onde o usuário realiza um login básico, navega por produtos organizados em categorias masculinas e femininas e visualiza os detalhes de cada item, consumindo dados de uma **API REST real**.

---

## 1. Descrição Geral do Projeto

Este aplicativo foi construído em **React Native** utilizando **Expo**, com consumo de API via **Axios** e gerenciamento de estado com **Redux Toolkit** (para armazenar temporariamente os dados do usuário logado).

O app é composto por:

- Uma **tela de login** com validação simples de campos.
- Uma **tela de listagem de produtos**, separada por abas Masculino/Feminino e subcategorias.
- Uma **tela de detalhes do produto**, que mostra mais informações sobre o item selecionado.
- Um **fluxo de logout**, que limpa os dados do usuário e volta para a tela de login.

Tudo foi desenvolvido de forma simples, com foco em cumprir exatamente os requisitos do enunciado.

---

## 2. Funcionalidades Implementadas

### 2.1 Tela de Login

- Campos:
  - **Nome**
  - **E-mail**
- Comportamento:
  - Validação: não permite login com campos vazios.
  - Em caso de erro, exibe um alerta informando que é necessário preencher todos os campos.
  - Em caso de sucesso:
    - Simula o login do usuário.
    - Armazena o nome e o e-mail de forma temporária utilizando **Redux Toolkit**.
    - Navega para a tela de **lista de produtos**.

### 2.2 Tela de Lista de Produtos com Tabs

- Organização em duas abas principais:
  - **Masculino**
  - **Feminino**

- Subcategorias exatas da API DummyJSON:

  - **Masculino**:
    - `mens-shirts`
    - `mens-shoes`
    - `mens-watches`

  - **Feminino**:
    - `womens-bags`
    - `womens-dresses`
    - `womens-jewellery`
    - `womens-shoes`
    - `womens-watches`

- Consumo de dados:
  - Utiliza Axios para buscar produtos na rota:
    - `https://dummyjson.com/products/category/{categoria}`
  - Quando o usuário troca a subcategoria, o app faz uma nova requisição e atualiza a lista.

- Lista de produtos:
  - Cada item exibe:
    - Nome do produto
    - Preço
    - Percentual de desconto
    - Imagem miniatura (thumbnail)
  - Ao tocar em um produto, o app navega para a **tela de detalhes**, passando o **ID** do item.

- Tratamento de estados:
  - **Carregando**: indicador de atividade enquanto a API responde.
  - **Erro**: mensagem simples em caso de falha na requisição.

### 2.3 Tela de Detalhes do Produto

- Navegação:
  - Recebe o **ID** do produto pela navegação a partir da lista.

- Consumo de dados:
  - Faz requisição à rota:
    - `https://dummyjson.com/products/{id}`
  - Utiliza Axios para buscar as informações completas do produto.

- Informações exibidas:
  - Imagem em destaque
  - Nome do produto
  - Descrição
  - Preço (formatado)
  - Percentual de desconto

- Tratamento de estados:
  - **Carregando**: indicador enquanto busca os dados.
  - **Erro**: mensagem em caso de falha ao carregar o produto.
  - Verificação para o caso em que nenhum produto é retornado.

### 2.4 Logout

- Local:
  - Botão **“Sair”** na parte superior da tela de lista de produtos.

- Comportamento:
  - Limpa os dados do usuário armazenados no **Redux Toolkit**.
  - Navega de volta para a **tela de login**, encerrando a sessão atual.

---

## 3. Tecnologias Utilizadas

- **React Native (Expo)**
- **Expo CLI**
- **Axios** (consumo de API REST)
- **Redux Toolkit** (estado global simples de autenticação)
- **React Redux**
- **React Navigation** (stack navigator)
- **JavaScript**

---

## 4. Estrutura de Pastas

```text
projeto mobile fecaf/
  App.js
  package.json
  babel.config.js
  app.json
  src/
    navigation/
      AppNavigator.js
    services/
      api.js
    store/
      index.js
      authSlice.js
    screens/
      LoginScreen.js
      ProductListScreen.js
      ProductDetailsScreen.js
    components/
      ProductItem.js
```

### 4.1 `navigation/AppNavigator.js`

- Configura o **stack navigator** com as telas:
  - `Login`
  - `Products` (lista de produtos)
  - `ProductDetails` (detalhes do produto)
- Define a tela de **Login** como rota inicial.

### 4.2 `services/api.js`

- Cria uma instância Axios com `baseURL` `https://dummyjson.com`.
- Funções:
  - `getProductsByCategory(category)` → busca lista de produtos por categoria.
  - `getProductById(id)` → busca detalhes de um único produto.

### 4.3 `store/` (Redux Toolkit)

- `authSlice.js`:
  - Estado:
    - `isAuthenticated`
    - `user` (nome e e-mail)
  - Actions:
    - `login(payload)` → marca como autenticado e armazena dados do usuário.
    - `logout()` → limpa dados e marca como não autenticado.
- `index.js`:
  - Configura a store com o `authReducer`.
  - Exporta hooks práticos `useAppDispatch` e `useAppSelector`.

### 4.4 `screens/`

- `LoginScreen.js`:
  - Formulário com campos de nome e e-mail.
  - Validação simples dos campos.
  - Dispatch de `login()` em caso de sucesso.
  - Navegação para `Products`.

- `ProductListScreen.js`:
  - Controle de aba **Masculino/Feminino**.
  - Controle de subcategorias específicas para cada aba.
  - Chamada de `getProductsByCategory()` sempre que a categoria muda.
  - Exibição da lista de produtos usando `FlatList`.
  - Botão de logout que dispara `logout()` e volta para `Login`.

- `ProductDetailsScreen.js`:
  - Recebe `id` via `route.params`.
  - Chama `getProductById(id)` para buscar os detalhes.
  - Exibe imagem, nome, descrição, preço e desconto.
  - Trata estados de carregamento, erro e ausência de produto.

### 4.5 `components/ProductItem.js`

- Componente de card de produto.
- Recebe via props:
  - `title`
  - `price`
  - `thumbnail`
  - `discountPercentage`
  - `onPress`
- Usado pela `ProductListScreen` dentro da `FlatList`.

---

## 5. Como Executar o Projeto

1. **Clonar o repositório**

   ```bash
   git clone https://github.com/SEU_USUARIO/projeto-fecaf-mobile.git
   ```

2. **Entrar na pasta do projeto**

   ```bash
   cd "projeto mobile fecaf"
   ```

3. **Instalar dependências**

   ```bash
   npm install
   ```

4. **Executar com Expo**

   ```bash
   npx expo start
   ```

5. **Testar o app**

   - Escanear o QR Code com o aplicativo **Expo Go** no celular, **ou**
   - Rodar em um emulador Android/iOS, **ou**
   - Rodar em modo web (quando suportado) com:

     ```bash
     npx expo start --web
     ```

---

## 6. PDFs e Material de Entrega

- **Parte Teórica – Reflexão Contextual**  
  - PDF com texto de 10–15 linhas sobre:
    - importância de apps móveis para e-commerce,
    - desafios de consumir APIs REST com React Native,
    - relação entre o projeto e os conteúdos vistos em aula.

- **PDF de Prints das Telas (máx. 2 páginas)**  
  - Prints da:
    - Tela de Login,
    - Tela de Lista – aba Masculino,
    - Tela de Lista – aba Feminino,
    - Tela de Detalhes do Produto,
    - (Opcional) Tela com botão de Logout.
  - Cada print com uma breve explicação da funcionalidade exibida.

Ambos os PDFs podem ser adicionados ao repositório (por exemplo, em uma pasta `docs/`) e também enviados na plataforma indicada pelo professor, junto com o link do GitHub.

---

