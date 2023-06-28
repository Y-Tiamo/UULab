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

import React, {useCallback} from "react";
import {Animated, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {HomeHeader, NumHeader} from "../../components/navHeader.component";
import {connect} from "react-redux";
import Models from "../../models";
import I18n from "react-native-i18n";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import DeviceList from "../../container/DeviceList.container";
import {Colors, Sizing} from "../../common/styles";
import {BLTabView} from "../../components/BLTabView.component";

const InvitePage = () => {
    const routes = [
        {
            key: "instrument",
            title: I18n.t('instrument'),
        },
        {
            key: "member",
            title: I18n.t('member'),
        }
    ];


    /*-------------------------生命周期----------------------------*/
    /*-------------------------API----------------------------*/
    /*-------------------------回调事件----------------------------*/
    /*-------------------------事件----------------------------*/
    /*-------------------------子视图----------------------------*/
    const renderScene = SceneMap(
        {
            instrument: () => <View style={{flex:1}}>
                <Text>{I18n.t('instrument')}</Text>
            </View>,
            member: () => <View style={{flex:1}}>
                <Text>{I18n.t('member')}</Text>
            </View>,
        },
    );
    /*-------------------------主视图----------------------------*/
    return (
        <>
            <HomeHeader title={"UULabs"} isManager={true} />
            <SafeAreaView style={styles.container}>
                <BLTabView
                    index={0}
                    routes={routes}
                    renderScene={renderScene}
                />
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
        backgroundColor: Colors.neutral.white,
    },
});
