import React, {FC} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Layout, useTheme} from '@ui-kitten/components';
import {useDarkMode} from '../hooks/mmkvHooks';

interface Props {}

const MainLayout: FC<Props> = ({children}) => {
  const {
    bottom: paddingBottom,
    left: paddingLeft,
    right: paddingRight,
    top: paddingTop,
  } = useSafeAreaInsets();

  const theme = useTheme();

  const {isDarkMode} = useDarkMode();

  return (
    <Layout
      style={[
        styles.container,
        {paddingTop, paddingLeft, paddingRight, paddingBottom},
      ]}>
      <Layout style={styles.innerContainer}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme['background-basic-color-2']}
        />
        {children}
      </Layout>
    </Layout>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {flex: 1},
  innerContainer: {flex: 1, paddingHorizontal: 15},
});
