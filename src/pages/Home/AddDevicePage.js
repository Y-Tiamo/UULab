/**
 * Desc：
 * Author：YYQ
 * Date: 2023/6/13
 *
 * * * * * * * * * * * * * * * * * * *
 * Content Desc:
 *
 * * * * * * * * * * * * * * * * * * *
 */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import I18n from "react-native-i18n";
import DoubleClick from "../../common/components/DoubleClick";
import { Colors, Layout, Sizing } from "../../common/styles";
import ActionService from "../../common/ActionService";
import { HomeHeader, NavHeader } from "../../components/navHeader.component";

const AddDevicesPage = () => {
  const [title, setTitle] = React.useState("");
  /*-------------------------生命周期----------------------------*/
  React.useRef(() => {
    setTitle(I18n.currentLocale());
  });
  /*-------------------------API----------------------------*/
  /*-------------------------回调事件----------------------------*/
  /*-------------------------事件----------------------------*/
  const onClickChangeLocalLanguage = (type) => {
    I18n.locale = type;
    ActionService.dispatch({
      type: "home/updateLocaleEnv",
      payload: { language: type },
    });
    setTitle(I18n.currentLocale());
  };
  /*-------------------------子视图----------------------------*/
  /*-------------------------主视图----------------------------*/
  return (
    <SafeAreaView style={styles.container}>
      <NavHeader title={"添加设备"}/>
    </SafeAreaView>
  );
};
export default AddDevicesPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  button: {
    ...Layout.center,
    backgroundColor: Colors.neutral.grayE1,
    flex: 1,
    marginRight: Sizing.t15,
    height: Sizing.adaptionSpace(40),
    borderRadius: Sizing.t20,
  },
});
