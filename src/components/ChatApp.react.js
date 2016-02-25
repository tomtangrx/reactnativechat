import React, { Component, PropTypes,Text ,ScrollView, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import MessageSection from './MessageSection.react';
import ThreadSection from './ThreadSection.react';
import styles from './style';
import ScrollableTabView from 'react-native-scrollable-tab-view';
let {ScrollableTabBar,DefaultTabBar} =  ScrollableTabView;

class ChatApp extends Component {

  render() {
    return (
        <View style={styles.tabContainer}>
          <ScrollableTabView ref={(ref) => this.tabs = ref} initialPage={0} renderTabBar={() => <DefaultTabBar />}>
            <ScrollView tabLabel="聊天室" style={styles.tabView}>
              <View style={styles.card}>
                <ThreadSection
                    {... this.props}
                    goToPage={this._goToPage.bind(this)}
                    />
              </View>
            </ScrollView>
            <ScrollView tabLabel="聊天记录" style={styles.tabView}>
              <View style={styles.card}>
                <MessageSection
                    {... this.props}
                    />
              </View>
            </ScrollView>
          </ScrollableTabView>
        </View>
    );
  }
  _goToPage() {
    //console.log(this.tabs);
    this.tabs.goToPage(1);
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
