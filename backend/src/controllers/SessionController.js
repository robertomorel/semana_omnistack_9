/*
    Regras de negócio para controlar sessão
    Métodos padrão: index (retorna uma listagem de sessões), 
                    show  (retorna uma unica sessão), 
                    store (criar uma sessão),
                    update (atualizar uma sessão), 
                    destroy (deletar uma sessão)
*/

const User = require("../models/User");

module.exports = {
    /*
    store(req, res){
        //const email = req.body.email;
        const { email } = req.body; // -- Conceito de desestruturação do JS
        const user = User.create({email});
        return res.json(user);
    }
    */
    // -- Forma assíncrona de escrever a função acima
    // -- Escrever no banco de dados pode demorar um pouco, logo, é necessário 
    //    aguardar um sincronismo com o 'await'. Se usar 'await', tem que usar o 'async'
    async store(req, res){
        //const email = req.body.email;
        const { email } = req.body; // -- Conceito de desestruturação do JS
        
        //const user = await User.create({email});
        let user = await User.findOne({email}); // -- Garantir que o email não se repita

        if(!user){
            user = await User.create({email});
        }
        
        return res.json(user);
    }
};