const mongoose = require("mongoose")
const Produto = require("../models/Produto")

const produtosExemplo = [
  {
    nome: "Smartphone Samsung Galaxy S23",
    descricao: "Smartphone com tela de 6.1 polegadas, 128GB de armazenamento",
    cor: "Preto",
    peso: 168,
    tipo: "Eletrônicos",
    preco: 2499.99,
  },
  {
    nome: "Notebook Dell Inspiron 15",
    descricao: "Notebook com Intel i5, 8GB RAM, SSD 256GB",
    cor: "Prata",
    peso: 1800,
    tipo: "Informática",
    preco: 3299.0,
  },
  {
    nome: "Smart TV LG 55 4K",
    descricao: "Smart TV LED 55 polegadas, resolução 4K, HDR",
    cor: "Preto",
    peso: 15200,
    tipo: "Eletrônicos",
    preco: 2199.9,
  },
  {
    nome: "Fone Sony WH-1000XM4",
    descricao: "Fone wireless com cancelamento de ruído",
    cor: "Preto",
    peso: 254,
    tipo: "Áudio",
    preco: 1299.99,
  },
  {
    nome: "Cafeteira Nespresso",
    descricao: "Cafeteira automática para cápsulas",
    cor: "Branco",
    peso: 2300,
    tipo: "Eletrodomésticos",
    preco: 399.9,
  },
]

async function seedDatabase() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://vitaokibao:vPpqh3TaGKwy1izd@cluster0.jr5rxkf.mongodb.net/loja-produtos?retryWrites=true&w=majority&appName=Cluster0"
    await mongoose.connect(MONGODB_URI)

    console.log("✅ Conectado ao MongoDB")

    // Limpar dados existentes
    await Produto.deleteMany({})
    console.log("🗑️ Dados antigos removidos")

    // Inserir produtos de exemplo
    const produtos = await Produto.insertMany(produtosExemplo)
    console.log(`✅ ${produtos.length} produtos inseridos!`)

    console.log("\n📦 Produtos criados:")
    produtos.forEach((produto, index) => {
      console.log(`${index + 1}. ${produto.nome} - R$ ${produto.preco}`)
    })
  } catch (error) {
    console.error("❌ Erro:", error)
  } finally {
    await mongoose.disconnect()
    console.log("🔌 Desconectado do MongoDB")
  }
}

if (require.main === module) {
  seedDatabase()
}

module.exports = seedDatabase
