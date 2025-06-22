# Projeto - API de Produtos (Loja de Departamentos Franca)

API RESTful para gerenciamento completo de produtos de uma loja de departamentos, utilizando **MongoDB** como banco de dados e **Express.js** no backend. O frontend utiliza **Next.js** e **Tailwind CSS**.

---

## Funcionalidades

- **Listar todos os produtos**
- **Buscar produto por ID**
- **Buscar produto por nome**
- **Cadastrar novo produto**
- **Atualizar produto existente**
- **Deletar produto**
- **Documentação interativa via Swagger**

---

## Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- Next.js
- Tailwind CSS
- Swagger (swagger-ui-express)

---

## Como rodar o projeto localmente

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**

   Crie um arquivo `.env` na raiz do projeto e adicione sua string de conexão do MongoDB Atlas:
   ```
   MONGODB_URI=mongodb+srv://usuario:senha@cluster0.mongodb.net/loja-produtos?retryWrites=true&w=majority
   ```

4. **Popule o banco de dados (opcional)**
   ```bash
   node scripts/seed.js
   ```

5. **Inicie o servidor**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

6. **Acesse a API**
   - API: [http://localhost:3000/api/produtos](http://localhost:3000/api/produtos)
   - Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Documentação

A documentação interativa da API está disponível em `/api-docs` após rodar o projeto.

Exemplo de deploy público:  
[https://seu-link-deploy/api-docs](https://seu-link-deploy/api-docs)

---

## Estrutura de Pastas

```
├── app/                # Frontend Next.js
├── models/             # Modelos Mongoose
│   └── Produto.js
├── routes/             # Rotas Express
│   └── produtos.js
├── scripts/            # Scripts utilitários (ex: seed.js)
├── server.js           # Arquivo principal do backend
├── swagger.json        # Documentação Swagger
├── package.json
└── README.md
```

---

## Observações

- **Nunca** compartilhe sua string de conexão MongoDB publicamente.
- Para deploy, lembre-se de configurar as variáveis de ambiente no serviço de hospedagem.
- Para dúvidas, consulte a documentação no Swagger ou entre em contato.

---

##