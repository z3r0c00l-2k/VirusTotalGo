import React from 'react';
import {AppContextProvider} from './contexts/AppContext';
import AppStackNavigator from './navigators/AppStackNavigator';
import {ApplicationProvider} from '@ui-kitten/components';
import {useDarkMode} from './hooks/mmkvHooks';
import {QueryClient, QueryClientProvider} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistQueryClient} from 'react-query/persistQueryClient-experimental';
import {createAsyncStoragePersistor} from 'react-query/createAsyncStoragePersistor-experimental';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const asyncStoragePersistor = createAsyncStoragePersistor({
  storage: AsyncStorage,
});

persistQueryClient({
  queryClient,
  persistor: asyncStoragePersistor,
});

const App = () => {
  const {isDarkMode} = useDarkMode();

  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
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
