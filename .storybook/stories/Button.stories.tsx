import React, {useState} from 'react';
import {View} from 'react-native';
import type {Meta, StoryObj} from '@storybook/react';
import {Switch} from '../../src/components';

const SwitchWithState = () => {
  const [isOn, setIsOn] = useState(true);
  return <Switch value={isOn} onChange={setIsOn} />;
};

const meta = {
  title: 'components/Switch',
  component: SwitchWithState,
  decorators: [
    Story => (
      <View style={{padding: 16, alignItems: 'flex-start'}}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof SwitchWithState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {};
