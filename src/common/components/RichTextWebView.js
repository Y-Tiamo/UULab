/**
 * desc：富文本自调节高度组件
 * author：Gaofu
 * date： 2018-03-06 13:44:33
 */
import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import WebView from 'react-native-webview';
import { BaseUrl } from "../../api/APIManager";
import TextUtils from "../TextUtils";

const normalHead =
  '<head>' +
  '<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />' +
  '<meta name="referrer" content="never">' +
  '<style>img{max-width: 100%; width:auto; height:auto;}p{margin:0;padding:0}</style>' +
  '</head>';

const ruleHead =
  '<head>' +
  '<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />' +
  '<meta name="referrer" content="never">' +
  '<style>img{max-width: 100%; width:auto; height:auto;}p{margin:0;padding:0;font-size:14;color:#894600}</style>' +
  '</head>';

export default class RichTextWebView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChangedWebview: false,
      webviewHeight: 5,
      fresh: false,
    };
  }

  static propTypes = {
    htmlData: PropTypes.string,
    baseUrl: PropTypes.string,
  };

  static defaultProps = {
    htmlData: '<body></body>',
    baseUrl: BaseUrl,
  };

  injectGetContentHightJS = () => {
    const script = 'window.ReactNativeWebView.postMessage(document.body.scrollHeight)'; // eslint-disable-line quotes
    if (this.webview) {
      this.webview.injectJavaScript(script);
    }
  };

  onGetContentHightMessage = event => {
    let webHeight = event.nativeEvent.data;
    if (!this.state.isChangedWebview) {
      if (parseInt(webHeight, 10) > 10) {
        this.setState({
          isChangedWebview: true,
          webviewHeight: parseInt(webHeight, 10),
        });
      } else {
        this.setState({
          fresh: !this.state.fresh,
        });
      }
    }
  };

  render() {
    let source;
    let head=this.props.isRule?ruleHead:normalHead
    if (!TextUtils.isNull(this.props.htmlData)) {
      if (this.props.htmlData.substr(0, 4) === 'http') {
        source = { uri: this.props.htmlData };
      } else {
        if (this.props.htmlData.substr(0, 4) === '<bod') {
          let data = '<html>' + head + this.props.htmlData + '</html>';
          source = { html: data, baseUrl: this.props.baseUrl };
        } else if (this.props.htmlData.substr(0, 4) === '<htm') {
        } else {
          let data = '<html>' + head + '<body>' + this.props.htmlData + '</body></html>';
          source = { html: data, baseUrl: this.props.baseUrl };
        }
      }
    }else {
      let data = '<html>' + head + '<body>' + '' + '</body></html>';
      source = { html: data, baseUrl: this.props.baseUrl };
    }

    return (
      <ScrollView contentContainerStyle={{ margin: 0, height: "100%" }}>
        <WebView
          ref={webview => {
            this.webview = webview;
          }}
          automaticallyAdjustContentInsets={false}
          style={{ flex: 1, height: this.state.webviewHeight,backgroundColor:"#FFFFFF" }}
          source={source}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onLoadEnd={this.injectGetContentHightJS}
          onMessage={this.onGetContentHightMessage}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          startInLoadingState={true}
          scalesPageToFit={true}
          mixedContentMode={"always"}
        />
      </ScrollView>
    );
  }
}
