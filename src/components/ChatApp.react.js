import React, { Component, PropTypes,Text,TouchableHighlight, ScrollView, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import MessageSection from './MessageSection.react';
import ThreadSection from './ThreadSection.react';
import styles from './style';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RCTNetworking from 'RCTNetworking';

let {ScrollableTabBar,DefaultTabBar} =  ScrollableTabView;

class ChatApp extends Component {
    constructor(props: any) {
        super(props);
        this.cancelled = false;
        this.state = {
            status: '',
            a: 1,
            b: 2,
        };
    }
    setCookie(domain: string) {
        var {a, b} = this.state;
        var url = `https://${domain}/cookies/set?a=${a}&b=${b}`;
        fetch(url).then((response) => {
            this.setStatus(`storage a=${a}, b=${b} set`);
        });

        this.setState({
            status: '保存数据中...',
            a: a + 1,
            b: b + 2,
        });
    }

    getCookies(domain: string) {
        fetch(`https://${domain}/cookies`).then((response) => {
            return response.json();
        }).then((data) => {
            this.setStatus(`Got cookies ${JSON.stringify(data.cookies)} from server`);
        });

        this.setStatus('Getting cookies...');
    }

    clearCookies() {
        RCTNetworking.clearCookies((cleared) => {
            console.log(cleared);
            //this.setStatus('Cookies cleared, had cookies=' + cleared);
        });
    }

    setStatus(status: string) {
        this.setState({status});
    }
  render() {
    return (
        <View style={styles.tabContainer}>
          <ScrollableTabView ref={(ref) => this.tabs = ref} initialPage={0} renderTabBar={() => <DefaultTabBar />}>
              <ScrollView tabLabel="Cookie" style={styles.tabView}>
                  <View>
                      <TouchableHighlight
                          style={styles.wrapper}
                          onPress={this.setCookie.bind(this, 'httpbin.org')}>
                          <View style={styles.button}>
                              <Text>Set cookie</Text>
                          </View>
                      </TouchableHighlight>
                      <TouchableHighlight
                          style={styles.wrapper}
                          onPress={this.setCookie.bind(this, 'eu.httpbin.org')}>
                          <View style={styles.button}>
                              <Text>Set cookie (EU)</Text>
                          </View>
                      </TouchableHighlight>
                      <TouchableHighlight
                          style={styles.wrapper}
                          onPress={this.getCookies.bind(this, 'httpbin.org')}>
                          <View style={styles.button}>
                              <Text>Get cookies</Text>
                          </View>
                      </TouchableHighlight>
                      <TouchableHighlight
                          style={styles.wrapper}
                          onPress={this.getCookies.bind(this, 'eu.httpbin.org')}>
                          <View style={styles.button}>
                              <Text>Get cookies (EU)</Text>
                          </View>
                      </TouchableHighlight>
                      <TouchableHighlight
                          style={styles.wrapper}
                          onPress={this.clearCookies.bind(this)}>
                          <View style={styles.button}>
                              <Text>Clear cookies</Text>
                          </View>
                      </TouchableHighlight>
                      <Text>{this.state.status}</Text>
                  </View>
              </ScrollView>
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
    this.tabs.goToPage(2);
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
