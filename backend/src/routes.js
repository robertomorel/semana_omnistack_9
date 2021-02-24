const express = require("express");
const multer = require("multer");
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

// -- O roteador do express (responsável pelas rotas)
const routes = express.Router();
const upload = multer(uploadConfig);

/*
routes.post("/users", (req, res) => {
    return res.json(req.body);
})
*/
routes.post("/sessions", SessionController.store);

routes.get("/spots", SpotController.index);

//routes.post("/spots", SpotController.store);
routes.post("/spots", upload.single("thumbnail"), SpotController.store);

routes.get("/dashboard", DashboardController.show);

// -- Rota encadeada para criação de booking
routes.post("/spots/:spot_id/bookings", BookingController.store);

// -- Roda encadeada para as aprovações de Spots
routes.post("/booking/:booking_id/approvals", ApprovalController.store);

// -- Roda encadeada para as rjeições de Spots
routes.post("/booking/:booking_id/rejections", RejectionController.store);

// -- Exportar as rotas do arquivo para a aplicação
module.exports = routes;