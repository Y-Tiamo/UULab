/**
 * desc：处理重复点击
 * author：Gaofu
 * date： 2018-05-17 16:39:51
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import _ from 'lodash'

export default class DoubleClick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastPress: 0
    };
  }

  /**
   * @type {{
   * onPress : ,点击事件
   * delay : ,重复点击响应间隔
   * component : ,根组件类型
   * }}
   */
  static propTypes = {
    onPress: PropTypes.func,
    children: PropTypes.node,
    delay: PropTypes.number,
    component: PropTypes.any
  };

  static defaultProps = {
    delay: 300,
    component: TouchableOpacity
  };

  onPressHandler() {
    this.props.onPress && this.props.onPress();
  }

  /**
   * 获取当前组件
   * @returns {React.ReactInstance}
   */
  getView() {
    return this.refs.DoubleClick;
  }

  render() {
    const { component: Component, ...others } = this.props;

    return (
      <Component activeOpacity={0.8} {...others} onPress={_.throttle(()=>{this.onPressHandler()}, 500)} ref="DoubleClick">
        {this.props.children}
      </Component>
    );
  }
}
