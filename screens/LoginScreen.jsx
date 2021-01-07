import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Button} from 'react-native';

export default class LoginScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            pseudo: ''
        }
    }

    submitPseudo(){
        this.props.navigation.navigate('LoadingScreen', {
            pseudo: this.state.pseudo
        });
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.Text}>Welcome to our Chat</Text>
                <TextInput placeholder="Enter a pseudo" 
                placeholderTextColor='gray' style={styles.TextInput} 
                autoCorrect={false}
                value={this.state.pseudo} 
                onChangeText={pseudo => {
                    this.setState({pseudo: pseudo});
                }}
                onSubmitEditing={() => this.submitPseudo()} 
                />
                <Button title="Connect" onPress={() => { this.submitPseudo() }}/>
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
        marginBottom: 50,
        fontSize: 30
    },
    TextInput: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        borderRadius: 5,
        width: 200,
        textAlign: 'center',
        marginBottom: 20,
        color: 'white'
    },
})

// this.props.navigation.navigate('DashboardScreen);