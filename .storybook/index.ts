import {view} from './storybook.requires';
import {storybookStorage} from '@/storage';

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: storybookStorage.getItem,
    setItem: storybookStorage.setItem,
  },
});

export default StorybookUIRoot;
