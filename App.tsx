/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import '@/configs/themes/unitstyles';
import '@/configs/localization';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {OrientationLoading, UnityContainer} from '@/components';
import {UnityProvider} from '@/contexts';
import {AppNavigation, navigationRef} from '@/navigation';
import {persistor, store} from '@/store';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const [isOrientationLoadingVisible, setIsOrientationLoadingVisible] =
    useState(false);
  const orientationRef = useRef<OrientationType>(OrientationType.PORTRAIT);

  useEffect(() => {
    const onOrientationChanged = (orientation: OrientationType) => {
      if (orientation !== orientationRef.current) {
        setIsOrientationLoadingVisible(true);
        orientationRef.current = orientation;

        setTimeout(() => {
          setIsOrientationLoadingVisible(false);
        }, 800);
      }
    };
    Orientation.addLockListener(onOrientationChanged);

    return () => {
      Orientation.removeLockListener(onOrientationChanged);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer ref={navigationRef}>
            <UnityProvider>
              <AppNavigation />
              <UnityContainer />
              <OrientationLoading show={isOrientationLoadingVisible} />
            </UnityProvider>
          </NavigationContainer>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
