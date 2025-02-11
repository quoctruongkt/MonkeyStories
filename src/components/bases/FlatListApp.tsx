import {FlashList, FlashListProps} from '@shopify/flash-list';
import React from 'react';

interface FlatListAppProps<TItem> extends FlashListProps<TItem> {
  renderItem: FlashListProps<TItem>['renderItem'];
}

export function FlatListApp<TItem>(props: FlatListAppProps<TItem>) {
  return <FlashList {...props} />;
}
