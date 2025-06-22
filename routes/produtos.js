const express = require("express")
const router = express.Router()
const Produto = require("../models/Produto")

// GET /api/produtos - Listar todos os produtos
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.find().sort({ dataCadastro: -1 })

    res.json({
      success: true,
      message: "Produtos listados com sucesso",
      data: produtos,
      total: produtos.length,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao listar produtos",
      error: error.message,
    })
  }
})

// GET /api/produtos/:id - Buscar produto por ID
router.get("/:id", async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id)

    if (!produto) {
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado",
      })
    }

    res.json({
      success: true,
      message: "Produto encontrado",
      data: produto,
    })
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "ID do produto inválido",
      })
    }

    res.status(500).json({
      success: false,
      message: "Erro ao buscar produto",
      error: error.message,
    })
  }
})

// GET /api/produtos/nome/:nome - Buscar produto por nome
router.get("/nome/:nome", async (req, res) => {
  try {
    const produtos = await Produto.find({
      nome: { $regex: req.params.nome, $options: "i" },
    })

    if (produtos.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Nenhum produto encontrado com esse nome",
      })
    }

    res.json({
      success: true,
      message: `${produtos.length} produto(s) encontrado(s)`,
      data: produtos,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao buscar produto por nome",
      error: error.message,
    })
  }
})

// POST /api/produtos - Cadastrar novo produto
router.post("/", async (req, res) => {
  try {
    const { nome, descricao, cor, peso, tipo, preco } = req.body

    // Verificar se já existe produto com o mesmo nome
    const produtoExistente = await Produto.findOne({
      nome: { $regex: `^${nome}$`, $options: "i" },
    })

    if (produtoExistente) {
      return res.status(400).json({
        success: false,
        message: "Já existe um produto com esse nome",
      })
    }

    const novoProduto = new Produto({
      nome,
      descricao,
      cor,
      peso,
      tipo,
      preco,
    })

    const produtoSalvo = await novoProduto.save()

    res.status(201).json({
      success: true,
      message: "Produto cadastrado com sucesso",
      data: produtoSalvo,
    })
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message)
      return res.status(400).json({
        success: false,
        message: "Dados inválidos",
        errors: errors,
      })
    }

    res.status(500).json({
      success: false,
      message: "Erro ao cadastrar produto",
      error: error.message,
    })
  }
})

// PUT /api/produtos/:id - Atualizar produto existente
router.put("/:id", async (req, res) => {
  try {
    const { nome, descricao, cor, peso, tipo, preco } = req.body

    const produto = await Produto.findById(req.params.id)
    if (!produto) {
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado",
      })
    }

    // Se o nome foi alterado, verificar duplicatas
    if (nome && nome !== produto.nome) {
      const produtoExistente = await Produto.findOne({
        nome: { $regex: `^${nome}$`, $options: "i" },
        _id: { $ne: req.params.id },
      })

      if (produtoExistente) {
        return res.status(400).json({
          success: false,
          message: "Já existe outro produto com esse nome",
        })
      }
    }

    const produtoAtualizado = await Produto.findByIdAndUpdate(
      req.params.id,
      { nome, descricao, cor, peso, tipo, preco },
      { new: true, runValidators: true, omitUndefined: true },
    )

    res.json({
      success: true,
      message: "Produto atualizado com sucesso",
      data: produtoAtualizado,
    })
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "ID do produto inválido",
      })
    }

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message)
      return res.status(400).json({
        success: false,
        message: "Dados inválidos",
        errors: errors,
      })
    }

    res.status(500).json({
      success: false,
      message: "Erro ao atualizar produto",
      error: error.message,
    })
  }
})

// DELETE /api/produtos/:id - Deletar produto
router.delete("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id)

    if (!produto) {
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado",
      })
    }

    res.json({
      success: true,
      message: "Produto deletado com sucesso",
      data: produto,
    })
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "ID do produto inválido",
      })
    }

    res.status(500).json({
      success: false,
      message: "Erro ao deletar produto",
      error: error.message,
    })
  }
})

module.exports = router
