import React, { Component,Text,View } from 'react-native';
import ThreadListItem from './ThreadListItem.react';
import styles from './style';

export default class ThreadSection extends Component {

  render() {
    let unreadCount = 0;
    let threadListItems = Object.keys(this.props.threads).map(id => {
      let thread = this.props.threads[id];
      let lastMessage = this.props.messages[thread.lastMessage];
      if (!lastMessage.isRead) {
        unreadCount += 1;
      }
      console.log(this.props.gotoPage);
      return (
        <ThreadListItem
          key={id}
          thread={thread}
          lastMessage={lastMessage}
          {...this.props}
        />
      );
    });

    let unread =
      unreadCount === 0 ? null : <Text>Unread threads: {unreadCount}</Text>;
    return (
      <View style={styles.threads}>
        <Text>
          {unread}
        </Text>
        <View>
          {threadListItems}
        </View>
      </View>
    );
  }

};
