import React, { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  container: {
    alignItems:'center',
    paddingTop:50,
  },
  threads: {
    backgroundColor: '#262626',
    borderRadius: 5,
    padding: 5,
    flexDirection:'column',
    alignItems:'stretch',
  },
  thread: {
    backgroundColor: '#FEFEFE',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  messages: {
    backgroundColor: '#262626',
    borderRadius: 5,
    padding: 5,
    flexDirection:'column',
    alignItems:'stretch',
  },
  messageContainer: {
    backgroundColor: '#FEFEFE',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  name: {
    //fontFamily: 'HeveticaNeue-Medium',
    color: '#262626',
    fontSize:18,
    marginBottom:5,
  },
  dateTime: {
    //fontFamily: 'HeveticaNeue-Light',
    color: '#AAAAAA',
    fontSize:12,
    marginBottom:5,
  },
  message: {
    //fontFamily: 'HeveticaNeue',
    color: '#262626',
    fontSize:16,
    marginBottom:5,
  },

});
export default styles;
