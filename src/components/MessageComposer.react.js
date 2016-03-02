import React, { PropTypes, Component, TouchableOpacity, Image ,Text, TextInput,View} from 'react-native';
import styles from './style';
import {ImagePickerManager} from  'NativeModules';
import {uploadFile} from '../service/utils';

let ENTER_KEY_CODE = 13;
let options = {
  title: 'Select Avatar', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
  customButtons: {
    'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  },
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  durationLimit: 10, // video recording max time in seconds
  maxWidth: 100, // photos only
  maxHeight: 100, // photos only
  aspectX: 2, // aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
  quality: 0.2, // photos only
  angle: 0, // photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
    skipBackup: true, // image will NOT be backed up to icloud
    path: 'images' // will save image at /Documents/images rather than the root
  }
};

class MessageComposer extends Component {

  constructor(props) {
    super(props);
    this.state = {text: '',placeholder:'请输入文字',avatarSource:null,isUploading: false};
  }

  render() {
    return (
      <View style={styles.messageContainer} >
      <TextInput style={[styles.input,styles.inputNew]}
        name="message"
        value={this.state.text}
        onChangeText={this._onChangeText.bind(this)}
        onSubmitEditing={this._onSubmitEditing.bind(this)}
        placeholder={this.state.placeholder}
      />
        <Image
            style={{
            width: 60,
            height: 60,
            backgroundColor: 'transparent',
            marginRight: 10,
          }}
            source={this.state.avatarSource}
            />
        <TouchableOpacity onPress={this._onPressButton.bind(this)}>
          <Text>选择图片..</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onChangeText(text) {
    this.setState({text: text});
  }
  _onPressButton(){
    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data:
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        console.log("文件路径："+response.uri);
        // uri (on iOS)
        //const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // uri (on android)
        //const source = {uri: response.uri, isStatic: true};
        let filePath = response.uri;
        if(filePath &&filePath.length >7 && filePath.substring(0,6) != 'file://' ){
            filePath = 'file://' + filePath;
        }
        this.setState({
          avatarSource: source
        });

        var upload = uploadFile('/api/photo', filePath, {});
        upload.then(function(r){
          console.log('上传结果：'+r);
        });
        /*fetch('http://192.168.1.121:3000/file-upload', config)
            .then(function(r){

            })*/


      }
    });

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
  currentThreadID: PropTypes.string.isRequired
};

export default MessageComposer;
