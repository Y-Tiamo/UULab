import React from "react";
import { StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { Colors, Sizing, Typography } from "../common/styles";

export const ListFooter = props => {
  const { hasMore, pageCount } = props;
  const tip = hasMore ? "正在加载中~" : "~ 已经到底了~";
  return pageCount <= 0 ? <></> : <Text style={styles.textStyle}>{tip}</Text>;
};

ListFooter.propTypes = {
  hasMore: PropTypes.bool,
  pageCount: PropTypes.number,
};
ListFooter.defaultProps = {
  hasMore: false,
  pageCount: 0,
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: Sizing.t14,
    color: Colors.neutral.gray99,
    paddingVertical: Sizing.t12,
    ...Typography.align.center,
  },
});
