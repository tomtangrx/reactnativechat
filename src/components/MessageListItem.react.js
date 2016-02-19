import React, { PropTypes, Component, ListView, Text, View } from 'react-native';
import styles from './style';

class MessageListItem extends Component {

  render() {
    let {message} = this.props;
    return (
      <View style={styles.messageContainer} >
        <Text >{message.authorName}</Text>
        <Text >
          {message.date.toLocaleTimeString()}
        </Text>
        <Text>{message.text}</Text>
      </View>
    );
  }
};

MessageListItem.propTypes = {
  message: PropTypes.object
};

export default MessageListItem;
