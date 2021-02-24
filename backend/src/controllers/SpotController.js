const Spot = require("../models/Spot");
const User = require("../models/User");

module.exports = {

    // -- Método para retornar uma lista de spots por tecnologia
    async index(req, res){
        // -- Busca filtro tech informado na requisição
        const { tech } = req.query;
        // -- Filtrar array de techs pelo filtro no mongo
        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },

    async store(req, res){
        //console.log(req.body);
        //console.log(req.file);
        /*
        //Teste...
        return res.json({
            ok : true
        })      
        */ 
         
        const { filename } = req.file;
        const { company, techs, price } = req.body;
        // -- Geralmente o usuário da requisição não fica no corpo, pois é comum à todo tipo de transação
        // -- headers: contexto da requisição -> idioma, usu, autenticação...
        const { user_id } = req.headers;

        // -- Verifica se o usuário existe
        const user = await User.findById(user_id);

        if(!user){
            // -- Erro 400: problema na requisição do usuário
            return res.status(400).json({ erros: "User does not exists" });
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        })

        return res.json(spot);
        
    }

};