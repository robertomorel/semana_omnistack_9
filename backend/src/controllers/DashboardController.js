/*
    Controller que vai definir o perfil do usuário
*/
const Spot = require("../models/Spot");

module.exports = {
    async show(req, res){
        // -- headers: contexto da requisição -> idioma, usu, autenticação...
        const { user_id } = req.headers;

        // -- Verifica se o usuário existe
        const spots = await Spot.find({ user: user_id });

        return res.json(spots);
    }
}