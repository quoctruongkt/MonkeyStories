import React from 'react';
import {Text, View} from 'react-native';
import {FlatListApp} from '../../src/components';

const data = Array.from({length: 50}, (_, i) => ({
  id: i.toString(),
  title: `Item ${i + 1}`,
}));

const renderItem = ({item}: {item: {id: string; title: string}}) => (
  <View
    style={{
      padding: 16,
      backgroundColor: '#f0f0f0',
      marginVertical: 4,
      marginHorizontal: 16,
      borderRadius: 8,
    }}>
    <Text>{item.title}</Text>
  </View>
);

const meta = {
  title: 'components/FlatListApp',
  component: FlatListApp,
};

export default meta;

export const Basic = {
  args: {
    data,
    renderItem,
    estimatedItemSize: 60,
  },
};

export const WithSeparator = {
  args: {
    data,
    renderItem,
    estimatedItemSize: 60,
    ItemSeparatorComponent: () => (
      <View style={{height: 1, backgroundColor: '#ddd'}} />
    ),
  },
};

export const EmptyList = {
  args: {
    data: [],
    renderItem,
    estimatedItemSize: 60,
    ListEmptyComponent: () => (
      <View style={{padding: 16, alignItems: 'center'}}>
        <Text>No items to display</Text>
      </View>
    ),
  },
};
