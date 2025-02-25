import React from 'react';
import {Alert, Button, View} from 'react-native';

import {EEnv} from '@/constants';
import {useAppConfig} from '@/store';

export const ChangeEnv: React.FC = () => {
  const {changeEnv, env} = useAppConfig();

  const change = (newEnv: EEnv) => {
    changeEnv(newEnv);
    Alert.alert('Khởi động lại', 'Khởi động lại app để nó hoạt động nhé 🥰');
  };

  return (
    <View>
      <Button
        title="Production"
        disabled={env === EEnv.PROD}
        onPress={() => change(EEnv.PROD)}
      />
      <Button
        title="Develop"
        disabled={env === EEnv.DEV}
        onPress={() => change(EEnv.DEV)}
      />
    </View>
  );
};
