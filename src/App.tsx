import React from 'react';
import {AppContextProvider} from './contexts/AppContext';
import AppStackNavigator from './navigators/AppStackNavigator';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {useDarkMode} from './hooks/mmkvHooks';
import {QueryClient, QueryClientProvider} from 'react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {myTheme} from '../custom-theme';

const queryClient = new QueryClient();

const App = () => {
  const {isDarkMode} = useDarkMode();

  return (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{...(isDarkMode ? eva.dark : eva.light), ...myTheme}}>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <AppStackNavigator />
          </AppContextProvider>
        </QueryClientProvider>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
};

export default App;
