const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];
const targetFolder = process.argv[3] || 'components';

if (!componentName) {
  console.error(
    'Vui lòng nhập tên component! Ví dụ: node createComponent.js Button',
  );
  process.exit(1);
}

// Xác định thư mục đích
const BASE_DIR = path.join(__dirname, 'src');
const VALID_FOLDERS = ['components', 'screens'];

if (!VALID_FOLDERS.includes(targetFolder)) {
  console.error("❌ Thư mục không hợp lệ! Chọn 'components' hoặc 'screens'.");
  process.exit(1);
}

const componentPath = path.join(BASE_DIR, targetFolder, componentName);

const componentTsx = `import React from 'react';
import {useStyles} from 'react-native-unistyles';
import {stylesheet} from './Test.style';

const T${componentName}Props = {};

export const ${componentName}: React.FC<T${componentName}Props> = () => {
  const {styles} = useStyles(stylesheet);

  return null;
};
`;

const componentStyle = `import {createStyleSheet} from 'react-native-unistyles';

export const stylesheet = createStyleSheet(() => ({}));
`;

const componentIndex = `export * from './${componentName}';`;

if (!fs.existsSync(componentPath)) {
  fs.mkdirSync(componentPath, {recursive: true});

  fs.writeFileSync(
    path.join(componentPath, `${componentName}.tsx`),
    componentTsx,
  );
  fs.writeFileSync(
    path.join(componentPath, `${componentName}.style.ts`),
    componentStyle,
  );
  fs.writeFileSync(path.join(componentPath, 'index.ts'), componentIndex);

  console.log(
    `✅ Component "${componentName}" đã được tạo thành công tại: ${componentPath}`,
  );
} else {
  console.error(`⚠️ Component "${componentName}" đã tồn tại!`);
}
