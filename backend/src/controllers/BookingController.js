//const Spot = require("../models/Spot");
//const User = require("../models/User");
const Booking = require("../models/Booking");

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date
        });

        // -- Código para popular as informações de spot e user, no lugar de apenas trazer o id
        await booking.populate("spot").populate("user").execPopulate();

        /*
        Logo após o booking (solicitação de reserva) ser feito, vamos precisar enviar uma mensagem
        em tempo real para o usuário DONO DO SPOT    
        */
        // -- Buscando conexão em tempo real com o dono do spot
        const ownerSocket = req.connectedUsers[booking.spot.user];
        //console.log('Usuário dono do Spot: ', booking.spot.user);
        //console.log('Usuário loggado:', user_id);
        //console.log('Booking', booking);
        // -- Caso existir uma conexão em tempo real
        if (ownerSocket) {
            // -- Envia uma mensagem para o usuário conectado (dono do spot)
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
};