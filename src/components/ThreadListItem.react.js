import * as Actions from '../actions';
import React, { Alert, PropTypes, Component, View,Text, TouchableOpacity } from 'react-native';
import classNames from 'classnames';
import styles from './style';
class ThreadListItem extends Component {

  render() {
    let thread = this.props.thread;
    let lastMessage = this.props.lastMessage;

    return (
      <TouchableOpacity activeOpacity={0.85}
        onPress={this._onClick.bind(this)}>
        <View style={styles.thread}>
          <Text  style={styles.name}>{thread.threadName}</Text>
          <Text  style={styles.dateTime}>
            {lastMessage.date.toLocaleTimeString()}
          </Text>
          <Text style={styles.message}>
            {lastMessage.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  _onClick() {
    /*Alert.alert(
        '消息框标题',
        '我的消息框信息内容',
        [
          {text: '等待', onPress: () => console.log('提醒我等下再点')},
          {text: '取消', onPress: () => console.log('取消'), style: 'cancel'},
          {text: '确定', onPress: () => console.log('确定')},
        ]
    );
    */
    this.props.goToPage(1);
    this.props.clickThread(this.props.thread.id);
  }

};

ThreadListItem.propTypes = {
  thread: PropTypes.object.isRequired,
  lastMessage: PropTypes.object.isRequired,
  currentThreadID: PropTypes.string.isRequired
};

export default ThreadListItem;
