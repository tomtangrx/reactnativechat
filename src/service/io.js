//import React from 'react-native';
//window.navigator.userAgent = 'react-native';
import './userAgent'; // socket.io need 
import socket from 'socket.io-client/socket.io';
import { requestRawMessages, showCongratulation,receiveAll,createMessage,receiveCreatedMessage } from '../actions/index';

var defaultUrl;

try {
  if (location.origin) {
    //defaultUrl = location.origin;
    //defaultUrl = 'http://localhost:3000';
    defaultUrl = 'http://192.168.1.121:3000';
  } else {
    defaultUrl = location.protocol +'//'+ location.hostname + (location.port ? ':'+ location.port : '');
  }
} catch (e) {
  //defaultUrl = 'http://localhost:3000';
  defaultUrl = 'http://192.168.1.121:3000';
}
let _store;
console.log(defaultUrl);
export const io = new socket(defaultUrl,{jsonp:false});

export function init(store){
  _store = store
};

io.on('data', function received(data) {
  console.log(data);

});

io.on('allMsg', function received(data) {
  console.log(data);
  receiveAllDataFromServer(data);
});
export function  receiveAllDataFromServer(messages){
    console.log(' put(receiveAll(messages));');
    //yield* put(receiveAll(messages));
    _store.dispatch(receiveAll(messages));
};