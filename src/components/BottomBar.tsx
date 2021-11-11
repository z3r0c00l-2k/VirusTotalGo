import React, {VFC} from 'react';
import {View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Divider,
} from '@ui-kitten/components';

const BottomBar: VFC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const onSelect = (index: number): void => {
    const selectedTabRoute: string = state.routeNames[index];
    navigation.navigate(selectedTabRoute);
  };

  return (
    <View>
      <Divider />
      <BottomNavigation
        appearance="noIndicator"
        selectedIndex={state.index}
        onSelect={onSelect}>
        {state.routes.map(route => {
          const {options} = descriptors[route.key];
          return (
            <BottomNavigationTab
              key={options.title}
              title={options.title}
              icon={options.tabBarIcon}
            />
          );
        })}
      </BottomNavigation>
    </View>
  );
};

export default BottomBar;
