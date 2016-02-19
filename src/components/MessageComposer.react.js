import React, { PropTypes, Component, TextInput,View} from 'react-native';
import styles from './style';

let ENTER_KEY_CODE = 13;

class MessageComposer extends Component {

  constructor(props) {
    super(props);
    this.state = {text: '',placeholder:'请输入文字'};
  }

  render() {
    console.log(this.props);
    return (

      <View style={styles.messageContainer} >
      <TextInput style={styles.input}
        name="message"
        value={this.state.text}
        onChangeText={this._onChangeText.bind(this)}
        onSubmitEditing={this._onSubmitEditing.bind(this)}
        placeholder={this.state.placeholder}
      />
      </View>
    );
  }

  _onChangeText(text) {

    console.log('text:');
    console.log(text);
    this.setState({text: text});
  }
  _onSubmitEditing(event) {
    let text = this.state.text.trim();
    if (text) {
      const { threads, messages, currentThreadID } = this.props;
      this.props.postNewMessage(text, this.props.currentThreadID);
    }
    this.setState({text: ''});
  }
  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      let text = this.state.text.trim();
      if (text) {
        const { threads, messages, currentThreadID } = this.props;
        this.props.postNewMessage(text, this.props.currentThreadID);
      }
      this.setState({text: ''});
    }
  }
};

MessageComposer.propTypes = {
  //currentThreadID: PropTypes.string.isRequired
};

export default MessageComposer;
