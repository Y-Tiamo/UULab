// @ts-ignore
import React, { useEffect, useState } from "react";
import { ListFooter } from "./pageListFooter.component";
import PageEmpty from "./pageEmpty.component";
import {View, RefreshControl, FlatList} from "react-native";
import { Layout } from "../common/styles";

const RNFlatList = props => {
  const {
    onRefresh,
    isRefreshing,
    renderItem,
    onEndReached,
    data,
    total,
    onScroll,
    onRenderTop,
    onRenderBottom,
    onRenderEmpty,
    style,
  } = props;
  const [dataList, setDataList] = useState<any>([]);

  useEffect(() => {
    setDataList(data);
  }, []);

  useEffect(() => {
    if (data.length <= total) {
      setDataList(data);
    }
  }, [data]);

  /**
   * 渲染 item
   * @param item
   */
  const onRenderItem = item => {
    return renderItem(item.item, item.index);
  };

  /**
   * 页面滚动回调
   * @param event
   */
  const onGetScrollData = event => {
    onScroll && onScroll(event);
  };

  /**
   * 渲染loading内容
   */
  const onRenderLoad = () => {
    return (
      <>
        {onRenderBottom && onRenderBottom()}
        <ListFooter hasMore={total > dataList.length} pageCount={dataList.length} />
      </>
    );
  };

  /**
   * 渲染空视图
   */
  const onRenderEmptyPage = () => {
    if (dataList.length > 0) {
      return <></>;
    }
    if (onRenderEmpty) {
      return onRenderEmpty();
    }
    return <PageEmpty.EmptyDeviceList />;
  };

  return (
    // @ts-ignore
    <View style={Layout.flex.full}>
      <FlatList
        style={style}
        data={data}
        ListHeaderComponent={onRenderTop && onRenderTop()}
        ListFooterComponent={onRenderLoad}
        ListEmptyComponent={onRenderEmptyPage}
        renderItem={onRenderItem}
        onScroll={onGetScrollData}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        nestedScrollEnabled={true}
        keyExtractor={(item, index) => String(item) + index + ""}
        /*@ts-ignore*/
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

export default RNFlatList;
