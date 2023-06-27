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
import {Image, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import DoubleClick from "../../common/components/DoubleClick";
import {Colors, Layout, Sizing} from "../../common/styles";
import {NavHeader} from "../../components/navHeader.component";
import {SOURCE_DEFAULT_AVATAR, SOURCE_TAKE_IMAGE,} from "../../common/ImageSource";
import {connect} from "react-redux";
import Models from "../../models";
import I18n from "react-native-i18n";
import AlertOverlay from "../../container/alert.Overlay";
import Toast from "teaset/components/Toast/Toast";
import {getBottomSpace} from "react-native-iphone-x-helper";
import ActionSheet from "teaset/components/ActionSheet/ActionSheet";
import SyanImagePicker from 'react-native-syan-image-picker';

const UserInfoPage = () => {
    let items = [
        {
            title: (
                <View style={[Layout.center]}>
                    <Text style={styles.text15Black33}>拍摄</Text>
                </View>
            ),
            onPress: () => {
                showCamera();
            },
        },
        {
            title: (
                <View style={Layout.center}>
                    <Text style={styles.text15Black33}>从相册选择</Text>
                </View>
            ),
            onPress: () => {
                showPicker();
            },
        },
    ];
    let cancelItem = {
        title: (
            <View style={[Layout.center, {paddingBottom: getBottomSpace()}]}>
                <Text style={styles.text15Black99}>取消</Text>
            </View>
        ),
    };
    /*-------------------------生命周期-------------------------*/
    /*-------------------------API----------------------------*/
    /*-------------------------回调事件------------------------*/
    const onPressRight = () => {
        Toast.success('保存成功')
    }

    const onPressLogout = () => {
        AlertOverlay.Custom.show('', '确定退出登录？')
    }

    /**
     * 相册选择
     */
    const showPicker = () => {
        SyanImagePicker.asyncShowImagePicker({isCamera: false, isRecordSelected: false, imageCount: 1})
            .then(photos => {
                if (photos !== undefined) {
                    console.log(photos[0].uri)
                }
            })
            .catch(() => {
            });
    };

    /**
     * 相机选择
     */
    const showCamera = () => {
        SyanImagePicker.openCamera({imageCount: 1}, (e, photos) => {
            if (photos !== undefined) {
                console.log(photos[0].uri)
            }
        });
    };

    /**
     * 用户头像
     */
    const onPressUserIcon = () => {
        ActionSheet.show(items, cancelItem, {
            containerStyle: {overflow: 'hidden', borderTopRightRadius: 10, borderTopLeftRadius: 10},
        });
    };
    /*-------------------------事件----------------------------*/

    /*-------------------------子视图----------------------------*/
    function renderAvatar() {
        return (
            <View style={Layout.center}>
                <View style={styles.avatarContainerStyle}>
                    <Image source={SOURCE_DEFAULT_AVATAR} style={styles.avatarStyle}/>
                    <DoubleClick
                        onPress={onPressUserIcon}
                        style={styles.pickIconStyle}
                    >
                        <Image source={SOURCE_TAKE_IMAGE}/>
                    </DoubleClick>
                </View>
                <Text style={styles.changeAvatarTextStyle}>修改头像</Text>
            </View>
        )
    }

    function renderRealName() {
        return (
            <View style={styles.nameContainerStyle}>
                <Text style={styles.realNameStyle}>{I18n.t('mine_real_name')}</Text>
                <TextInput
                    style={styles.realNameInputStyle}
                    placeholder={I18n.t('please_enter_your_real_name')}
                    textAlign={"right"}
                />
            </View>
        )
    }

    /*-------------------------主视图----------------------------*/
    return (
        <SafeAreaView style={styles.container}>
            <NavHeader
                title={I18n.t("mine_person_center")}
                rightTitle={I18n.t("save")}
                onPressRight={onPressRight}
            />
            <ScrollView contentContainerStyle={styles.scrollStyle}>
                {renderAvatar()}
                {renderRealName()}
                <View style={Layout.flex.full}/>
                <DoubleClick
                    onPress={onPressLogout}
                >
                    <Text style={styles.logoutTextStyle}>{I18n.t('mine_log_out')}</Text>
                </DoubleClick>
            </ScrollView>

        </SafeAreaView>
    );
};
export const UserInfo = connect(state => ({
    localeEnv: state[Models.home].localeEnv,
}))(UserInfoPage);
export default UserInfo;


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
    avatarContainerStyle: {
        ...Layout.center,
        marginTop: Sizing.adaptionSpace(30),
        marginBottom: Sizing.t10,
        width: Sizing.adaptionSpace(120),
        height: Sizing.adaptionSpace(120),
        borderRadius: Sizing.adaptionSpace(60),
        backgroundColor: Colors.neutral.white
    },
    avatarStyle: {
        width: Sizing.adaptionSpace(119),
        height: Sizing.adaptionSpace(119),
        borderRadius: Sizing.adaptionSpace(59)
    },
    pickIconStyle: {
        position: 'absolute',
        right: Sizing.adaptionSpace(25),
        bottom: Sizing.adaptionSpace(4),
        width: Sizing.adaptionSpace(19),
        height: Sizing.adaptionSpace(19),
    },
    changeAvatarTextStyle: {
        fontSize: Sizing.t16,
        color: Colors.neutral.gray33
    },
    nameContainerStyle: {
        ...Layout.flex.row,
        borderBottomWidth: 1,
        borderBottomColor: "#EBEDF0",
        marginTop: Sizing.adaptionSpace(70),
        marginHorizontal: Sizing.t20
    },
    realNameStyle: {
        fontSize: Sizing.t16,
        color: Colors.neutral.gray33
    },
    realNameInputStyle: {
        ...Layout.flex.full,
        padding: 0,
        color: Colors.neutral.gray66
    },
    logoutTextStyle: {
        fontSize: Sizing.t16,
        color: Colors.neutral.red,
        marginBottom: Sizing.adaptionSpace(35)
    },
    text15Black33: {
        fontSize: Sizing.t15,
        color: Colors.neutral.gray33,
    },
    text15Black66: {
        fontSize: Sizing.t15,
        color: Colors.neutral.gray66,
    },
    text15Black99: {
        fontSize: Sizing.t15,
        color: Colors.neutral.gray99,
    },
});
