/**----------------------------------------------------------------*/
import React, {useState} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import RNFlatList from "../components/floatList.component";
import {Colors, Layout, Sizing} from "../common/styles";
import {EmptyDeviceList} from "../components/pageEmpty.component";
import {DeviceHeader} from "../components/pageListHeader.component";
import mock from "../models/mock";
import {
  SOURCE_INSTRUMENT_ERROR,
  SOURCE_INSTRUMENT_MAIN,
  SOURCE_INSTRUMENT_OFFLINE,
  SOURCE_INSTRUMENT_RUN,
  SOURCE_INSTRUMENT_STANDBY,
} from "../common/ImageSource";
import DoubleClick from "../common/components/DoubleClick";
import InputDeviceAccountOverlay from "./inputDeviceLinkAccount.Overlay";
import I18n from "react-native-i18n";

/**----------------------------------------------------------------*/

const DeviceList = props => {
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
    InputDeviceAccountOverlay.show(item);
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
        style={styles.itemStyle}>
        <View style={styles.itemContentStyle}>
          <View style={styles.infoContainer}>
            <Text style={styles.nameStyle}>{item.name}</Text>
            <Text style={styles.typeStyle}>{item.type + " " + item.no}</Text>
            <Text style={styles.pnStyle}>{item.PN}</Text>
          </View>
          <View style={styles.iconContainerStyle}>
            <DeviceStatus item={item}/>
            <Text style={styles.roomStyle}>{item.room}</Text>
          </View>
        </View>
        <Image source={item.pic}
               style={styles.deviceIconStyle} />
      </DoubleClick>
    );
  };

  return (
    <RNFlatList
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
      ListEmptyComponent={<EmptyDeviceList />}
    />
  );
};

export default DeviceList
export const DeviceStatus = (props) => {
  const {item}=props
  let hasFix = item.fix_status === 1;
  return (
    <View style={Layout.flex.row}>
      <DeviceStatusIcon status={item.status}/>
      {hasFix && <DeviceStatusIcon status={5} />}
    </View>
  );
}
const DeviceStatusIcon=(props)=>{
  const {status}=props
  let index=status-1
  const IconInfo=[
    {
      title:I18n.t('running'),
      icon:SOURCE_INSTRUMENT_RUN,
      backgroundColor:'rgba(60, 189, 97, 0.1)',
      color:"rgba(60, 189, 97, 1)"
    },
    {
      title:I18n.t('standby'),
      icon:SOURCE_INSTRUMENT_STANDBY,
      backgroundColor:'rgba(23, 209, 235, 0.1)',
      color:"rgba(23, 209, 235, 1)"
    },
    {
      title:I18n.t('offline'),
      icon:SOURCE_INSTRUMENT_OFFLINE,
      backgroundColor:'rgba(65, 114, 217, 0.1)',
      color:"rgba(65, 114, 217, 1)"
    },
    {
      title:I18n.t('breakdown'),
      icon:SOURCE_INSTRUMENT_ERROR,
      backgroundColor:'rgba(255, 44, 0, 0.1)',
      color:"rgba(255, 44, 0, 1)"
    },
    {
      title:I18n.t('repair'),
      icon:SOURCE_INSTRUMENT_MAIN,
      backgroundColor:'rgba(239, 147, 0, 0.1)',
      color:"rgba(239, 147, 0, 1)"
    },
  ]
  const Icon=IconInfo[index]
  return(
    <View style={[styles.statusIconContainerStyle,{backgroundColor:Icon.backgroundColor}]}>
      <Image source={Icon.icon} style={{marginRight:Sizing.t4}}/>
      <Text style={{fontSize:Sizing.t12,color:Icon.color}}>{Icon.title}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  listContent: {
    backgroundColor: Colors.neutral.grayF5,
  },
  itemStyle: {
    marginTop: Sizing.adaptionSpace(27),
    marginHorizontal: Sizing.t20,
  },
  itemContentStyle: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Sizing.adaptionSpace(6),
    paddingBottom: Sizing.t10,
  },
  infoContainer: {
    marginTop: Sizing.t20,
    marginLeft: Sizing.adaptionSpace(134),
  },
  nameStyle: {
    fontSize: Sizing.t14,
    color: Colors.neutral.gray33,
  },
  typeStyle: {
    fontSize: Sizing.t12,
    color: Colors.neutral.gray66,
    marginVertical: Sizing.t10,
  },
  pnStyle: {
    fontSize: Sizing.t12,
    color: Colors.neutral.gray66,
  },
  iconContainerStyle: {
    ...Layout.flex.row,
    ...Layout.mainAxis.center,
    marginTop: Sizing.adaptionSpace(3),
    marginLeft: Sizing.t10,
  },
  roomStyle: {
    fontSize: Sizing.t10,
    color: Colors.neutral.gray33,
  },
  deviceIconStyle: {
    position: "absolute",
    top: Sizing.adaptionSpace(-15),
    left: Sizing.adaptionSpace(-5),
  },
  statusIconContainerStyle:{
    ...Layout.center,
    ...Layout.flex.row,
    paddingHorizontal:Sizing.t12,
    paddingVertical:Sizing.adaptionSpace(3),
    borderRadius:Sizing.adaptionSpace(3),
    marginRight:Sizing.t12
  }
});
