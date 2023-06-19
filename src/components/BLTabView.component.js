import React, { useCallback } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import { Colors, Sizing, Typography } from "../common/styles";
import TextUtils from "../common/TextUtils";
import { connect } from "../Dva";
import Models from "../models";

const initialLayout = { width: Sizing.screen.width };

export const BLTabView = connect(state => ({
  badgeInfo: state[Models.home].badgeInfo,
}))(props => {
  const { badgeInfo } = props;
  const [index, setIndex] = React.useState(0);

  const { routes, renderScene, tabStyle, scrollEnabled } = props;

  React.useEffect(() => {
    let initIndex = !TextUtils.isNull(props.index) ? props.index : 0;
    setIndex(initIndex);
  }, []);
  const renderLabel = ({ route, focused }) => {
    return <Text style={focused ? styles.activeTitleStyle : styles.inactiveTitleStyle}>{route.title}
      <Text style={{ fontSize: Sizing.t10 }}>{`(${badgeInfo[route.key]})`}</Text>
    </Text>;
  };
  const renderIndicator = useCallback(
    ({ position, getTabWidth }) => {
      const inputRange = [0, 1];
      const translateX = position.interpolate({
        inputRange: inputRange,
        outputRange: inputRange.map(x => {
          const i = Math.round(x);
          return i * getTabWidth(i);
        }),
      });
      return (
        <Animated.View
          style={[
            styles.indicatorContainerStyle,
            {
              width: getTabWidth(index),
              transform: [{ translateX }],
            },
          ]}
        >
          <View style={styles.indicatorStyle} />
        </Animated.View>
      );
    },
    [index],
  );
  return (
    <TabView
      lazy={true}
      initialLayout={initialLayout}
      onIndexChange={setIndex}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      swipeEnabled={true}
      renderTabBar={tabBarProps => {
        return (
          <TabBar
            {...tabBarProps}
            style={styles.tabStyle}
            bounces={true}
            tabStyle={tabStyle}
            scrollEnabled={scrollEnabled}
            indicatorStyle={styles.indicatorStyle}
            inactiveColor={"#777777"}
            activeColor={Colors.theme.primary}
            renderIndicator={renderIndicator}
            renderLabel={renderLabel}
            pressColor={Colors.neutral.clear}
          />
        );
      }}
    />
  );
});

const styles = StyleSheet.create({
  tabStyle: {
    height: 48,
    backgroundColor: Colors.neutral.white,
  },
  indicatorContainerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  inactiveTitleStyle: {
    color: Colors.neutral.gray33,
    fontWeight: Typography.fontWeight.normal,
    fontSize: 14,
  },
  activeTitleStyle: {
    color: Colors.theme.primary,
    fontWeight: Typography.fontWeight.medium,
    fontSize: 14,
  },
  badgeNormalStyle: {
    color: "#777777",
    fontSize: Sizing.t10,
  },
  badgeStyle: {
    color: Colors.theme.primary,
    fontSize: Sizing.t10,
  },
  indicatorStyle: {
    width: 0,
    height: 0,
  },
});
