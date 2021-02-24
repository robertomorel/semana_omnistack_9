import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { AsyncStorage, StyleSheet } from 'react-native';
import { View, SafeAreaView, Text, Image } from 'react-native';
import { ScrollView, Alert } from 'react-native';

/*
 ScrollView -> Para funcionar o rolamento de tela também na vertical 
*/

import logo from '../assets/logo.png';

import SpotList from '../components/SpotList';

export default function List() {

    const [techs, setTechs] = useState([]);

    useEffect(() => {
        // -- "AsyncStorage.getItem('user')" -> pegar usuário logado 
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.1.15:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}.`);
            });
        })
    }, []);

    /*
        Realizar uma ação assim que o usuário chega na tela
        1º Param: o que executar
        2º Param: o que ficar observando para a função execuutar. Se estiver vazio, a função executa uma só vez
    */
    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => { // -- Se eu encontrei um usuário, o valor vai para a variável 'user'
            // -- Se user existe
            if (storagedTechs) {
                const techsArray = storagedTechs.split(',').map(tech => tech.trim());
                setTechs(techsArray);
            }
        })
    }, []);

    /*
       {techs.map(tech => <SpotList tech={tech}/>)}         
       --> Estrura de repetição
          Percorrer o array de techs -> "techs.map(tech => ...)"
          Para cada tecnologia, a propriedade do SpotList tech será alimentada por cada variável tech encontrada
       --> Sempre que se usa o map (repetição), é necessária a propriedade key
          O nome da própria tech será a chave (esperando que seja única)     
    */
    return (
        <SafeAreaView style={styles.container}>

            <Image style={styles.logo} source={logo} />

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
        //justifyContent: 'center',
        //alignItems: 'center'
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        borderRadius: 2
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
});