/*
    Model que será utilizado para as reservas
*/
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    date: String,
    /*
    approved: {
        type: Boolean,
        default: false
    },
    */
    approved: Boolean,
    user : {             //-- Usuário resp. pela criação do Booking
        type: mongoose.Schema.Types.ObjectId, // -- Id gerado pelo banco
        ref: "User"                           // -- Referência do model
    },
    spot : {             //-- Spot que será reservado
        type: mongoose.Schema.Types.ObjectId, // -- Id gerado pelo banco
        ref: "Spot"                           // -- Referência do model
    }
});

// -- Exportar o model, ou seja, criando o model
module.exports = mongoose.model("Booking", BookingSchema);