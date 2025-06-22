const mongoose = require("mongoose")
const Product = require("../models/Product")

// Dados de exemplo para popular o banco
const produtosExemplo = [
  {
    nome: "Smartphone Samsung Galaxy S23",
    descricao: "Smartphone com tela de 6.1 polegadas, 128GB de armazenamento, câmera tripla de 50MP",
    cor: "Preto",
    peso: 168,
    tipo: "Eletrônicos",
    preco: 2499.99,
  },
  {
    nome: "Notebook Dell Inspiron 15",
    descricao: "Notebook com processador Intel i5, 8GB RAM, SSD 256GB, tela 15.6 polegadas",
    cor: "Prata",
    peso: 1800,
    tipo: "Informática",
    preco: 3299.0,
  },
  {
    nome: "Smart TV LG 55 4K",
    descricao: "Smart TV LED 55 polegadas, resolução 4K, HDR, WebOS, Wi-Fi integrado",
    cor: "Preto",
    peso: 15200,
    tipo: "Eletrônicos",
    preco: 2199.9,
  },
  {
    nome: "Fone de Ouvido Sony WH-1000XM4",
    descricao: "Fone de ouvido wireless com cancelamento de ruído ativo, bateria 30h",
    cor: "Preto",
    peso: 254,
    tipo: "Áudio",
    preco: 1299.99,
  },
  {
    nome: "Cafeteira Nespresso Essenza Mini",
    descricao: "Cafeteira automática para cápsulas, 19 bar de pressão, aquecimento rápido",
    cor: "Branco",
    peso: 2300,
    tipo: "Eletrodomésticos",
    preco: 399.9,
  },
  {
    nome: "Tênis Nike Air Max 270",
    descricao: "Tênis esportivo masculino com tecnologia Air Max, solado em borracha",
    cor: "Branco",
    peso: 380,
    tipo: "Calçados",
    preco: 599.99,
  },
  {
    nome: "Livro - Clean Code",
    descricao: "Livro sobre boas práticas de programação por Robert C. Martin",
    cor: "Azul",
    peso: 464,
    tipo: "Livros",
    preco: 89.9,
  },
  {
    nome: "Mouse Gamer Logitech G502",
    descricao: "Mouse gamer com sensor HERO 25K, 11 botões programáveis, RGB",
    cor: "Preto",
    peso: 121,
    tipo: "Informática",
    preco: 299.99,
  },
  {
    nome: "Camiseta Polo Lacoste",
    descricao: "Camiseta polo masculina em algodão piqué, manga curta, tamanho M",
    cor: "Azul Marinho",
    peso: 200,
    tipo: "Roupas",
    preco: 349.9,
  },
  {
    nome: "Panela de Pressão Tramontina 4,5L",
    descricao: "Panela de pressão em alumínio com revestimento antiaderente",
    cor: "Vermelho",
    peso: 1200,
    tipo: "Utensílios Domésticos",
    preco: 129.9,
  },
]

async function seedDatabase() {
  try {
    // Conectar ao MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/loja-produtos"
    await mongoose.connect(MONGODB_URI)

    console.log("✅ Conectado ao MongoDB")

    // Limpar dados existentes
    await Product.deleteMany({})
    console.log("🗑️ Dados antigos removidos")

    // Inserir produtos de exemplo
    const produtosCriados = await Product.insertMany(produtosExemplo)
    console.log(`✅ ${produtosCriados.length} produtos inseridos com sucesso!`)

    // Exibir produtos criados
    console.log("\n📦 Produtos criados:")
    produtosCriados.forEach((produto, index) => {
      console.log(`${index + 1}. ${produto.nome} - ${produto.precoFormatado}`)
    })

    console.log("\n🎉 Banco de dados populado com sucesso!")
  } catch (error) {
    console.error("❌ Erro ao popular banco de dados:", error)
  } finally {
    await mongoose.disconnect()
    console.log("🔌 Desconectado do MongoDB")
  }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  seedDatabase()
}

module.exports = seedDatabase
