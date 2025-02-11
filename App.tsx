/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {AppNavigation} from '@/navigation/AppNavigation';
import {persistor, store} from '@/store';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import '@/configs/themes/unitstyles';
import '@/configs/localization';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
