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
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Overlay from "teaset/components/Overlay/Overlay";
import { Colors, Layout, Sizing, Typography } from "../common/styles";
import I18n from "react-native-i18n";
import DoubleClick from "../common/components/DoubleClick";
import NavigationService from "../common/NavigationService";

class InputDeviceAccountOverlay extends Overlay {
  static show(item) {
    const key = (
      <Overlay.PopView style={Layout.center} modal overlayOpacity={0.5} ref={view => (this.view = view)}>
        <InputContentView
          item={item}
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

const InputContentView = props => {
  const { item, onClose } = props;
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const onClickConfirm = () => {
    console.log("InputContentView_Account_Password",account,password)
    NavigationService.navigate("DeviceInfoPage",{item:item})
    onClose && onClose();
  }
  return (
    <View style={styles.contentStyle}>
      <View style={{ marginVertical: Sizing.adaptionSpace(20), justifyContent: "center" }}>
        <Text style={styles.titleStyle}>{I18n.t("local_instrument_account")}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textStyle]}
          placeholder={I18n.t('please_input_account')}
          numberOfLines={1}
          onChangeText={text => {
            setAccount(text);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textStyle]}
          placeholder={I18n.t('please_input_password')}
          numberOfLines={1}
          onChangeText={text => {
            setPassword(text);
          }}
        />
      </View>
      <View style={Layout.flex.full}/>
      <View style={[styles.btnContentStyle]}>
        <DoubleClick
          onPress={() => {
            onClose && onClose();
          }}
          style={[Layout.center, Layout.flex.full]}
        >
          <Text style={styles.cancelTextStyle}>{I18n.t("cancel")}</Text>
        </DoubleClick>
        <View style={{width:0.5,backgroundColor:Colors.neutral.grayE1,height:Sizing.adaptionSpace(69)}}/>
        <DoubleClick
          style={[Layout.center, Layout.flex.full]}
          onPress={onClickConfirm}
        >
          <Text style={styles.confirmTextStyle}>{I18n.t("confirm")}</Text>
        </DoubleClick>
      </View>
    </View>
  );
};

export default InputDeviceAccountOverlay;

const styles = StyleSheet.create({
  contentStyle: {
    width: Sizing.adaptionSpace(335),
    height: Sizing.adaptionSpace(254),
    borderRadius: Sizing.t16,
    backgroundColor: Colors.neutral.white,
  },
  titleStyle: {
    color: Colors.neutral.black,
    fontSize: Sizing.t18,
    fontWeight: Typography.fontWeight.medium,
    ...Typography.align.center,
  },
  inputContainer:{
    height: Sizing.adaptionSpace(36),
    ...Layout.crossAxis.center,
    paddingHorizontal: Sizing.t15,
    backgroundColor: "#EFEFEF",
    marginTop: Sizing.t12,
    borderRadius:Sizing.t8,
    marginHorizontal: Sizing.t20,
  },
  textStyle: {
    padding: 0,
    fontSize: Sizing.t20,
    color: Colors.neutral.black,
  },
  btnContentStyle: {
    ...Layout.center,
    ...Layout.flex.row,
    height:Sizing.adaptionSpace(70),
    marginTop: Sizing.t20,
    borderTopWidth: 0.5,
    borderColor: "#EBEDF0",
  },
  cancelTextStyle: {
    fontSize: Sizing.adaptionSpace(22),
    color: Colors.neutral.gray33,
    lineHeight:Sizing.adaptionSpace(70)
  },
  confirmTextStyle: {
    fontSize: Sizing.adaptionSpace(22),
    color: Colors.theme.primary,
  }
});
