import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from '../../src/components/bases/Icon';
import {iconMap} from '../../src/assets';

const meta = {
  title: 'components/Icon',
  component: Icon,
};

export default meta;

export const IconGrid = () => (
  <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 16, padding: 16}}>
    {Object.keys(iconMap).map(iconName => (
      <View key={iconName} style={{alignItems: 'center'}}>
        <Icon name={iconName} size={48} />
        <View style={{marginTop: 4}}>
          <Text style={{fontSize: 12}}>{iconName}</Text>
        </View>
      </View>
    ))}
  </View>
);
