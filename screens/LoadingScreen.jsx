import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { ThemeColors } from 'react-navigation';
import io from 'socket.io-client';

export default class LoadingScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            pseudo: this.props.navigation.state.params.pseudo
        }
    }

    componentDidMount() {
        this.socket = io('http://159.65.122.62:3000');
        setTimeout(() => {
            if (!this.socket.connected){
                alert('Connexion impossible, veuillez réessayer');
                this.props.navigation.navigate('LoginScreen');
            }
            else {
                this.props.navigation.navigate('ChatScreen', { pseudo: this.state.pseudo, con: this.socket});
            }
        }, 1500)
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.Text}>Connexion en cours en tant que {this.state.pseudo}</Text>
                <ActivityIndicator size="large" color = 'white' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Text: {
        color: 'white',
        marginBottom: 20
    }
})