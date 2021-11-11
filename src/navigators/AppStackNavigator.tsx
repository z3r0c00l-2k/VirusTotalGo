import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SystemAppsScreen from '../screens/SystemAppsScreen';
import UserAppsScreen from '../screens/UserAppsScreen';
import BottomBar from '../components/BottomBar';
import {Icon} from '@ui-kitten/components';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{headerShown: false}}
    tabBar={props => <BottomBar {...props} />}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Home',
        tabBarIcon: props => <Icon {...props} name="home" />,
      }}
    />
    <Tab.Screen
      name="SystemApps"
      component={SystemAppsScreen}
      options={{
        title: 'System Apps',
        tabBarLabel: 'System Apps',
        tabBarIcon: props => <Icon {...props} name="shield" />,
      }}
    />
    <Tab.Screen
      name="UserApps"
      component={UserAppsScreen}
      options={{
        title: 'User Apps',
        tabBarIcon: props => <Icon {...props} name="person-done-outline" />,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        title: 'Settings',
        tabBarIcon: props => <Icon {...props} name="settings-2" />,
      }}
    />
  </Tab.Navigator>
);

const AppStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="root"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="root" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStackNavigator;
