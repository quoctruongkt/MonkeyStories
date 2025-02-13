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
import BootSplash from 'react-native-bootsplash';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {
  AnimatedBootSplash,
  OrientationLoading,
  UnityContainer,
} from '@/components';
import {UnityProvider} from '@/contexts';
import {AppNavigation, navigationRef} from '@/navigation';
import {persistor, store} from '@/store';

const queryClient = new QueryClient();
const TIME_ORIENTATION_LOADING = 800;

function App(): React.JSX.Element {
  const [isOrientationLoadingVisible, setIsOrientationLoadingVisible] =
    useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const orientationRef = useRef<OrientationType>(OrientationType.PORTRAIT);

  useEffect(() => {
    const onOrientationChanged = (orientation: OrientationType) => {
      if (orientation !== orientationRef.current) {
        setIsOrientationLoadingVisible(true);
        orientationRef.current = orientation;

        setTimeout(() => {
          setIsOrientationLoadingVisible(false);
        }, TIME_ORIENTATION_LOADING);
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
          <NavigationContainer ref={navigationRef} onReady={BootSplash.hide}>
            <UnityProvider>
              <AppNavigation />
              <UnityContainer />
              <OrientationLoading show={isOrientationLoadingVisible} />
              {isSplashVisible ? (
                <AnimatedBootSplash
                  onAnimationEnd={() => {
                    setIsSplashVisible(false);
                  }}
                />
              ) : null}
            </UnityProvider>
          </NavigationContainer>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
