import React, { Component, PropTypes,Text ,View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import MessageSection from './MessageSection.react';
import ThreadSection from './ThreadSection.react';
import styles from './style';

class ChatApp extends Component {

  render() {
    return (
      <View >
        <View style={styles.container}>
          <ThreadSection
           {... this.props}
          />
          <MessageSection
            {... this.props}
          />
        </View>

      </View>
    );
  }

};

ChatApp.propTypes = {
  threads: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  currentThreadID: PropTypes.string
};

function mapStateToProps(state) {
  return {
    threads: state.threads,
    messages: state.messages,
    currentThreadID: state.currentThreadID
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);
