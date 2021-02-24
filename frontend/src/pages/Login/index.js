import React, { useState } from 'react';
import api from '../../services/api';

// -- 'history' é utilizado para fazer navegação 
export default function Login({ history }) {

    // -- Criando estados para a api
    // -- Conceito de estado: qlqr informação que iremos armazenar em um componente
    // -- Toda informação que iremos manipular em um componente, iremos armazenar no estado do componente
    // -- Como criar um estado na aplicação? Importando o 'useState'
    const [email, setEmail] = useState(''); // -- Retorna um vetor com udas posições

    async function handleSubmit(event) {
        // -- Para não tentar redirecionar a tela (funcionamento padrão)
        event.preventDefault();
        //console.log("---Hello World---");

        // -- Buscar o email preenchido
        //document.querySelector("input#email"); -> javascript normal
        //console.log(email);
        // -- Aguarda a finalização da chamada à api e armazena a resposta no "response"
        const response = await api.post('/sessions', { email: email });
        //console.log(response);
        const { _id } = response.data; // -- captura o elemento _id do responde

        localStorage.setItem('user', _id); // -- armazena no banco de dados do navegador

        history.push('/dashboard'); // -- Faz com que o usuário seja redirecionado à página dashboard após o submit do login

    }

    /*
    function handleEmailChange( event ){
      setEmail(event.target.value);
    }
    */

    return (
        // -- Jogar uma tag vazia no React é chamado de fragment.
        // -- Útil para englobar conteúdos HRML "irmãos"
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.
          </p>

            <form onSubmit={handleSubmit}>

                <label htmlFor="email">E-mail *</label>

                <input
                    type="email"
                    id="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                //onChange={handleEmailChange}
                />

                <button className="btn" type="submit">Entrar</button>

            </form>
        </>

    );
};