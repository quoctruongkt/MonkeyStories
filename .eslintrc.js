module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['import'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Module có sẵn của Node.js (fs, path, http, ...)
          'external', // Thư viện bên thứ 3 (react, lodash, axios, ...)
          'internal', // Module nội bộ trong dự án (utils, services, components, ...)
          'parent', // Import từ thư mục cha
          'sibling', // Import từ cùng cấp
          'index', // Import từ index file
          'object', // Import dạng object (ví dụ: import * as utils from './utils')
          'type', // Import chỉ có type (TypeScript)
        ],
        'newlines-between': 'always', // Thêm 1 dòng trống giữa các nhóm import
        alphabetize: {order: 'asc', caseInsensitive: true}, // Sắp xếp import theo thứ tự bảng chữ cái
      },
    ],
    'react-native/no-inline-styles': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
