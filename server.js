const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(express.json())

// Conexão MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/loja-produtos"

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((err) => console.error("❌ Erro MongoDB:", err))

// Importar rotas
const produtoRoutes = require("./routes/produtos")

// Usar rotas
app.use("/api/produtos", produtoRoutes)

// Documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Rota raiz
app.get("/", (req, res) => {
  res.json({
    message: "🛍️ API de Produtos - Loja de Departamentos Franca",
    version: "1.0.0",
    documentation: "/api-docs",
    endpoints: {
      "GET /api/produtos": "Listar todos os produtos",
      "GET /api/produtos/:id": "Buscar produto por ID",
      "GET /api/produtos/nome/:nome": "Buscar produto por nome",
      "POST /api/produtos": "Cadastrar novo produto",
      "PUT /api/produtos/:id": "Atualizar produto",
      "DELETE /api/produtos/:id": "Deletar produto",
    },
  })
})

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
    error: process.env.NODE_ENV === "development" ? err.message : "Algo deu errado!",
  })
})

// 404 - Rota não encontrada
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada",
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
  console.log(`📚 Documentação: http://localhost:${PORT}/api-docs`)
})

module.exports = app
