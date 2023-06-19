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
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../common/styles";
import { NavHeader } from "../../components/navHeader.component";
import { connect } from "react-redux";
import Models from "../../models";
import I18n from "react-native-i18n";

const DeviceInfoPage = () => {
  /*-------------------------生命周期-------------------------*/
  React.useEffect(() => {
  }, []);
  /*-------------------------API----------------------------*/
  /*-------------------------回调事件------------------------*/
  /*-------------------------事件----------------------------*/
  const onClickConfirm = () => {
  };
  /*-------------------------子视图----------------------------*/

  /*-------------------------主视图----------------------------*/
  return (
    <SafeAreaView style={styles.container}>
      <NavHeader title={I18n.t("add_device")} />
      <ScrollView style={styles.scrollStyle}>
      </ScrollView>
    </SafeAreaView>
  );
};
export const DeviceInfo = connect(state => ({
  localeEnv: state[Models.home].localeEnv,
}))(DeviceInfoPage);
export default DeviceInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
});
