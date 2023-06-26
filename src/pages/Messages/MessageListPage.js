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

import React, {useState} from "react";
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {NavHeader, NumHeader} from "../../components/navHeader.component";
import I18n from "react-native-i18n";
import {connect} from "react-redux";
import Models from "../../models";
import {
    SOURCE_MESSAGE_CLOSE,
    SOURCE_MESSAGE_ERROR, SOURCE_MESSAGE_EXIT_GROUP,
    SOURCE_MESSAGE_FINISH,
    SOURCE_MESSAGE_FIX, SOURCE_MESSAGE_GROUP, SOURCE_MESSAGE_INSTRUMENT,
    SOURCE_MESSAGE_RUN, SOURCE_MESSAGE_STOP,
} from "../../common/ImageSource";
import {Colors, Layout, Sizing} from "../../common/styles";
import Badge from "teaset/components/Badge/Badge";
import ListRow from "teaset/components/ListRow/ListRow";
import mock from "../../models/mock";
import InputDeviceAccountOverlay from "../../container/inputDeviceLinkAccount.Overlay";
import DoubleClick from "../../common/components/DoubleClick";
import RNFlatList from "../../components/floatList.component";
import {DeviceHeader} from "../../components/pageListHeader.component";
import {EmptyDeviceList} from "../../components/pageEmpty.component";
import {DeviceStatus} from "../../container/DeviceList.container";

const MessageListPage = (props) => {
    const {item}=props.navigation.state.params
    console.log('getMessagesByType ',item)
    const MESSAGE_SORT = []
    /*-------------------------生命周期----------------------------*/
    /*-------------------------API----------------------------*/
    /*-------------------------回调事件----------------------------*/
    /*-------------------------事件----------------------------*/
    /*-------------------------子视图----------------------------*/
    /*-------------------------主视图----------------------------*/
    return (
        <>
            <NavHeader title={item.title}/>
            <SafeAreaView style={styles.container}>
                <ListContent type={item.type}/>
            </SafeAreaView>
        </>
    );
};
export const MessageList = connect(state => ({
    localeEnv: state[Models.home].localeEnv
}))(MessageListPage);
export default MessageList;

const ListContent = props => {
    const { type } = props;
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
        params.size = 10;
        params.type = type;
        mock.getMessagesByType(type).then(result => {
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

    /**
     * 列表项
     * @param item
     * @param index
     * @returns {JSX.Element}
     */
    const renderItem = (item, index) => {
        return (
            <View style={styles.itemStyle}>
                <Text style={styles.paramsTextStyle}>{`仪器名：${item.instrument_name}`}</Text>
                <Text style={styles.paramsTextStyle}>{`科室：${item.lab_name}`}</Text>
                <Text style={styles.paramsTextStyle}>{`PN：${item.pn_number}`}</Text>
                <Text style={styles.paramsTextStyle}>{`程序名称：${item.protocol_name}`}</Text>
                <Text style={styles.paramsTextStyle}>{`操作员：${item.instrument_account}`}</Text>
                <Text style={styles.paramsTextStyle}>{`故障原因：`}<Text style={{color:Colors.neutral.red}}>{item.error_code}</Text></Text>
                <Text style={styles.paramsTextStyle}>{`故障时间：${item.error_time}`}</Text>
            </View>
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
            renderItem={renderItem}
            ListEmptyComponent={<EmptyDeviceList />}
        />
    );
};

const MessageSortItem = (props) => {
    return <View/>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5"
    },
    itemContainerStyle: {
        ...Layout.flex.row,
        marginHorizontal: Sizing.t20,
        marginBottom: Sizing.t20,
        backgroundColor:Colors.neutral.grayF8
    },
    iconStyle: {
        width: Sizing.adaptionSpace(50),
        height: Sizing.adaptionSpace(50),
    },
    sortTextStyle: {
        fontSize: Sizing.t16,
        marginBottom: Sizing.t16
    },
    timeTextStyle: {
        fontSize: Sizing.t12,
        color: Colors.neutral.gray99
    },
    contentTextStyle: {
        fontSize: Sizing.t12,
        color: Colors.neutral.gray66
    },

    itemStyle: {
        ...Layout.flex.column,
        backgroundColor: Colors.neutral.white,
        borderRadius: Sizing.adaptionSpace(6),
        marginHorizontal: Sizing.t20,
        paddingHorizontal: Sizing.t16,
        paddingTop: Sizing.t20,
        marginTop: Sizing.t12,
    },
    paramsTextStyle: {
        fontSize: Sizing.t14,
        color: Colors.neutral.gray33,
        marginBottom: Sizing.t16,
    },
});
