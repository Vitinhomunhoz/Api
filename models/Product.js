const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Índices para melhor performance
productSchema.index({ nome: 1 })
productSchema.index({ tipo: 1 })
productSchema.index({ preco: 1 })

// Virtual para formatação de preço
productSchema.virtual("precoFormatado").get(function () {
  return `R$ ${this.preco.toFixed(2).replace(".", ",")}`
})

// Método para busca por nome (case insensitive)
productSchema.statics.findByName = function (nome) {
  return this.find({
    nome: { $regex: nome, $options: "i" },
  })
}

module.exports = mongoose.model("Product", productSchema)
