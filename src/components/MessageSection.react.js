import React, { Component,Text, View} from 'react-native';
import MessageComposer from './MessageComposer.react';
import MessageListItem from './MessageListItem.react';
import styles from './style';
export default class MessageSection extends Component {

  componentDidMount() {
    this._scrollToBottom();
  }

  render() {
    const { threads, messages, currentThreadID } = this.props;
    const currentThread = threads[currentThreadID]
    if (currentThread) {
      let messageListItems = currentThread.messages.map((messageID) => {
        let message = messages[messageID];
        return (
          <MessageListItem
            key={messageID}
            message={message}
          />
        );
      });

      return (
        <View style={styles.messages}>
          <Text>{currentThread.threadName}</Text>
          <View ref="messageList">
            {messageListItems}
            <MessageComposer
              {...this.props}
            />
          </View>

        </View>
      );
    } else {
      return (<View style={styles.messages}><Text></Text>
      <MessageComposer
        {...this.props}
      />
      </View>);
    }
  }

  componentDidUpdate() {
    this._scrollToBottom();
  }

  _scrollToBottom() {
    let ul = this.refs.messageList;
    if (ul) {
      ul.scrollTop = ul.scrollHeight;
    }
  }

};
