/**
 * desc：导航头部
 * author：Gaofu
 * date： 2019-01-23 10:28:39
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import DoubleClick from "./DoubleClick";

const { width: D_WIDTH } = Dimensions.get('window');

export default class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.isShowLeft = false;
    this.leftIcon = null;
    this.isShowRight = false;
    this.rightIcon = null;
  }

  /**
   * @type {{
   * title : ,标题
   * titleStyle : ,标题样式
   * style : ,根布局样式
   * leftIcon : ,左侧图标
   * leftTitle : ,左侧标题
   * onPressLeft : ,点击左侧
   * leftIconStyle : ,左侧图标样式
   * leftTitleStyle : ,左侧标题样式
   * leftComponent : ,左侧自定义组件
   * rightIcon : ,右侧图标
   * rightTitle : ,右侧标题
   * onPressRight : ,点击右侧
   * rightIconStyle : ,右侧图标
   * rightTitleStyle : ,右侧标题样式
   * rightComponent : ,右侧自定义组件
   * }}
   */
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    titleStyle: PropTypes.any,
    style: PropTypes.any,

    leftIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    leftTitle: PropTypes.string,
    onPressLeft: PropTypes.func,
    leftIconStyle: PropTypes.any,
    leftTitleStyle: PropTypes.any,

    leftComponent: PropTypes.element,

    rightIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    rightTitle: PropTypes.string,
    onPressRight: PropTypes.func,
    rightIconStyle: PropTypes.any,
    rightTitleStyle: PropTypes.any,
    rightComponent: PropTypes.element
  };

  static defaultProps = {
    title: '',
    titleStyle: {},
    style: {},

    leftIcon: null,
    leftTitle: '',
    leftIconStyle: {},
    leftTitleStyle: {},
    leftComponent: null,

    rightIcon: null,
    rightTitle: '',
    rightIconStyle: {},
    rightTitleStyle: {},
    rightComponent: null
  };

  /**
   * 获取左侧图标组件
   * @returns {React.ReactInstance}
   * @private
   */
  _getLeftIcon() {
    return this.refs['_leftIcon'].getView();
  }

  /**
   * 获取右侧图标组件
   * @returns {React.ReactInstance}
   * @private
   */
  _getRightIcon() {
    return this.refs['_rightIcon'].getView();
  }

  _handleProps() {
    this.isShowLeft = this.props.leftIcon != null || this.props.leftTitle !== '' || this.props.leftComponent != null;
    if (this.props.leftIcon != null) {
      if (!React.isValidElement(this.props.leftIcon)) {
        this.leftIcon = (
          <View style={styles.iconBg}>
            <Image
              style={[styles.icon, this.props.leftIconStyle]}
              source={typeof this.props.leftIcon == 'number' ? this.props.leftIcon : { uri: this.props.leftIcon }}
            />
          </View>
        );
      } else {
        this.leftIcon = this.props.leftIcon;
      }
    }

    this.isShowRight = this.props.rightIcon || this.props.rightTitle !== '' || this.props.rightComponent != null;
    if (this.props.rightIcon != null) {
      if (!React.isValidElement(this.props.rightIcon)) {
        this.rightIcon = (
          <View style={styles.iconBg}>
            <Image
              style={[styles.icon, this.props.rightIconStyle]}
              source={typeof this.props.rightIcon == 'number' ? this.props.rightIcon : { uri: this.props.rightIcon }}
            />
          </View>
        );
      } else {
        this.rightIcon = this.props.rightIcon;
      }
    }
  }

  render() {
    this._handleProps();
    return (
      <View style={[styles.header, this.props.style]}>
        {this.isShowLeft && (
          <DoubleClick
            testID={'backToPage-' + this.props.title}
            style={styles.left}
            onPress={() => this.props.onPressLeft && this.props.onPressLeft()}
            ref="_leftIcon"
          >
            {this.leftIcon}
            {this.props.leftComponent}
            <Text style={[styles.leftTitleStyle, this.props.leftTitleStyle]}>{this.props.leftTitle}</Text>
          </DoubleClick>
        )}
        <View style={styles.center}>
          {React.isValidElement(this.props.title) ? (
            this.props.title
          ) : (
            <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
          )}
        </View>
        {this.isShowRight && (
          <DoubleClick
            test={'onPressRight'}
            style={styles.right}
            onPress={() => this.props.onPressRight && this.props.onPressRight()}
            ref="_rightIcon"
          >
            <Text style={[styles.rightTitleStyle, this.props.rightTitleStyle]}>{this.props.rightTitle}</Text>
            {this.props.rightComponent}
            {this.rightIcon}
          </DoubleClick>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: D_WIDTH,
    height: 44,
    backgroundColor: 'white',
  },
  center: {
    height: 44,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  left: {
    minWidth: 44,
    height: 44,
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999
  },
  right: {
    minWidth: 44,
    height: 44,
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999
  },

  title: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: '500'
  },
  iconBg: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  iconTitle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.87)'
  }
});
