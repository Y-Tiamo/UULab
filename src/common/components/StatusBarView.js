import React from "react";
import PropTypes from "prop-types";
import { Dimensions, Platform, StatusBar, View } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const PAD_WIDTH = 768;
const PAD_HEIGHT = 1024;

const { width: D_WIDTH, height: D_HEIGHT } = Dimensions.get('window');

const isIPhoneX = (() => {
  return (
    (Platform.OS === 'ios' &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) || (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    (D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
    (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT)
  );
})();

const isIPad = (() => {
  if (Platform.OS !== 'ios' || isIPhoneX) return false;

  if (D_HEIGHT > D_WIDTH && D_WIDTH < PAD_WIDTH) {
    return false;
  }

  return !(D_WIDTH > D_HEIGHT && D_HEIGHT < PAD_WIDTH);
})();

const getStatusBarHeight = (() => {
  if (Platform.OS === 'ios') {
    // if (isIPhoneX) return 44;
    return isIphoneX()?0:20;
  } else if (Platform.OS === 'android') {
    if (Platform.Version > 20) return StatusBar.currentHeight;
    return 0;
  }
})();

export default class StatusBarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static isIPhoneX = isIPhoneX;
  static isIPad = isIPad;
  static getStatusBarHeight = getStatusBarHeight;

  /**
   *
   * @type {{
   * backgroundColor : ,状态栏颜色
   * translucent : ,是否透明可穿透
   * barStyle : ,状态栏样式(文字颜色)
   * isShowPicTop : ,顶部是否是图片(穿透状态栏)
   * }}
   */
  static propTypes = {
    backgroundColor: PropTypes.string,
    translucent: PropTypes.bool,
    barStyle: PropTypes.oneOf(['dark-content', 'light-content']),
    isShowPicTop: PropTypes.bool
  };

  static defaultProps = {
    backgroundColor: 'white',
    translucent: true,
    barStyle: 'dark-content',
    isShowPicTop: false
  };

  static renderFakeView = backgroundColor => {
    return (
      <View
        style={{
          backgroundColor: backgroundColor,
          // width: D_WIDTH,
          height: getStatusBarHeight
        }}
      />
    );
  };

  render() {
    let bgClr = this.props.isShowPicTop ? 'rgba(0,0,0,0)' : this.props.backgroundColor;
    let isTranslucent = this.props.isShowPicTop ? true : this.props.translucent;

    return (
      <View>
        <StatusBar
          backgroundColor={bgClr}
          barStyle={this.props.barStyle}
          translucent={!isTranslucent}
          animated={true}
          showHideTransition={'slide'}
        />
        {!this.props.isShowPicTop && StatusBarView.renderFakeView(this.props.backgroundColor)}
      </View>
    );
  }
}
