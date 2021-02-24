const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema({
    thumbnail: String, //-- Nome da imagem da empresa
    company: String,   //-- Empresa
    price: Number,     //-- Preço
    techs: [String],   //-- Array de tecnologias 
    user:{             //-- Usuário resp. pela criação do spot
        type: mongoose.Schema.Types.ObjectId, // -- Id gerado pelo banco
        ref: "User"                           // -- Referência do model
    }
}, {
    toJSON: {
        virtuals: true, // -- toda vez que um spot for convertido em json, será calculado os virtuals automaticamente. Os virtuals vem junto do json.
    }
});

// - Criando um campo virtual (fora do schema de dados)
SpotSchema.virtual('thumbnail_url').get(function () {

    return `http://localhost:3333/files/${this.thumbnail}`

})

// -- Exportar o model, ou seja, criando o model
module.exports = mongoose.model("Spot", SpotSchema);