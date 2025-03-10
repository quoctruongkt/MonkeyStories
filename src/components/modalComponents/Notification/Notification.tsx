import React from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';

import {styles} from './Notification.style';

import {useModal} from '@/store';

export type TNotificationProps = {
  title: string;
  description: string;
  actions: {label: string; onPress: () => void}[];
  id?: string;
};

export const Notification: React.FC<TNotificationProps> = ({
  title,
  description,
  actions,
  id = '',
}) => {
  const {hideModal} = useModal();

  return (
    <View style={styles.container}>
      <Button
        title="an"
        onPress={() => {
          hideModal(id);
        }}
      />
      <Text>{title}</Text>
      <Text>{description}</Text>
      {actions?.map(action => (
        <TouchableOpacity key={action.label} onPress={action.onPress}>
          <Text>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
