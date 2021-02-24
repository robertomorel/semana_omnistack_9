import React, { useState, useEffect } from 'react';

import { Image, Text, TextInput } from 'react-native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { AsyncStorage } from 'react-native';

import logo from '../assets/logo.png';

import api from '../services/api.js';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    /*
        Realizar uma ação assim que o usuário chega na tela
        1º Param: o que executar
        2º Param: o que ficar observando para a função execuutar. Se estiver vazio, a função executa uma só vez
    */

    //Descomente este código para já ser diracionado à página 'List' caso o usuário já esteja logado.
    /*
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => { // -- Se eu encontrei um usuário, o valor vai para a variável 'user'
            // -- Se user existe
            if(user){
                //console.log(user);
                // -- Navega para a rota List
                navigation.navigate('List');
            }
        })
    }, []);
    */
    
    async function handleSubmit() {
        // -- Email, Techs
        //console.log(email); // -- Mostra no console do expo
        //console.log(techs); // -- Mostra no console do expo
        const response = await api.post('/sessions', {
            email
        })

        const { _id } = response.data;

        //console.log(_id); // -- Mostra no console do expo
        // -- AsyncStorage -> salva no BD do dispositivo
        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');

    }

    return (

        /*
        KeyboardAvoidingView -> para que quando o teclado do android seja ativado, 
                                o conteúdo de tela não fique por detrás, mas
                                suba até a altura após o teclado (behavior = 'padding')
        enabled={Platform.OS == "ios" -> só executar para o OIS                        
                
        */
        <KeyboardAvoidingView behavior="padding" /*enabled={Platform.OS == "ios"}*/ style={styles.container}>

            <Image source={logo} />
            <View style={styles.form}>

                <Text style={styles.label}>SEU E-MAIL *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address" // -- Para que o teclado seja o padronizado para informar email
                    autoCapitalize="none" // -- Para não iniciar o texto com caixa alta
                    autoCorrect={false} // -- Para não corrigir o texto do email
                    value={email}
                    //onChangeText={text => setEmail(text)}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    //onChangeText={text => setEmail(text)}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar Spots</Text>
                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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