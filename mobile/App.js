import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized webSocket'
]);

/*

Diferenças entre React Native x React JS
- Não usamos o React DOM e nem as tags HTML
- React-Native importa os componentes "StyleSheet, Text, View"
    -- View -> div do HTML. Criar caixa, box, containers
    -- Text -> <h1><p><span> do HTML. Texto simples que precisa de estilização individual. 
    -- StyleSheet -> escrever os estilos, como no css.
    -- Os estilos (como o css) não são feitos por tipos de tags e/ou className, mas por 'syles', que recebem uma variável.
*/

import Routes from './src/routes';

export default function App() {
  return <Routes />
}

/*
//Exemplo...
const styles = StyleSheet.create({
  container: {
    display: 'flex', // -- Por default
    flexDirection: 'column', // -- Por default
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

    transform: [
      {rotateY: '50deg'}
    ]

  },
});
*/
