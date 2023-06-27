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
import {Image, ImageBackground, StatusBar, StyleSheet, Text, View, Clipboard} from "react-native";
import {Colors, Layout, Sizing} from "../../common/styles";
import {
    IMG_COMMON_ARR_LeftBlack,
    SOURCE_BG_PERSON,
    SOURCE_SERVICE_CUSTOMER,
    SOURCE_SERVICE_EMAIL,
    SOURCE_SERVICE_PHONE,
} from "../../common/ImageSource";
import {connect} from "react-redux";
import Models from "../../models";
import I18n from "react-native-i18n";
import DoubleClick from "../../common/components/DoubleClick";
import NavigationService from "../../common/NavigationService";
import AlertOverlay from "../../container/alert.Overlay";
import {CallPhone} from "../../common/Base";
import Toast from "teaset/components/Toast/Toast";

const ServiceCenterPage = () => {
    const MENU = [
        {
            title: I18n.t('mine_service_center_phone'),
            icon: SOURCE_SERVICE_PHONE,
            content: '110'
        },
        {
            title: I18n.t('mine_service_center_email'),
            icon: SOURCE_SERVICE_EMAIL,
            content: ''
        },
        {
            title: I18n.t('mine_service_center_customer'),
            icon: SOURCE_SERVICE_CUSTOMER,
            content: ''
        },
    ]

    /*-------------------------生命周期-------------------------*/
    /*-------------------------API----------------------------*/
    /*-------------------------回调事件------------------------*/
    /*-------------------------事件----------------------------*/
    /**
     * 点击菜单
     */
    const onPressMenu = (index) => {
        if (index === 0) {
            CallPhone(MENU[index].content)
        } else if (index === 1) {
            AlertOverlay.ConfirmBottom.show('1888888778@qq.com', Colors.theme.primary, () => {
                Clipboard.setString(MENU[index].content)
                Toast.success(I18n.t('mine_service_center_copy_success'))
            }, I18n.t('copy'))
        } else {

        }

    };

    /*-------------------------子视图----------------------------*/
    function renderHeader() {
        return (<ImageBackground
            source={SOURCE_BG_PERSON}
            style={styles.headerStyle}>
            <DoubleClick
                onPress={() => {
                    NavigationService.navigate('')
                }}
                style={styles.backStyle}>
                {IMG_COMMON_ARR_LeftBlack}
            </DoubleClick>
            <Text style={styles.titleStyle}>{I18n.t('mine_service_center')}</Text>
        </ImageBackground>)
    }

    /*-------------------------主视图----------------------------*/
    return (
        <>
            <StatusBar backgroundColor={Colors.neutral.clear} barStyle={'light-content'} translucent={true}/>
            <View style={styles.container}>
                {renderHeader()}
                <View style={styles.scrollStyle}>
                    {MENU.map((item, index) => {
                        return (
                            <DoubleClick
                                onPress={() => {
                                    onPressMenu(index)
                                }}
                                style={styles.itemStyle} key={String(item) + index}>
                                <Image source={item.icon} style={styles.iconStyle}/>
                                <Text style={styles.menuTitleStyle}>{item.title}</Text>
                                {index === 0 && <Text style={styles.menuContentStyle}>{item.content}</Text>}
                            </DoubleClick>
                        )
                    })}
                </View>
            </View>
        </>
    );
};
export const ServiceCenter = connect(state => ({
    localeEnv: state[Models.home].localeEnv,
}))(ServiceCenterPage);
export default ServiceCenter;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral.white,
    },
    scrollStyle: {
        ...Layout.flex.full,
        backgroundColor: Colors.neutral.clear,
        paddingHorizontal: Sizing.t20,
        marginTop: Sizing.adaptionSpace(140)
    },
    itemStyle: {
        ...Layout.flex.row,
        ...Layout.center,
        backgroundColor: Colors.neutral.white,
        borderRadius: Sizing.t8,
        marginBottom: Sizing.adaptionSpace(24),
        paddingVertical: Sizing.t16,
        shadowRadius: Sizing.t4,
        shadowOpacity: 1,
        shadowColor: 'rgba(0,0,0,1)',
        elevation: 20,
        shadowOffset: {width: 0, height: 0},
    },
    headerStyle: {
        ...Layout.mainAxis.center,
        height: Sizing.adaptionSpace(163),
        width: Sizing.screen.width,
        backgroundColor: Colors.theme.primary,
        position: 'absolute',
    },
    titleStyle: {
        fontSize: Sizing.t18,
        color: Colors.neutral.white,
    },
    backStyle: {
        height: Sizing.adaptionSpace(40),
        marginTop: StatusBar.currentHeight,
        alignSelf: 'flex-start',
        marginLeft: Sizing.t12,
        justifyContent: 'flex-end',
        marginBottom: Sizing.adaptionSpace(20)
    },
    iconStyle: {
        width: Sizing.t16,
        height: Sizing.t16,
        marginRight: Sizing.t12
    },
    menuTitleStyle: {
        fontSize: Sizing.t16,
        color: Colors.neutral.gray33
    },
    menuContentStyle: {
        fontSize: Sizing.t16,
        color: Colors.neutral.gray99,
        marginLeft: Sizing.t8
    },
});
