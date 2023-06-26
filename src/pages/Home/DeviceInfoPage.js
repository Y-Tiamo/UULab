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
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Layout, Sizing } from "../../common/styles";
import { NavHeader } from "../../components/navHeader.component";
import { connect } from "react-redux";
import Models from "../../models";
import I18n from "react-native-i18n";
import { DeviceStatus } from "../../container/DeviceList.container";
import { SceneMap, TabBar } from "react-native-tab-view";
import { CollapsibleHeaderTabView } from "react-native-tab-view-collapsible-header";
import CustomIndicator from "../../common/components/CustomIndicator";
import DoubleClick from "../../common/components/DoubleClick";
import { HFlatList } from "react-native-head-tab-view";
import PageEmptyComponent from "../../components/pageEmpty.component";
import { ListFooter } from "../../components/pageListFooter.component";
import { ProgressBar } from "react-native-paper";

const renderScene = SceneMap({
  state: () => <StateList index={0} />,
  fix: () => <StateList index={1} />,
  history: () => <StateList index={2} />,
});
const initialLayout = { width: Sizing.screen.width };

const DeviceInfoPage = (props) => {
  const { item } = props.navigation.state.params;
  const [routes] = React.useState([
    { key: "state", title: I18n.t("device_info_tab_status") },
    { key: "fix", title: I18n.t("device_info_tab_fix") },
    { key: "history", title: I18n.t("device_info_tab_history") },
  ]);
  const [index, setIndex] = React.useState(0);
  /*-------------------------生命周期-------------------------*/
  React.useEffect(() => {
  }, []);
  /*-------------------------API----------------------------*/
  /*-------------------------回调事件------------------------*/
  /*-------------------------事件----------------------------*/
  /*-------------------------子视图----------------------------*/
  const renderContent = () => {
    return (
      <CollapsibleHeaderTabView
        lazy={true}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderScrollHeader={() => <DeviceHeader item={item} />}
        renderTabBar={tabBarProps => (
          <TabBar
            {...tabBarProps}
            tabStyle={{ height: Sizing.adaptionSpace(48) }}
            inactiveColor={Colors.neutral.gray66}
            activeColor={Colors.theme.primary}
            indicatorContainerStyle={[{ backgroundColor: Colors.neutral.grayF5 }]}
            renderIndicator={props => <CustomIndicator {...props} />}
          />
        )}
      />
    );
  };
  /*-------------------------主视图----------------------------*/
  return (
    <SafeAreaView style={styles.container}>
      <NavHeader title={item.name} />
      <View style={styles.grayContent}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};
export const DeviceInfo = connect(state => ({
  localeEnv: state[Models.home].localeEnv,
}))(DeviceInfoPage);
export default DeviceInfo;

const DeviceHeader = (props) => {
  const { item } = props;
  const [isStop, setIsStop] = React.useState(false);
  const [isPause, setIsPause] = React.useState(false);
  const onClickPause = () => {
    setIsPause(!isPause);
  };
  const onClickStop = () => {
    setIsStop(!isStop);
  };
  let pauseColor = isStop ? "rgba(0, 224, 255, 0.5)" : "rgba(0, 224, 255, 1)";
  let stopColor = isStop ? "rgba(255, 44, 0, 0.5)" : "rgba(255, 44, 0, 1)";
  return (
    <View style={styles.headerStyle}>
      <Image source={item.pic} style={styles.picStyle} />
      <Text style={styles.typeTextStyle}>{item.type + " " + item.no}</Text>
      <Text style={styles.pnTextStyle}>{item.PN}</Text>
      <Text style={styles.roomTextStyle}>{item.room}</Text>
      <DeviceStatus item={item} />
      <View style={styles.actionContainerStyle}>
        <DoubleClick
          onPress={onClickPause}
          style={[styles.actionPauseStyle, { borderColor: pauseColor }]}>
          <Image />
          <Text
            style={[styles.pauseTextStyle, { color: pauseColor }]}>{isPause ? I18n.t("device_info_action_continue") : I18n.t("device_info_action_pause")}</Text>
        </DoubleClick>
        <DoubleClick
          onPress={onClickStop}
          style={[styles.actionStopStyle, { borderColor: stopColor }]}>
          <Image />
          <Text style={[styles.stopTextStyle, { color: stopColor }]}>{I18n.t("device_info_action_stop")}</Text>
        </DoubleClick>
      </View>
    </View>
  );
};


export const StateList = (props) => {
  const { index } = props;
  const [listData, setListData] = React.useState({
    dataList: [],
    page: 1,
    total: 0,
  });
  /*-------------------------生命周期-------------------------*/
  React.useEffect(() => {
    fetchNewData();
  }, []);
  /*-------------------------API请求-------------------------*/
  /**
   * 获取列表数据
   * @param params
   */
  const fetchData = params => {
    setListData({
      dataList: [
        {
        params: `程序名:ABC123;操作员：A1;样本数量:8;操作步骤:洗涤;当前步骤:6/10;开始时间:2023年5月17日，上午09：42;剩余时间:00:56:12`,
        },
        {
          params: `程序名:ABC123;操作员：A1;样本数量:8;操作步骤:洗涤;当前步骤:6/10;开始时间:2023年5月17日，上午09：42;剩余时间:00:56:12`,
        },
        {
          params: `程序名:ABC123;操作员：A1;样本数量:8;操作步骤:洗涤;当前步骤:6/10;开始时间:2023年5月17日，上午09：42;剩余时间:00:56:12`,
        },
      ],
      page: 1,
      total: 3,
    });
  };

  /*-------------------------事件----------------------------*/
  const fetchNewData = () => {
    fetchData({
      current: 1,
    });
  };
  const fetchMoreData = () => {
    if (listData.dataList.length >= listData.total) {
      return;
    }
    fetchData({
      current: listData.page,
    });
  };
  /*-------------------------子视图--------------------------*/
  const renderItem = ({ item }) => {
    return index === 0 ? <StateItem item={item} /> : index === 1 ? <FixItem item={item} /> : index === 2 ?
      <HistoryItem item={item} /> : <View />;
  };
  /*-------------------------主视图--------------------------*/
  return (
    <HFlatList
      index={index}
      data={listData.dataList}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<PageEmptyComponent.EmptyDeviceList />}
      renderItem={renderItem}
      onEndReachedThreshold={0.3}
      onEndReached={fetchMoreData}
      ListFooterComponent={
        <ListFooter hasMore={listData.dataList.length < listData.total} pageCount={listData.dataList.length} />
      }
    />
  );
};

const StateItem = (props) => {
  const { item } = props;
  const { params } = item;
  let info = params.split(";");
  const [isExpend, setIsExpend] = React.useState(false);
  return <View style={[styles.stateItemStyle]}>
    <Text style={styles.stateItemTitleStyle}>运行信息</Text>
    <View>
      <Text style={styles.statusTextStyle}>已暂停</Text>
      <ProgressBar progress={0.5} color={Colors.theme.primary} style={styles.progressBarStyle} />
    </View>
    {info.map((item, index) => {
        return <Text key={String(item) + index} style={styles.paramsTextStyle}>{item}</Text>;
      },
    )}
  </View>;
};

const FixItem = (props) => {
  const { item } = props;
  return <View style={[styles.stateItemStyle]}>
    <Text style={styles.stateItemTitleStyle}>喷头维护</Text>
    <Text style={styles.paramsTextStyle}>上次维护时间：2023年08月12日，上午08:09</Text>
  </View>;
};

const HistoryItem = (props) => {
  const { item } = props;
  const { params } = item;
  let info = params.split(";");
  return <View style={[styles.stateItemStyle]}>
    {info.map((item, index) => {
        return <Text key={String(item) + index} style={styles.paramsTextStyle}>{item}</Text>;
      },
    )}
    <View style={[Layout.flex.row, Layout.crossAxis.flexEnd]}>
      <Text style={{ color: Colors.theme.primary, fontSize: Sizing.t14, marginBottom: Sizing.t16 }}>查看报告</Text>
    </View>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  headerStyle: {
    ...Layout.mainAxis.center,
  },
  grayContent: {
    ...Layout.flex.full,
    backgroundColor: Colors.neutral.grayF8,
  },
  picStyle: {
    width: Sizing.adaptionSpace(154),
    height: Sizing.adaptionSpace(134),
    marginTop: Sizing.adaptionSpace(24),
    marginBottom: Sizing.adaptionSpace(20),
  },
  typeTextStyle: {
    color: Colors.neutral.gray33,
    fontSize: Sizing.t16,
    marginBottom: Sizing.t12,
  },
  pnTextStyle: {
    color: Colors.neutral.gray33,
    fontSize: Sizing.t12,
    marginBottom: Sizing.t12,
  },
  roomTextStyle: {
    color: Colors.neutral.gray33,
    fontSize: Sizing.t12,
    marginBottom: Sizing.t12,
  },
  actionContainerStyle: {
    ...Layout.flex.row,
    marginTop: Sizing.adaptionSpace(20),
    marginBottom: Sizing.t12,
  },
  actionPauseStyle: {
    ...Layout.center,
    ...Layout.flex.row,
    borderRadius: Sizing.adaptionSpace(20),
    borderWidth: 1,
    borderColor: Colors.theme.primary,
    height: Sizing.adaptionSpace(40),
    width: Sizing.adaptionSpace(106),
    marginRight: Sizing.t12,
  },
  actionStopStyle: {
    ...Layout.center,
    ...Layout.flex.row,
    borderRadius: Sizing.adaptionSpace(20),
    borderWidth: 1,
    borderColor: Colors.theme.red,
    height: Sizing.adaptionSpace(40),
    width: Sizing.adaptionSpace(106),
  },
  pauseTextStyle: {
    fontSize: Sizing.t12,
    color: Colors.theme.primary,
  },
  stopTextStyle: {
    fontSize: Sizing.t12,
    color: Colors.theme.red,
  },
  stateItemStyle: {
    ...Layout.flex.column,
    backgroundColor: Colors.neutral.white,
    borderRadius: Sizing.adaptionSpace(6),
    marginHorizontal: Sizing.t20,
    paddingHorizontal: Sizing.t16,
    paddingTop: Sizing.t20,
    marginTop: Sizing.t12,
  },
  stateItemTitleStyle: {
    fontSize: Sizing.t16,
    color: Colors.neutral.gray33,
    fontWeight: "500",
    marginBottom: Sizing.t16,
  },
  statusTextStyle: {
    fontSize: Sizing.t14,
    color: Colors.neutral.gray33,
  },
  paramsTextStyle: {
    fontSize: Sizing.t14,
    color: Colors.neutral.gray33,
    marginBottom: Sizing.t16,
  },
  progressBarStyle: {
    height: Sizing.t4,
    borderRadius: Sizing.adaptionSpace(3),
    backgroundColor: "#747474",
    marginBottom: Sizing.t16,
    marginTop: Sizing.adaptionSpace(3),
  },
});
