const mongoose = require("mongoose")

const produtoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
      maxlength: [100, "Nome deve ter no máximo 100 caracteres"],
    },
    descricao: {
      type: String,
      required: [true, "Descrição é obrigatória"],
      trim: true,
      maxlength: [500, "Descrição deve ter no máximo 500 caracteres"],
    },
    cor: {
      type: String,
      required: [true, "Cor é obrigatória"],
      trim: true,
      maxlength: [50, "Cor deve ter no máximo 50 caracteres"],
    },
    peso: {
      type: Number,
      required: [true, "Peso é obrigatório"],
      min: [0, "Peso deve ser um valor positivo"],
    },
    tipo: {
      type: String,
      required: [true, "Tipo é obrigatório"],
      trim: true,
      maxlength: [50, "Tipo deve ter no máximo 50 caracteres"],
    },
    preco: {
      type: Number,
      required: [true, "Preço é obrigatório"],
      min: [0, "Preço deve ser um valor positivo"],
    },
    dataCadastro: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Índices para performance
produtoSchema.index({ nome: 1 })
produtoSchema.index({ tipo: 1 })

module.exports = mongoose.model("Produto", produtoSchema)
