import 'babel-polyfill';
import React, {Component} from 'react-native';
import { Provider } from 'react-redux';
import ChatApp from '../components/ChatApp.react';
import * as Actions from '../actions';
import {init} from '../service/io';
import configureStore from '../store/configureStore';

const store = configureStore();
console.log("init");
init(store);
store.dispatch(Actions.getAllMessages());
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
	       <ChatApp />
	    </Provider>);

  }
}
