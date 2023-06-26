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

import React from "react";
import {StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {NumHeader} from "../../components/navHeader.component";
import {connect} from "react-redux";
import Models from "../../models";
import I18n from "react-native-i18n";
import {SceneMap, TabBar} from "react-native-tab-view";
import DeviceList from "../../container/DeviceList.container";
import {Colors, Sizing} from "../../common/styles";
import {BLTabView} from "../../components/BLTabView.component";
import CustomIndicator from "../../common/components/CustomIndicator";
import {CollapsibleHeaderTabView} from "react-native-tab-view-collapsible-header";
const initialLayout = { width: Sizing.screen.width };

const InvitePage = () => {
    const routes = [
        {
            key: "all",
            title: I18n.t('device_status_all'),
        },
        {
            key: "running",
            title: I18n.t('device_status_running'),
        }
    ];
    const [index, setIndex] = React.useState(0);


    /*-------------------------生命周期----------------------------*/
    /*-------------------------API----------------------------*/
    /*-------------------------回调事件----------------------------*/
    /*-------------------------事件----------------------------*/
    /*-------------------------子视图----------------------------*/
    const renderScene = SceneMap(
        {
            all: () => <DeviceList status={0}/>,
            running: () => <DeviceList status={1}/>,
        },
    );
    /*-------------------------主视图----------------------------*/
    return (
        <>
            <NumHeader title={I18n.t('title_invite')} num={"0"}/>
            <SafeAreaView style={styles.container}>
                <CollapsibleHeaderTabView
                    lazy={true}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    renderTabBar={tabBarProps => (
                        <TabBar
                            {...tabBarProps}
                            tabStyle={{ height: Sizing.adaptionSpace(48) }}
                            inactiveColor={Colors.neutral.gray66}
                            activeColor={Colors.theme.primary}
                            indicatorContainerStyle={[{ backgroundColor: Colors.neutral.grayF5 }]}
                            renderIndicator={props => <CustomIndicator {...props} />}
                        />
                    )}
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
        backgroundColor: "#F5F5F5",
    },
});
