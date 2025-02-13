import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {TAppStack} from '@/types';

export const useAppNavigation = <RouteName extends keyof TAppStack>() => {
  return useNavigation<NavigationProp<TAppStack, RouteName>>();
};

export const useAppRoute = <RouteName extends keyof TAppStack>() => {
  return useRoute<RouteProp<TAppStack, RouteName>>();
};
