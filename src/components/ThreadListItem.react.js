import * as Actions from '../actions';
import React, { PropTypes, Component, View,Text, TouchableOpacity } from 'react-native';
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
    this.props.clickThread(this.props.thread.id);
  }

};

ThreadListItem.propTypes = {
  thread: PropTypes.object.isRequired,
  lastMessage: PropTypes.object.isRequired,
  currentThreadID: PropTypes.string.isRequired
};

export default ThreadListItem;
