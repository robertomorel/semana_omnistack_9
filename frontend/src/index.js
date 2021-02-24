import React from 'react';         // -- Biblioteca universal para construção de interface (app ou web)
import ReactDOM from 'react-dom';  // -- Lib específica para interface específica
import App from './App';

// -- Teste
//ReactDOM.render(<h1>Hello World!!!</h1>, document.getElementById('root'));

/* 
    Joga o conteúdo do componente/função App (App.js) 
    dentro da tag <div id="root"> do index.html
    Quando criamos um componente, ele vira uma tag -> "<App />"
*/    
ReactDOM.render(<App />, document.getElementById('root'));
