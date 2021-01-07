import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import MessageBubble from '../components/MessageBubble';

export default class ChatScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            pseudo: this.props.navigation.state.params.pseudo,
            socket: this.props.navigation.state.params.con,
            chatMessages: [],
            message: ''
        }

    }

    submitMessage() {
        if (this.state.message != '' && this.state.message != 'undefined')
        {
            let infos = [this.state.pseudo, this.state.message]
            this.state.socket.emit('chat message', infos);
            this.setState({
                message: ''
            })
        }
    }

    componentDidMount(){

        this.state.socket.on('chat message', infos => {
            this.setState({chatMessages: [...this.state.chatMessages, infos]})
        });

        this.checkcon = setInterval(() => {
            if(this.state.socket.disconnected)
            {
                clearInterval(this.checkcon);
                alert('Connexion au serveur perdue');
                this.state.socket.emit('end');
                this.props.navigation.navigate('LoginScreen');
            }
        }, 1000);
    }
    render () {

        const chatMessages = this.state.chatMessages.map(chatMessage => {
            
            if (chatMessage[0] == this.state.pseudo)
            {
                return(<MessageBubble mine pseudo={chatMessage[0]} message={chatMessage[1]}/>);
            }else
            {
                return(<MessageBubble pseudo={chatMessage[0]} message={chatMessage[1]}/>);
            }
        });
        
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: '#333', height: '90%', paddingTop: 35 }}>
                    <ScrollView ref={ref => (this.ScrollView = ref)} onContentSizeChange={() => { this.ScrollView.scrollToEnd() }}>
                        {chatMessages}
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: '#333', flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <TextInput style={styles.TextInput} placeholder="Ecrivez votre message" placeholderTextColor='gray'
                    onChangeText={(text) => { this.setState({ message: text }) }}
                    value={this.state.message}
                    onSubmitEditing={() => {this.submitMessage()}}
                    />
                    <TouchableOpacity style={ {backgroundColor: '#007aff', padding: 5, width: '20%', borderRadius: 100, alignItems: 'center', justifyContent: 'center'} } onPress={() => { this.submitMessage() }}><Text style={{color: 'white'}}>Envoyer</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    TextInput: {
        width: '75%',
        padding: 10,
        fontSize: 12,
        borderRadius: 100,
        backgroundColor: '#222',
        color: 'white',
        height: 40
    }
})