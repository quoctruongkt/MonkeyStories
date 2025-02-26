# Monkeys Stories 📖 🐵

Ứng dụng học tiếng anh dành cho trẻ em, giúp bé nâng cao kỹ năng nghe, đọc, và phát âm qua các câu chuyện tương tác.

## Công nghệ sử dụng:

- **Ngôn ngữ & Môi trường**
  - [React Native 0.77.0](https://reactnative.dev/docs/0.77/environment-setup)
  - TypeScript
  - Unity
- **State Management**
  - [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
  - React Context API
- **Điều hướng**
  - [React Navigation](https://reactnavigation.org/docs/getting-started)
- **Xử lý API**
  - [Axios](https://axios-http.com/docs/intro)
  - [React Query](https://tanstack.com/query/v5/docs/framework/react/overview)
- **Lưu trữ**
  - [MMKV](https://github.com/Tencent/MMKV)
- **Xử lý hình ảnh**
  - [react-native-turbo-image](https://github.com/duguyihou/react-native-turbo-image)
- **Xác thực người dùng**
- **Push Notification**
- **Test & Debugging**
  - Jest
  - [Reactotron](https://docs.infinite.red/reactotron/)
  - DevTools
- **CI/CD & Deployment**

## Yêu cầu hệ thống

### Windows

- Hệ điều hành: Windows 10/11 (64-bit)
- Bộ vi xử lý: Intel Core i5 trở lên hoặc tương đương
- RAM: Tối thiểu 8GB (Khuyến nghị 16GB)

### macOS

- Hệ điều hành: macOS Ventura (13.x) trở lên
- Bổ vi xử lý: Apple Silicon hoặc Intel Core i5 trở lên
- RAM: Tối thiểu 8GB (Khuyến nghị 16GB)

### Yêu cầu phần mềm

1. Node.js & npm/yarn

- Phiên bản Node.js: `>=18.x.x` (khuyến nghị Node 20LTS)
- Trình quản lý gói: npm `>=9.x.x`.
  📌 Kiểm tra phiên bản đã cài:

  ```sh
  node -v
  npm -v
  ```

2. Java Development Kit (JDK)

- JDK `>=17`
  📌 Kiểm tra phiên bản đã cài:

```sh
java -version
```

3. XCode

- Xcode `>=15.x.x`
- CocoaPods `>=1.14.0`
- Command Line Tools

## Cài đặt & Chạy dự án

### 1. Clone project

```sh
git clone git@github.com:quoctruongkt/MonkeyStories.git
cd MonkeyStories
```

### 2. Cài đặt Unity

- Tải Unity tại
- Copy mục vừa tải vào thư mục `unity/builds/`

### 3. Cài đặt dependencies

```sh
npm i
npx pod-install
```

### 4. Chạy ứng dụng trên thiết bị/emulator

- Android

```sh
npm run android
```

- iOS
  Mở thư mục `ios/MonkeyStores.scworkspace` bằng XCode và chạy trên thiết bị thật (không chạy được trên simulator)

## Quy tắc commit code

`<type>:<mô tả commit>`
_Các type được định nghĩa trong thư mục docs_

## FAQ & Troubleshooting
