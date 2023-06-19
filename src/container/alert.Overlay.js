/**
 * Desc：
 * Author：YYQ
 * Date: 2023/6/19
 *
 * * * * * * * * * * * * * * * * * * *
 * Content Desc:
 *
 * * * * * * * * * * * * * * * * * * *
 */
import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Colors, Layout, Sizing, Typography } from "../common/styles";
import Overlay from 'teaset/components/Overlay/Overlay';
import TextUtils from "../common/TextUtils";

class Confirm extends Overlay {
  static show(title = '', content = '', onConfirm = new Function(), textConfirm = '确定') {
    const key = (
      <Overlay.PopView style={Layout.center} modal overlayOpacity={0.5} ref={view => (this.view = view)}>
        <CustomContent
          options={{
            title,
            content,
            onConfirm,
            textConfirm,
          }}
          onClose={() => {
            this.view && this.view.close();
          }}
        />
      </Overlay.PopView>
    );
    Overlay.show(key);
    return key;
  }
}

class Custom extends Overlay {
  static show(
    title = '',
    content = '',
    onConfirm = new Function(),
    onCancel = new Function(),
    textConfirm = '确定',
    textCancel = '取消',
  ) {
    const key = (
      <Overlay.PopView style={Layout.center} modal overlayOpacity={0.5} ref={view => (this.view = view)}>
        <CustomContent
          options={{
            title,
            content,
            onConfirm,
            onCancel,
            textConfirm,
            textCancel,
          }}
          onClose={() => {
            this.view && this.view.close();
          }}
        />
      </Overlay.PopView>
    );
    Overlay.show(key);
    return key;
  }
}

const CustomContent = props => {
  const { options, onClose } = props;
  let isEmptyTitle = TextUtils.isEmptyStr(options.title);
  return (
    <View style={styles.contentStyle}>
      {!isEmptyTitle && <Text style={styles.titleStyle}>{options.title}</Text>}
      <View style={[styles.contentTextStyle, { minHeight: Sizing.adaptionSpace(isEmptyTitle ? 100 : 80) }]}>
        <Text style={[styles.textStyle]}>{options.content}</Text>
      </View>
      <View style={{ height: 1, backgroundColor: '#EBEDF0' }} />
      <View style={[styles.btnContentStyle]}>
        {options.onCancel && (
          <TouchableOpacity
            style={[styles.actionBtnStyle]}
            onPress={() => {
              options.onCancel && options.onCancel();
              onClose && onClose();
            }}
          >
            <Text style={styles.cancelTextStyle}>{options.textCancel}</Text>
          </TouchableOpacity>
        )}
        {options.onCancel && (
          <View style={{ height: Sizing.adaptionSpace(70), width: 1, backgroundColor: '#EBEDF0' }} />
        )}
        <TouchableOpacity
          style={[styles.actionBtnStyle]}
          onPress={() => {
            options.onConfirm && options.onConfirm();
            onClose && onClose();
          }}
        >
          <Text style={styles.confirmTextStyle}>{options.textConfirm}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default {
  Custom,
  Confirm,
};

const styles = StyleSheet.create({
  contentStyle: {
    width: Sizing.adaptionSpace(335),
    minHeight: Sizing.adaptionSpace(162),
    borderRadius: Sizing.t16,
    backgroundColor: Colors.neutral.white,
  },
  titleStyle: {
    color: Colors.neutral.black,
    fontSize: Sizing.t18,
    marginTop: Sizing.t15,
    fontWeight: Typography.fontWeight.medium,
    ...Typography.align.center,
  },
  contentTextStyle: {
    ...Layout.center,
    minHeight: Sizing.adaptionSpace(80),
    paddingVertical: 12,
  },
  textStyle: {
    paddingHorizontal: Sizing.t12,
    fontSize: Sizing.t20,
    color: Colors.neutral.black,
    ...Typography.align.center,
  },
  btnContentStyle: {
    ...Layout.center,
    ...Layout.flex.row,
    height: Sizing.adaptionSpace(70),
  },
  actionBtnStyle: {
    ...Layout.flex.full,
    ...Layout.center,
  },
  rightBordersStyle: {
    borderRightWidth: 1,
    borderRightColor: '#EBEDF0',
  },
  cancelTextStyle: {
    fontSize: Sizing.adaptionSpace(22),
    color: Colors.neutral.gray33,
  },
  confirmTextStyle: {
    fontSize: Sizing.adaptionSpace(22),
    color: "#FF2000",
  },
});
