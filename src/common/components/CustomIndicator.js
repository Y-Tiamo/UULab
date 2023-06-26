/**----------------------------------------------------------------*/
import React from 'react';
import { StyleSheet, Animated, I18nManager } from 'react-native';
import { SceneRendererProps, NavigationState } from 'react-native-tab-view';
import { Colors, Sizing } from "../styles";
/**----------------------------------------------------------------*/
const CustomIndicator = (
  props: SceneRendererProps & {
    navigationState: NavigationState,
    getTabWidth: (i: number) => number,
  },
) => {
  const { position, navigationState, getTabWidth } = props;
  const inputRange = [0, 0.48, 0.49, 0.51, 0.52, 1, 1.48, 1.49, 1.51, 1.52, 2];

  const scale = position.interpolate({
    inputRange,
    outputRange: inputRange.map(x => (Math.trunc(x) === x ? 2 : 0.1)),
  });

  const opacity = position.interpolate({
    inputRange,
    outputRange: inputRange.map(x => {
      const d = x - Math.trunc(x);
      return d === 0.49 || d === 0.51 ? 0 : 1;
    }),
  });

  const translateX = position.interpolate({
    inputRange: inputRange,
    outputRange: inputRange.map(x => {
      const i = Math.round(x);
      return i * getTabWidth(i) * (I18nManager.isRTL ? -1 : 1);
    }),
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: `${100 / navigationState.routes.length}%`,
          transform: [{ translateX }],
        },
      ]}
    >
      <Animated.View style={[styles.indicator, { opacity, transform: [{ scale }] }]} />
    </Animated.View>
  );
};
export default CustomIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  indicator: {
    backgroundColor: Colors.theme.primary,
    width: 65,
    height: 1.5,
    borderRadius: 1,
    // marginBottom:Sizing.t12
  },
});
