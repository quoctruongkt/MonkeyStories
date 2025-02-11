const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

// Lấy cấu hình mặc định từ Metro
const defaultConfig = getDefaultConfig(__dirname);

// Cấu hình của bạn, nếu có thêm cấu hình riêng có thể đặt ở đây
const customConfig = {
  // Thêm các cấu hình Metro tùy chỉnh nếu cần
};

// Gộp cấu hình mặc định với cấu hình tùy chỉnh
const mergedConfig = mergeConfig(defaultConfig, customConfig);

// Gói cấu hình đã gộp với cấu hình của Reanimated
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
