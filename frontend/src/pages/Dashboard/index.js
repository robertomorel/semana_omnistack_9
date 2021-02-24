import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';
import './styles.css';
/*
    useEffect:
       params: 
           função: executará caso alguma dependência sofrer alteração 
           array de dependências: informações que podem ser processadas na função. Caso seja vazio, a função só roda uma vez.

    useMemo:
      memorizar o valor de uma variável até que algo mude 
*/

export default function Dashboard() {

    const [requests, setRequests] = useState([]);

    const [spots, setSpots] = useState([]);

    const user_id = localStorage.getItem('user');

    /*
        Só refazer a conexão do usuário com o socket caso o user_id mude.
    */
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id },
    }), // -- Para o socket se conectar ao backend
        [user_id]);

    useEffect(() => {

        // -------------- Para teste de conexão --------------
        // -- Sempre que eu receber uma mensagem 'message' tome os dados (data) e...
        socket.on('message', data => {
            console.log(data);
        });

        setTimeout(() => { // -- Envia depois de 4s
            // -- Envia uma mensagem para o usuário que loggou no front
            socket.emit('omni', 'Sended By Client');
        }, 5);
        // ----------------------------------------------------

        socket.on('booking_request', data => {
            //console.log(data);
            setRequests([...requests, data]); // -- "...requests" para que não sobreescreva as requests anteriores...
        });

    }, [requests, socket]);

    useEffect(() => {

        async function loadSpots() {

            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            //console.log(response.data);
            setSpots(response.data);

        };

        loadSpots();

    }, []);

    async function handleAccept(id) {
        
        await api.post(`/bookings/${id}/approvals`);
        /*
            Depois da solicitação aprovada, pegar todas as minhas requisições, filtrando-as 
            removendo aquela que acabamos de aprovar.
            Estamos clocando no 'requests' apenas aqueles em que request._id !== id
        */
        setRequests(requests.filter(request => request._id !== id));
    }


    async function handleReject(id) {
        await api.post(`/bookings/${id}/approvals`);
        /*
            Depois da solicitação rejeitada, pegar todas as minhas requisições, filtrando-as 
            removendo aquela que acabamos de aprovar.
            Estamos clocando no 'requests' apenas aqueles em que request._id !== id
        */
        setRequests(requests.filter(request => request._id !== id));
    }

    return (

        <>

            <ul className='notifications'>
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>.
                        </p>
                        <button className='accept' onClick={() => handleAccept(request._id)}>ACEITAR</button>
                        <button className='reject' onClick={() => handleReject(request._id)}>REJEITAR</button>
                    </li>
                ))}
            </ul>

            <ul className='spot-list'>

                {spots.map(spot => (
                    // -- Sempre que há impressões em looping com o map, é necessário
                    // -- informar um elemento único com o "key"
                    <li key={spot._id}>

                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>

                    </li>

                ))}

            </ul>

            <Link to='/new'>
                <button className='btn'>Cadastrar Novo Spot</button>
            </Link>

        </>

    );
};