import React,  { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class MessageBubble extends Component {
    render() {
        return(
            <View style={[
                styles.message,
                this.props.mine ? styles.mine : styles.not_mine
            ]}
            >
                <Text style={{color: 'white', paddingBottom: 5, textAlign: this.props.mine ? 'right' : 'left'}}>{this.props.pseudo}</Text>
                <View style={[
                    styles.cloud,
                    {
                        backgroundColor: this.props.mine ? '#007aff' : '#dddddd'
                    }
                ]}>
                    {
                        this.props.message 
                        ?
                        <Text style={[
                            styles.text,
                            {
                                color: this.props.mine ? 'white' : 'black'
                            }
                        ]}>
                            {this.props.message}
                        </Text>
                        :
                        null
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    message: {
        flexDirection: 'column',
        marginBottom: 10
    },
    mine: {
        alignSelf: 'flex-end',
        marginRight: 20
    },
    not_mine: {
        alignSelf: 'flex-start',
        marginLeft: 20
    },
    cloud: {
        maxWidth: '40%',
        borderRadius: 10,
        padding: 10
    }
})