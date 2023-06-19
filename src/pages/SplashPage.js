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
import { Image, StatusBar, StyleSheet, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import NavigationService from "../common/NavigationService";
import { LAUNCH_SCREEN } from "../common/ImageSource";
import { Colors } from "../common/styles";

const SplashPage = () => {
  /*-------------------------生命周期----------------------------*/
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      NavigationService.reset("LoginPage");
    }, 2000);
  });
  /*-------------------------API----------------------------*/
  /*-------------------------回调事件----------------------------*/
  /*-------------------------事件----------------------------*/
  /*-------------------------子视图----------------------------*/
  /*-------------------------主视图----------------------------*/
  return (
    <View>
      <StatusBar hidden={true} />
      <Image source={LAUNCH_SCREEN} style={styles.container}/>
    </View>
  );
};
export default SplashPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
