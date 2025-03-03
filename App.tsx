/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import '@/configs/themes/unitstyles';
import '@/configs/localization';
import BootSplash from 'react-native-bootsplash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {
  AnimatedBootSplash,
  DebugButton,
  DebugScreen,
  OrientationLoading,
  UnityContainer,
} from '@/components';
import {UnityProvider} from '@/contexts';
import {useDownloadData} from '@/hooks';
import {AppNavigation, navigationRef} from '@/navigation';

const queryClient = new QueryClient();
const TIME_ORIENTATION_LOADING = 800;

function App(): React.JSX.Element {
  const {downloadData} = useDownloadData();
  const [isOrientationLoadingVisible, setIsOrientationLoadingVisible] =
    useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const orientationRef = useRef<OrientationType>(OrientationType.PORTRAIT);

  useEffect(() => {
    BootSplash.hide();
    downloadData();
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
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
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
                <DebugButton />
                <DebugScreen />
              </UnityProvider>
            </NavigationContainer>
          </QueryClientProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
