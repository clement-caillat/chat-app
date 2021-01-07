import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoadingScreen from './screens/LoadingScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    )
  };
}

const AppSwitchNavigator = createSwitchNavigator({
  LoginScreen: LoginScreen,
  LoadingScreen: LoadingScreen,
  ChatScreen: ChatScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator);