import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.15:3333',
});

/*
exp://192.168.1.15:19000
-> Endereço que o expo disponibiliza da máquina.
-> O celular e o computador precisam estar na mesma rede
-> Utilizando "localhost" não daria certo
-> O ip pode mudar
*/

export default api;