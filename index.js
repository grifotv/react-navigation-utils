import { Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const commonStackNavigatorConfig = {
  mode: 'card',
  defaultNavigationOptions: {
    gesturesEnabled: false,
  },
  transparentCard: false,
  headerMode: 'none',
  cardStyle: {
    backgroundColor: '#000000',
  },
  cardShadowEnabled: false,
  cardOverlayEnabled: false,
};

const commonTransitionConfig = {
  containerStyle: {
    backgroundColor: '#000000',
  },
  transitionSpec: {
    useNativeDriver: true,
    timing: Animated.spring,
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export function createHorizontalStackNavigator(routeConfigs, stackNavigatorConfig = {}) {
  return createStackNavigator(routeConfigs, {
    ...commonStackNavigatorConfig,
    transitionConfig: () => ({
      ...commonTransitionConfig,
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;
        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
          outputRange: [
            0, // off screen
            1, // show
            1, // current
            0.4, // hide
            0, // off screen
          ],
        });
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [
            layout.initWidth, // show
            0, // current
            -layout.initWidth * 0.5, // hide
          ],
        });
        return {
          opacity,
          transform: [{ translateX }],
        };
      },
    }),
    ...stackNavigatorConfig,
  });
}

export function createVerticalStackNavigator(routeConfigs, stackNavigatorConfig = {}) {
  return createStackNavigator(routeConfigs, {
    ...commonStackNavigatorConfig,
    transitionConfig: () => ({
      ...commonTransitionConfig,
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;
        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
          outputRange: [
            0, // off screen
            1, // show
            1, // current
            0.4, // hide
            0, // off screen
          ],
        });
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [
            layout.initHeight, // show
            0, // current
            0, // hide
          ],
        });
        const scale = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [
            1, // show
            1, // current
            0.95, // hide
          ],
        });
        return {
          opacity,
          transform: [{ translateY }, { scale }],
        };
      },
    }),
    ...stackNavigatorConfig,
  });
}
