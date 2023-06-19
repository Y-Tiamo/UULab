/**----------------------------------------------------------------*/
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import FlatList from "../components/floatList.component";
import { Colors, Layout, Sizing } from "../common/styles";
import PageEmpty from "../components/pageEmpty.component";
import { DeviceHeader } from "../components/pageListHeader.component";
import mock from "../models/mock";
import {
  SOURCE_DEVICE_ERROR,
  SOURCE_DEVICE_OFFLINE,
  SOURCE_DEVICE_RUNNING,
  SOURCE_DEVICE_SAVE,
  SOURCE_DEVICE_WAITING,
} from "../common/ImageSource";
import DoubleClick from "../common/components/DoubleClick";
import InputDeviceAccountOverlay from "./inputDeviceLinkAccount.Overlay";
import I18n from "react-native-i18n";

/**----------------------------------------------------------------*/

export const DeviceList = props => {
  const { status } = props;
  const [listData, setListData] = useState({
    dataList: [],
    page: 1,
    total: 0,
  });
  const [isRefreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    onFetchNewData();
  }, []);

  /**
   * 获取数据
   */
  const getData = params => {
    params.size = 100;
    params.status = status;
    mock.getDeviceByType(status).then(result => {
      setRefreshing(false);
      fetDataSuccess(result, params);
    });

  };

  function fetDataSuccess(result, params) {
    const { data } = result;
    let newList = [];
    if (params.current !== 1) {
      newList = listData.dataList;
    }
    setListData({
      dataList: newList.concat(data.data),
      page: params.current + 1,
      total: data.total,
    });
  }

  /**
   * 上拉加载
   */
  const onFetchMoreData = () => {
    if (listData.dataList.length >= listData.total) {
      return;
    }
    setRefreshing(true);
    getData({
      current: listData.page,
    });
  };
  /**
   * 下拉刷新
   */
  const onFetchNewData = () => {
    setRefreshing(true);
    getData({
      current: 1,
    });
  };

  const onClickItem = (item) => {
    InputDeviceAccountOverlay.show(I18n.t("local_device_account"), "", () => {
    }, I18n.t("confirm"));
  };

  /**
   * 列表项
   * @param item
   * @param index
   * @returns {JSX.Element}
   */
  const renderItem = (item, index) => {
    return (
      <DoubleClick
        onPress={() => {
          onClickItem(item);
        }}
        key={String(item) + index}
        style={{ marginTop: Sizing.adaptionSpace(27), marginHorizontal: Sizing.t20 }}>
        <View style={{
          backgroundColor: Colors.neutral.white,
          borderRadius: Sizing.adaptionSpace(6),
          paddingBottom: Sizing.t10,
        }}>
          <View style={{ marginTop: Sizing.t20, marginLeft: Sizing.adaptionSpace(134) }}>
            <Text style={{ fontSize: Sizing.t14, color: Colors.neutral.gray33 }}>{item.name}</Text>
            <Text style={{
              fontSize: Sizing.t12,
              color: Colors.neutral.gray66,
              marginVertical: Sizing.t10,
            }}>{item.type + " " + item.no}</Text>
            <Text style={{ fontSize: Sizing.t12, color: Colors.neutral.gray66 }}>{item.PN}</Text>
          </View>
          <View style={[Layout.flex.row, Layout.mainAxis.center, {
            marginTop: Sizing.adaptionSpace(3),
            marginLeft: Sizing.t10,
          }]}>
            {renderDeviceStatus(item)}
            <Text style={{ fontSize: Sizing.t10, color: Colors.neutral.gray33 }}>{item.room}</Text>
          </View>
        </View>
        <Image source={item.pic}
               style={{ position: "absolute", top: Sizing.adaptionSpace(-15), left: Sizing.adaptionSpace(-5) }} />
      </DoubleClick>
    );
  };

  function renderDeviceStatus(item) {
    let ICON_SOURCE = item.status === 1 ? SOURCE_DEVICE_RUNNING : item.status === 2 ? SOURCE_DEVICE_WAITING : item.status === 3 ? SOURCE_DEVICE_OFFLINE : item.status === 4 ? SOURCE_DEVICE_ERROR : "";
    let hasFix = item.fix_status === 1;
    return (
      <View style={Layout.flex.row}>
        <Image source={ICON_SOURCE} style={{ marginRight: Sizing.t12 }} />
        {hasFix && <Image source={SOURCE_DEVICE_SAVE} style={{ marginRight: Sizing.t12 }} />}
      </View>
    );
  }

  return (
    <FlatList
      style={styles.listContent}
      data={listData.dataList}
      total={listData.total}
      isRefreshing={isRefreshing}
      onEndReached={onFetchMoreData}
      onRefresh={onFetchNewData}
      onRenderTop={() => {
        return <DeviceHeader />;
      }}
      renderItem={renderItem}
      ListEmptyComponent={<PageEmpty.EmptyCollectList />}
    />
  );
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  listContent: {
    backgroundColor: Colors.neutral.grayF5,
  },
});
