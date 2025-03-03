const path = require('path');

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const withStorybook = require('@storybook/react-native/metro/withStorybook');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

// Lấy cấu hình mặc định từ Metro
const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

// Cấu hình của bạn, nếu có thêm cấu hình riêng có thể đặt ở đây
const customConfig = {
  // Thêm các cấu hình Metro tùy chỉnh nếu cần
  transformer: {
    babelTransformerPath: require.resolve(
      'react-native-svg-transformer/react-native',
    ),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

// Gộp cấu hình mặc định với cấu hình tùy chỉnh
const mergedConfig = mergeConfig(defaultConfig, customConfig);
const finalConfig = wrapWithReanimatedMetroConfig(mergedConfig);

// Gói cấu hình đã gộp với cấu hình của Reanimated
module.exports = withStorybook(finalConfig, {
  // Set to false to remove storybook specific options
  // you can also use a env variable to set this
  enabled: true,
  // Path to your storybook config
  configPath: path.resolve(__dirname, './.storybook'),

  // Optional websockets configuration
  // Starts a websocket server on the specified port and host on metro start
  // websockets: {
  //   port: 7007,
  //   host: 'localhost',
  // },
});
