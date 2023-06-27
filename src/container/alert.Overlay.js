/**
 * Desc：
 * Author：YYQ
 * Date: 2023/6/19
 *
 * * * * * * * * * * * * * * * * * * *
 * Content Desc:
 *
 * * * * * * * * * * * * * * * * * * *
 */
import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Colors, Layout, Sizing, Typography} from "../common/styles";
import Overlay from 'teaset/components/Overlay/Overlay';
import TextUtils from "../common/TextUtils";
import I18n from "react-native-i18n";
import DoubleClick from "../common/components/DoubleClick";

class Confirm extends Overlay {
    static show(title = '', content = '', onConfirm = new Function(), textConfirm = '确定') {
        const key = (
            <Overlay.PopView style={Layout.center} modal overlayOpacity={0.5} ref={view => (this.view = view)}>
                <CustomContent
                    options={{
                        title,
                        content,
                        onConfirm,
                        textConfirm,
                    }}
                    onClose={() => {
                        this.view && this.view.close();
                    }}
                />
            </Overlay.PopView>
        );
        Overlay.show(key);
        return key;
    }
}

class Custom extends Overlay {
    static show(
        title = '',
        content = '',
        onConfirm = new Function(),
        onCancel = new Function(),
        textConfirm = '确定',
        textCancel = '取消',
    ) {
        const key = (
            <Overlay.PopView style={Layout.center} modal overlayOpacity={0.5} ref={view => (this.view = view)}>
                <CustomContent
                    options={{
                        title,
                        content,
                        onConfirm,
                        onCancel,
                        textConfirm,
                        textCancel,
                    }}
                    onClose={() => {
                        this.view && this.view.close();
                    }}
                />
            </Overlay.PopView>
        );
        Overlay.show(key);
        return key;
    }
}

const CustomContent = props => {
    const {options, onClose} = props;
    let isEmptyTitle = TextUtils.isEmptyStr(options.title);
    return (
        <View style={styles.contentStyle}>
            {!isEmptyTitle && <Text style={styles.titleStyle}>{options.title}</Text>}
            <View style={[styles.contentTextStyle, {minHeight: Sizing.adaptionSpace(isEmptyTitle ? 100 : 80)}]}>
                <Text style={[styles.textStyle]}>{options.content}</Text>
            </View>
            <View style={{height: 1, backgroundColor: '#EBEDF0'}}/>
            <View style={[styles.btnContentStyle]}>
                {options.onCancel && (
                    <TouchableOpacity
                        style={[styles.actionBtnStyle]}
                        onPress={() => {
                            options.onCancel && options.onCancel();
                            onClose && onClose();
                        }}
                    >
                        <Text style={styles.cancelTextStyle}>{options.textCancel}</Text>
                    </TouchableOpacity>
                )}
                {options.onCancel && (
                    <View style={{height: Sizing.adaptionSpace(70), width: 1, backgroundColor: '#EBEDF0'}}/>
                )}
                <TouchableOpacity
                    style={[styles.actionBtnStyle]}
                    onPress={() => {
                        options.onConfirm && options.onConfirm();
                        onClose && onClose();
                    }}
                >
                    <Text style={styles.confirmTextStyle}>{options.textConfirm}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

class ConfirmBottom extends Overlay {
    static show(title = '', confirmTextColor = Colors.neutral.red, onConfirm = new Function(), textConfirm = I18n.t('confirm'), textCancel = I18n.t('cancel')) {
        const key = (
            <Overlay.PullView
                side={'bottom'}
                containerStyle={{
                    borderTopLeftRadius: Sizing.adaptionSpace(24),
                    borderTopRightRadius: Sizing.adaptionSpace(24),
                }}
                style={{backgroundColor: Colors.neutral.clear}}
                modal={false}
                overlayOpacity={0.5}
                ref={view => (this.view = view)}>
                <BottomView
                    options={{
                        title,
                        confirmTextColor,
                        onConfirm,
                        textConfirm,
                        textCancel,
                    }}
                    onClose={() => {
                        this.view && this.view.close();
                    }}
                />
            </Overlay.PullView>
        );
        Overlay.show(key);
        return key;
    }
}

const BottomView = (props) => {
    const {options, onClose} = props
    return (
        <View style={styles.bottomStyle}>
            <View style={styles.itemStyle}>
                <Text style={styles.bottomTitleTextStyle}>{options.title}</Text>
            </View>
            <View style={styles.itemStyle}>
                <DoubleClick onPress={()=>{
                    options.onConfirm&&options.onConfirm()
                    onClose&&onClose()
                }}>
                    <Text
                        style={[styles.bottomConfirmTextStyle, {color: options.confirmTextColor}]}>{options.textConfirm}</Text>

                </DoubleClick>
                </View>
            <View style={[styles.itemStyle, {borderBottomWidth: 0}]}>
                <DoubleClick onPress={()=>{
                    onClose&&onClose()
                }}>
                    <Text style={styles.bottomCancelTextStyle}>{options.textCancel}</Text>
                </DoubleClick>
            </View>
        </View>
    )
}

export default {
    Custom,
    Confirm,
    ConfirmBottom
};

const styles = StyleSheet.create({
    contentStyle: {
        width: Sizing.adaptionSpace(335),
        minHeight: Sizing.adaptionSpace(162),
        borderRadius: Sizing.t16,
        backgroundColor: Colors.neutral.white,
    },
    titleStyle: {
        color: Colors.neutral.black,
        fontSize: Sizing.t18,
        marginTop: Sizing.t15,
        fontWeight: Typography.fontWeight.medium,
        ...Typography.align.center,
    },
    contentTextStyle: {
        ...Layout.center,
        minHeight: Sizing.adaptionSpace(80),
        paddingVertical: 12,
    },
    textStyle: {
        paddingHorizontal: Sizing.t12,
        fontSize: Sizing.t20,
        color: Colors.neutral.black,
        ...Typography.align.center,
    },
    btnContentStyle: {
        ...Layout.center,
        ...Layout.flex.row,
        height: Sizing.adaptionSpace(70),
    },
    actionBtnStyle: {
        ...Layout.flex.full,
        ...Layout.center,
    },
    rightBordersStyle: {
        borderRightWidth: 1,
        borderRightColor: '#EBEDF0',
    },
    cancelTextStyle: {
        fontSize: Sizing.adaptionSpace(22),
        color: Colors.neutral.gray33,
    },
    confirmTextStyle: {
        fontSize: Sizing.adaptionSpace(22),
        color: "#FF2000",
    },
    bottomStyle: {
        borderTopLeftRadius: Sizing.adaptionSpace(24),
        borderTopRightRadius: Sizing.adaptionSpace(24),
        backgroundColor: Colors.neutral.white,
        paddingHorizontal: Sizing.t20
    },
    itemStyle: {
        ...Layout.center,
        paddingVertical: Sizing.t20,
        borderBottomWidth: 1,
        borderBottomColor: '#EBEDF0'
    },
    bottomTitleTextStyle: {
        fontSize: Sizing.t12,
        color: Colors.neutral.gray66,
    },
    bottomConfirmTextStyle: {
        fontSize: Sizing.t16,
        color: Colors.theme.primary,
    },
    bottomCancelTextStyle: {
        fontSize: Sizing.t16,
        color: Colors.neutral.gray33,
    },
});
