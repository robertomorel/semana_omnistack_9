const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        
        const {booking_id} = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        booking.approved = true;

        await booking.save();

        // -- Buscar uma conexão em tempo real do usuário que está fazendo uma reserva
        const bookingUserSocket = req.connectedUsers[booking.user];

        // -- Caso existir uma conexão em tempo real do usuário que está fazendo uma reserva
        if (bookingUserSocket) {
            // -- Envia uma mensagem para o usuário conectado (resp. pela reserva)
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }

        return res.json(booking);

    }
};