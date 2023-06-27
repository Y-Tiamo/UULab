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

const AboutAppPage = () => {
    const [version, setVersion] = React.useState('1.0.0')
    /*-------------------------生命周期-------------------------*/
    /*-------------------------API----------------------------*/
    /*-------------------------回调事件------------------------*/
    /*-------------------------事件----------------------------*/
    /*-------------------------子视图----------------------------*/
    /*-------------------------主视图----------------------------*/
    return (
        <SafeAreaView style={styles.container}>
            <NavHeader title={I18n.t("mine_menu_about_app")}/>
            <ScrollView contentContainerStyle={styles.scrollStyle}>
                <Image source={SOURCE_APP_LOGO} style={styles.logoStyle}/>
                <Text style={styles.currentVersionStyle}>{I18n.t('mine_about_app_current_version')}：V{version}</Text>
                <DoubleClick
                    onPress={()=>{
                        NavigationService.navigate('UpdateLogcatPage')
                    }}
                    style={styles.itemStyle}>
                    <Text style={styles.enuTitleStyle}>{I18n.t('mine_about_app_version_introduction')}</Text>
                    <Image source={SOURCE_ARROW_RIGHT_GRAY}/>
                </DoubleClick>
            </ScrollView>
        </SafeAreaView>
    );
};
export const AboutApp = connect(state => ({
    localeEnv: state[Models.home].localeEnv,
}))(AboutAppPage);
export default AboutApp;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral.white,
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
        width:Sizing.screen.width,
        backgroundColor: Colors.neutral.white,
        paddingVertical: Sizing.t16,
        ...Layout.flex.row,
        ...Layout.crossAxis.spaceBetween,
        marginTop: Sizing.adaptionSpace(45),
        ...Layout.mainAxis.center,
        paddingHorizontal: Sizing.t20
    },
});
