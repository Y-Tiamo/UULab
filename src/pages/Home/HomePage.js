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
import { StyleSheet, View } from "react-native";
import { Sizing } from "../../common/styles";
import { HomeHeader } from "../../components/navHeader.component";
import { connect } from "react-redux";
import Models from "../../models";
import { SceneMap } from "react-native-tab-view";
import { DeviceList } from "../../container/DeviceList.container";
import { BLTabView } from "../../components/BLTabView.component";
import I18n from "react-native-i18n";

const HomePage = () => {
  const [groupID, setGroupID] = React.useState("123456789");
  /*-------------------------生命周期----------------------------*/
  React.useEffect(() => {
  });
  /*-------------------------数据----------------------------*/
  const routes = [
    {
      key: "all",
      title: I18n.t('device_status_all'),
    },
    {
      key: "running",
      title: I18n.t('device_status_running'),
    },
    {
      key: "waiting",
      title: I18n.t('device_status_standby'),
    },
    {
      key: "offline",
      title: I18n.t('device_status_offline'),
    },
    {
      key: "error",
      title: I18n.t('device_status_fault'),
    },
  ];
  /*-------------------------API----------------------------*/
  /*-------------------------回调事件----------------------------*/
  /*-------------------------事件----------------------------*/
  /*-------------------------子视图----------------------------*/
  const renderScene = SceneMap(
    {
      all: () => <DeviceList status={0} />,
      running: () => <DeviceList status={1} />,
      waiting: () => <DeviceList status={2} />,
      offline: () => <DeviceList status={3} />,
      error: () => <DeviceList status={4} />,
    },
  );

  /*-------------------------主视图----------------------------*/
  return (
    <View style={{ flex: 1, backgroundColor: "#F6FEFF", flexDirection: "column" }}>
      <HomeHeader title={"UULabs"} isManager={true} />
      <BLTabView
        index={0}
        routes={routes}
        renderScene={renderScene}
        tabStyle={{ width: Sizing.adaptionSpace(90)}}
        scrollEnabled={true}
      />
    </View>
  );
};
export const Home = connect(state => ({
  localeEnv: state[Models.home].localeEnv,
}))(HomePage);
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

});
