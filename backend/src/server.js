/*
Arquivo para inicializar o servidor
*/

// -- Importar o express com a dependencia externa "express"
const express = require('express');
// -- Importando o script de rotas criado
const routes = require("./routes");
// -- Biblioteca para facilitar trabalhar com os dados do banco
const mongoose = require("mongoose");
// -- Biblioteda para proteção do backend

const cors = require("cors");
const path = require("path");

// -- Importar o socket.io e o http para o servidor ouvir o protocolo websocket
const socketio = require("socket.io");
const http = require("http");

// -- Criando a aplicação instanciando o método 
const app = express(); // -- App construída com o express
// -- Extraindo o servidor http de dentro do express
const server = http.Server(app); // -- Servidor http da aplicação separado
// -- Para que o server passe a também ouvir o protocolo websocket
const io = socketio(server);

// -- Criando conexão com o banco de dados
mongoose.connect("mongodb+srv://gamedevbr:kakuya123@gamedevbr-e5nc7.mongodb.net/test?retryWrites=true&w=majority", {
    // -- Adiciona essas duas instruções no objeto para não dar erro no terminal
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/*
Não é recomendado para ambiente de produção, pois sempre que a aplicação reiniciar, os usuários serão perdidos.
Recomenda-se utilizar outro banco, específico para estes armazenamentos rápidos 
*/
const connectedUsers = {};

/*
Anotar todos os usuários logados na aplicação
socket -> informação da conexão
socket.id -> id único da conexão 
*/
io.on('connection', socket => {

    // -------------- Para teste de conexão --------------
    console.log("Usuário conectado", socket.id);

    setTimeout(() => { // -- Envia depois de 4s
        // -- Envia uma mensagem para o usuário que loggou no front
        socket.emit('message', 'Sended By Server');
    }, 5);

    socket.on('omni', data => {
        console.log(data);
    });

    console.log('Informações do Socket: ', socket.handshake.query);
    // ----------------------------------------------------

    const { user_id } = socket.handshake.query;
    // -- Criando relacionamento entre usuário e socket
    connectedUsers[user_id] = socket.id;

    //console.log('Usuário Logado: ', user_id);
    //console.log('Socket aberto: ', socket.id);

})

// -- Adicionar uma funcionalidade em toda a roda, independente do tipo (post, get, put, delete)
// -- Para que tenha acesso à determinadas variáveis 
app.use((req, res, next) => {

    // -- Deve ser chamado o 'next' para que a aplicação passe desta linha. Caso contrário parará aqui...
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();

});

// -- Params:
//    1º Rota do usuário: "/" (localhost) ou "/teste" (localhost/teste)
//    2º Função de forma reduzida, que recebe dois parâmetros
//        req: parâmetro que o usuário está enviando para a requisição
//        res: parâmetro que devolver uma resposta para a requisição

// -- Métodos: GET    | Buscar uma informação do backend
//             POST   | Criar uma nova informação do backend
//                  -> Não consegue executar no navegador, pq sempre executa o método get
//             PUT    | Editar alguma informação do backend
//             DELETE | Deletar uma informação do backend

// -- Teste 1 - Usando GET simples
/*
app.get("/HelloWorld", (req, res) => {
    //return res.send("Hello World!!");
    return res.json({message: "Hello World!"});
})
*/

// -- Teste 2 - Usando POST simples - usando o Insomnia
// -- Exemplo: http://localhost:3333/users
/*
app.post("/users", (req, res) => {
    return res.json({message: "Hello World!"});
})
*/

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)

// -- Teste 3 - Usando GET com parâmetro  - usando o Insomnia
// -- Exemplo: http://localhost:3333/users/?idade=20
/* 
app.get("/users", (req, res) => {
    return res.json({idade: req.query.idade});
})
*/

// -- Teste 4 - Usando PUT para criar ou editar elemento (parâmetro routparam)  - usando o Insomnia 
// -- Exemplo: http://localhost:3333/users/1
/*
app.put("/users/:id", (req, res) => {
    return res.json({id: req.params.id});
})
*/

// -- Teste 5 - Usando POST para criar um elemento (ex: usuário) - usando o Insomnia 
// -- Exemplo: preencher um json comum no body da requisição (deve escolher o formato json)
// -- Exemplo: {"nome": "Roberto", "email": "roberto.morel@hotmail.com"}

//app.use(cors({ origin: 'http://localhost:3333' })); // -- Apenas esse endereço pode consimir a api
app.use(cors()); // -- Qlqr aplicação pode consumir a api

app.use(express.json());
/*
app.post("/users", (req, res) => {
    return res.json(req.body);
})
*/

// -- Utilizando o express para retornar arquivos estáticos para a aplicação
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

// -- Usando as rotas no app
// -- Deve vir depois do "express.json()"; 
app.use(routes);

// -- Informando a porta da aplicação
// -- Ex.: localhost:3333
// -- app.listen(3333);
server.listen(3333); // -- A aplicação passa a ouvir requisições HTTP e Websocket