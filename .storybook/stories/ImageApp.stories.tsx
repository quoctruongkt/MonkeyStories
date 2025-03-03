import React from 'react';
import {View, Text} from 'react-native';
import {ImageApp} from '../../src/components';
import {ImagePaths} from '../../src/assets/images';

const meta = {
  title: 'components/ImageApp',
  component: ImageApp,
  argTypes: {
    source: {
      control: 'object',
    },
    style: {
      control: 'object',
    },
    resizeMode: {
      control: 'select',
      options: ['cover', 'contain', 'stretch', 'center'],
    },
  },
};

export default meta;

export const AllImages = () => (
  <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 16, padding: 16}}>
    {/* Local images */}
    {Object.keys(ImagePaths).map(imageName => (
      <View key={imageName} style={{alignItems: 'center'}}>
        <ImageApp
          source={ImagePaths[imageName]}
          style={{width: 100, height: 100}}
        />
        <View style={{marginTop: 4}}>
          <Text style={{fontSize: 12}}>{imageName}</Text>
        </View>
      </View>
    ))}
  </View>
);
