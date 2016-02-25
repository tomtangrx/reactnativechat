import React, { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  container: {
    alignItems:'center',
    paddingTop:50,
    flexDirection:'row',
  },
  threads: {
    flex: 1,
    backgroundColor: '#262626',
    borderRadius: 5,
    padding: 5,
    flexDirection:'column',
    alignItems:'stretch',
    top: 1,
  },
  thread: {
    backgroundColor: '#FEFEFE',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  messages: {
    flex: 2,
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
    fontSize:13,
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
    fontSize:8,
    marginBottom:5,
  },
  input: {
    color: '#262626',
    fontSize:8,
    marginBottom:5,
    height: 20,
    //width: 20,
  },
  /* 测试样式是否会被后一个覆盖 */
  inputNew: {
    color: 'red',
  },
  tabContainer: {
    flex: 1,
    marginTop: 30,
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    //height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },

});
export default styles;
