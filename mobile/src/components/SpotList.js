import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import api from '../services/api';

/* 
 FlatList -> Componente feito pra lista
 TouchableOpacity -> para o botão 
*/

function SpotList({ tech, navigation }) {

    const [spots, setSpots] = useState([]);

    useEffect(() => {

        async function loadSpots() {

            const response = await api.get('/spots', {
                params: { tech }
            })

            //console.log(response.data);
            setSpots(response.data);

        }

        loadSpots();

    }, []);

    // -- Irá navegar o usuário para a tela Book
    function handleNavigate(id) {
        navigation.navigate('Book', { id });
    }

    return (

        <View style={styles.container}>

            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>

            <FlatList
                style={styles.list} // -- Estilo
                data={spots} // -- Array onde estão as informações
                keyExtractor={spot => spot._id} // -- Função que recebe o item do spot e devolve ql info é única
                horizontal // -- Lista horizontal
                showsHorizontalScrollIndicator={false} // -- Não queremos que mostre a barra de rolagem
                renderItem={({ item }) => ( // -- Como irá se comportar para mostrar cada um dos spots {item}. Será uma função.

                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar Reserva</Text>
                        </TouchableOpacity>
                    </View>

                )}
            />

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        marginTop: 30
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },

    bold: {
        fontWeight: 'bold'
    },

    list: {
        paddingHorizontal: 20
    },

    listItem: {
        marginRight: 15
    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },

    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        borderRadius: 2,
        marginTop: 15
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    },

});

/*
 O SpotList não é uma página da aplicação, como o Login, List e Book, então ele não
 tem acesso ao 'nativation'. Para solucionar, importar o 'withNavigation' do react-navigation
 e exportar a função dessa forma abaixo. 
 Antes estava lá em cima desta forma: "export default function SpotList({ tech, navigation }) {...}"
*/
export default withNavigation(SpotList);