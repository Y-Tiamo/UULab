/**
 * Desc：
 * Author：YYQ
 * Date: 2023/6/27
 *
 * * * * * * * * * * * * * * * * * * *
 * Content Desc:
 *
 * * * * * * * * * * * * * * * * * * *
 */
import React, {useState} from "react";
import {Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import DoubleClick from "../../common/components/DoubleClick";
import {Colors, Layout, Sizing} from "../../common/styles";
import {NavHeader} from "../../components/navHeader.component";
import {
    SOURCE_ADD_DEVICE_ERROR, SOURCE_APP_LOGO,
    SOURCE_ARROW_DOWN_GRAY, SOURCE_ARROW_RIGHT_GRAY,
    SOURCE_BG_ADD_DEVICE,
    SOURCE_SCAN_GRAY,
} from "../../common/ImageSource";
import {PrimaryButtonWithBorder} from "../../components/primaryButton.component";
import {connect} from "react-redux";
import Models from "../../models";
import I18n from "react-native-i18n";
import NavigationService from "../../common/NavigationService";
import mock from "../../models/mock";
import InputDeviceAccountOverlay from "../../container/inputDeviceLinkAccount.Overlay";
import RNFlatList from "../../components/floatList.component";
import {DeviceHeader} from "../../components/pageListHeader.component";
import {EmptyDeviceList, EmptyVersionList} from "../../components/pageEmpty.component";
import {DeviceStatus} from "../../container/DeviceList.container";

const UpdateLogcatPage = () => {
    const [version, setVersion] = React.useState('1.0.0')
    const VERSION=[
        {title:'1.0.0',content:''},
        {title:'1.0.1',content:''},
        {title:'1.0.2',content:''},
    ]
    /*-------------------------生命周期-------------------------*/
    /*-------------------------API----------------------------*/
    /*-------------------------回调事件------------------------*/
    /*-------------------------事件----------------------------*/
    /*-------------------------子视图----------------------------*/
    /*-------------------------主视图----------------------------*/
    return (
        <SafeAreaView style={styles.container}>
            <NavHeader title={I18n.t("mine_about_app_version_update_logcat")}/>
            <VersionList/>
        </SafeAreaView>
    );
};
export const UpdateLogcat = connect(state => ({
    localeEnv: state[Models.home].localeEnv,
}))(UpdateLogcatPage);
export default UpdateLogcat;

const VersionList = props => {
    const { status } = props;
    const [listData, setListData] = useState({
        dataList: [],
        page: 1,
        total: 0,
    });
    const VERSION=[
        {title:'1.0.0',content:''},
        {title:'1.0.1',content:''},
        {title:'1.0.2',content:''},
    ]
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
        let result={
            data:{
                data: VERSION,
                total:3
            }
        }
        setRefreshing(false);
        fetDataSuccess(result, params);
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
            <DoubleClick
                onPress={()=>{
                    NavigationService.navigate("SpecialArticlePage", {
                        title: item.title,
                    });
                }}
                style={styles.itemStyle}>
                <Text style={styles.enuTitleStyle}>{item.title}</Text>
                <Image source={SOURCE_ARROW_RIGHT_GRAY}/>
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
            renderItem={renderItem}
            ListEmptyComponent={<EmptyVersionList />}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral.white,
    },
    listContent:{
        ...Layout.flex.full,
        paddingTop:Sizing.t16,
        backgroundColor:Colors.neutral.grayF8
    },
    scrollStyle: {
        flex: 1,
        backgroundColor: Colors.neutral.grayF8,
        ...Layout.mainAxis.center
    },
    logoStyle: {
        marginTop: Sizing.adaptionSpace(46),
        marginBottom: Sizing.adaptionSpace(16),
        width: Sizing.adaptionSpace(67),
        height: Sizing.adaptionSpace(67),
    },
    currentVersionStyle: {
        fontSize: Sizing.t14,
        color: Colors.neutral.gray66
    },
    itemStyle: {
        backgroundColor: Colors.neutral.white,
        paddingVertical: Sizing.t16,
        ...Layout.flex.row,
        ...Layout.crossAxis.spaceBetween,
        ...Layout.mainAxis.center,
        paddingHorizontal: Sizing.t20,
        borderBottomColor:'#F8F8F8',
        borderBottomWidth:1
    },
});
