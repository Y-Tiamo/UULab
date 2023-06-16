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
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NumHeader } from "../../components/navHeader.component";
import { connect } from "react-redux";
import Models from "../../models";
import I18n from "react-native-i18n";

const InvitePage = () => {
  /*-------------------------生命周期----------------------------*/
  /*-------------------------API----------------------------*/
  /*-------------------------回调事件----------------------------*/
  /*-------------------------事件----------------------------*/
  /*-------------------------子视图----------------------------*/
  /*-------------------------主视图----------------------------*/
  return (
    <>
      <NumHeader title={I18n.t('title_invite')} num={"0"} />
      <SafeAreaView style={styles.container}>
      </SafeAreaView>
    </>
  );
};
export const Invite = connect(state => ({
  localeEnv: state[Models.home].localeEnv
}))(InvitePage);
export default Invite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
