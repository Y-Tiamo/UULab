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
import React from "react";
import {Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import DoubleClick from "../../common/components/DoubleClick";
import {Colors, Layout, Sizing} from "../../common/styles";
import {NavHeader} from "../../components/navHeader.component";
import {
    SOURCE_ADD_DEVICE_ERROR,
    SOURCE_ARROW_DOWN_GRAY, SOURCE_ARROW_RIGHT_GRAY,
    SOURCE_BG_ADD_DEVICE,
    SOURCE_SCAN_GRAY,
} from "../../common/ImageSource";
import {PrimaryButtonWithBorder} from "../../components/primaryButton.component";
import {connect} from "react-redux";
import Models from "../../models";
import I18n from "react-native-i18n";
import NavigationService from "../../common/NavigationService";

const PermissionManagerPage = () => {
    const MENU = [
        {
            title: '访问地理位置',
            content: '用于提供智能设备自动化、设备快连时获取WLAN和蓝牙列表、发现附近设备的功能。',
            permission: '',
            is_granted: true
        },
        {
            title: '访问相机权限',
            content: '用于扫描二维码以进行设备安装，账号登录等功能。',
            permission: '',
            is_granted: true
        },
        {
            title: '访问设备权限',
            content: '用于扫描二维码以进行设备安装，账号登录等功能。',
            permission: '',
            is_granted: true
        },
    ]
    /*-------------------------生命周期-------------------------*/
    /*-------------------------API----------------------------*/
    /*-------------------------回调事件------------------------*/

    /*-------------------------事件----------------------------*/
    function checkPermissionStatus(item) {

    }

    /*-------------------------子视图----------------------------*/
    /*-------------------------主视图----------------------------*/
    return (
        <SafeAreaView style={styles.container}>
            <NavHeader title={I18n.t("system_permission_manage")}/>
            <ScrollView contentContainerStyle={styles.scrollStyle}>
                {MENU.map((item, index) => {
                    return (<DoubleClick
                        onPress={() => {
                            checkPermissionStatus(item)
                        }}
                        key={String(item) + index} style={styles.itemStyle}>
                        <View style={[Layout.flex.full, Layout.flex.column, {marginRight: Sizing.adaptionSpace(46)}]}>
                            <Text style={styles.enuTitleStyle}>{item.title}</Text>
                            <Text style={styles.contentStyle}>{item.content}</Text>
                        </View>
                        <View style={[Layout.mainAxis.center, Layout.flex.row]}>
                            <Text style={styles.contentStyle}>
                                {item.is_granted ? I18n.t('allowed') : I18n.t('not_allowed')}
                            </Text>
                            <Image source={SOURCE_ARROW_RIGHT_GRAY}/>
                        </View>
                    </DoubleClick>)
                })}
            </ScrollView>
        </SafeAreaView>
    );
};
export const PermissionManager = connect(state => ({
    localeEnv: state[Models.home].localeEnv,
}))(PermissionManagerPage);
export default PermissionManager;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral.white,
    },
    scrollStyle: {
        flex: 1,
        backgroundColor: Colors.neutral.grayF8,
    },
    itemStyle: {
        backgroundColor: Colors.neutral.white,
        paddingVertical: Sizing.t16,
        ...Layout.flex.row,
        ...Layout.crossAxis.spaceBetween,
        marginTop: Sizing.t12,
        ...Layout.mainAxis.center,
        paddingHorizontal: Sizing.t20
    },
    enuTitleStyle: {
        color: Colors.neutral.gray33,
        fontSize: Sizing.t16,
        marginBottom: Sizing.adaptionSpace(7)
    },
    contentStyle: {
        color: Colors.neutral.gray66,
        fontSize: Sizing.t10,
        marginRight: Sizing.t10
    },
});
