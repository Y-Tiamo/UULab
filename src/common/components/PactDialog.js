import React from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { Overlay } from "teaset";
import { screenW } from "../Base";
import { Colors, Layout, Sizing, Typography } from "../styles";
import DoubleClick from "./DoubleClick";

export default class PactDialog extends Overlay {
  static show(options) {
    let overlayView = (
      <Overlay.View
        style={{ justifyContent: "center", alignItems: "center" }}
        overlayOpacity={0.5}
        modal={true}
        ref={(view) => this.view = view}>
        <View
          style={styles.dialogBottomBg}>

          <Text
            style={{ fontSize: Sizing.t16, color: Colors.neutral.gray33, textAlign: "center" }}>用户协议和隐私政策</Text>

          <View style={{paddingVertical:Sizing.t20}}>
            <Text style={{ fontSize: Sizing.t14, color: Colors.neutral.gray33 }}>
              &emsp;&emsp;请你务必审慎阅读、充分理解“用户协议”和“隐私政策”各条款，包括但不限于：为了向你提供服务，我们需要收集你的设备信息、操作日志等个人信息。你可以在“设置”中查看、变更、删除个人信息并管理你的授权。
            </Text>

            <View style={[Layout.flex.row]}>
              <Text style={{ fontSize: Sizing.t14, color: Colors.neutral.gray33 }}>
                &emsp;&emsp;你可阅读
                <Text
                  style={{ fontSize: Sizing.t14, color: Colors.theme.primary }}
                  onPress={() => {
                    options.callBack && options.callBack({ status: 2 });
                    this.view && this.view.close();
                  }}>
                  《用户协议》
                </Text>

                <Text style={{ fontSize: Sizing.t14, color: Colors.neutral.gray33 }}>
                  和
                </Text>

                <Text
                  style={{ fontSize: Sizing.t14, color: Colors.theme.primary }}
                  onPress={() => {
                    options.callBack && options.callBack({ status: 3 });
                    this.view && this.view.close();
                  }}>
                  《隐私政策》

                  <Text style={{ fontSize: Sizing.t14, color: Colors.neutral.gray33 }}>
                    了解详细信息。如你同意，请点击“同意”开始接受我们的服务。
                  </Text>
                </Text>

              </Text>
            </View>
          </View>

          <View style={[Layout.flex.row, { paddingTop: Sizing.t20}]}>
            <DoubleClick
              style={[Layout.flex.full, Layout.center]}
              onPress={() => {
                options.callBack && options.callBack({ status: 4 });
                this.view && this.view.close();
              }}
            >
              <Text
                style={{
                  fontSize: Sizing.t16,
                  color: Colors.neutral.gray66,
                  fontWeight: Typography.fontWeight.medium
                }}>不同意并退出APP</Text>
            </DoubleClick>
            <View
              style={[{ height: 20, width: 1, backgroundColor: Colors.neutral.grayE1 }, Layout.center]} />
            <DoubleClick
              style={[Layout.flex.full, Layout.center]}
              onPress={() => {
                options.callBack && options.callBack({ status: 1 });
                this.view && this.view.close();
              }}
            >
              <Text
                style={{ fontSize: Sizing.t16, color: Colors.theme.primary, fontWeight: Typography.fontWeight.medium }}
                testID={"AGREE"}>已阅读并同意</Text>
            </DoubleClick>
          </View>
        </View>
      </Overlay.View>
    );
    Overlay.show(overlayView);
    return overlayView;
  }

  static showDialog(callBack = new Function()) {
    Keyboard.dismiss();
    this.show({ callBack });
  }
}
const styles = StyleSheet.create({
  dialogBottomBg: {
    backgroundColor: Colors.neutral.white,
    width: screenW - Sizing.t20,
    borderRadius: Sizing.t8,
    padding: Sizing.t20
  }
});
