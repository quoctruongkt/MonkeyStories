# Monkeys Stories 📖 🐵

Ứng dụng học tiếng anh dành cho trẻ em, giúp bé nâng cao kỹ năng nghe, đọc, và phát âm qua các câu chuyện tương tác.

## Giới thiệu

Monkeys Stories là một ứng dụng giáo dục tương tác, được thiết kế đặc biệt để giúp trẻ em học tiếng Anh một cách thú vị và hiệu quả. Ứng dụng kết hợp công nghệ Unity để tạo ra trải nghiệm học tập sinh động thông qua các câu chuyện tương tác.

### Tính năng chính

- 🎯 Học tiếng Anh qua các câu chuyện tương tác
- 🎮 Trải nghiệm học tập gamification
- 🎤 Luyện phát âm với công nghệ nhận diện giọng nói
- 📚 Thư viện nội dung phong phú
- 🏆 Hệ thống theo dõi tiến độ và phần thưởng
- 👨‍👩‍👧‍👦 Giao diện thân thiện với trẻ em

## Kiến trúc hệ thống

### Công nghệ sử dụng

| Danh mục | Công nghệ | Phiên bản/Mô tả |
|----------|-----------|------------------|
| **Ngôn ngữ & Môi trường** | [React Native](https://reactnative.dev/docs/0.77/environment-setup) | 0.77.0 |
| | TypeScript | Ngôn ngữ lập trình type-safe |
| | Unity | Game engine tích hợp |
| **State Management** | [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) | State management đơn giản và hiệu quả |
| | React Context API | Quản lý state nội bộ |
| **Điều hướng** | [React Navigation](https://reactnavigation.org/docs/getting-started) | Thư viện điều hướng chính thức |
| **Xử lý API** | [Axios](https://axios-http.com/docs/intro) | HTTP Client |
| | [React Query](https://tanstack.com/query/v5/docs/framework/react/overview) | Quản lý data fetching và caching |
| **Lưu trữ** | [MMKV](https://github.com/Tencent/MMKV) | Lưu trữ key-value hiệu năng cao |
| **Xử lý hình ảnh** | [react-native-turbo-image](https://github.com/duguyihou/react-native-turbo-image) | Tối ưu hiệu năng hình ảnh |
| **Test & Debugging** | Jest | Unit testing framework |
| | [Reactotron](https://docs.infinite.red/reactotron/) | Debug và inspect ứng dụng |
| | DevTools | Công cụ phát triển tích hợp |

### Cấu trúc Project

```
├── src/                    # Thư mục source code chính
│   ├── assets/            # Hình ảnh, fonts, và các tài nguyên
│   ├── components/        # Components tái sử dụng
│   ├── constants/         # Các hằng số dùng chung
│   ├── contexts/          # React Context
│   ├── hooks/             # Custom hooks
│   ├── navigation/        # Cấu hình điều hướng
│   ├── screens/           # Các màn hình của ứng dụng
│   ├── services/          # Xử lý API và services
│   ├── storage/           # Quản lý lưu trữ local
│   ├── store/             # Zustand store
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Các hàm tiện ích
├── unity/                 # Thư mục chứa Unity build
└── docs/                  # Tài liệu dự án
```

## Yêu cầu hệ thống

### Phần cứng

#### Windows

- Hệ điều hành: Windows 10/11 (64-bit)
- Bộ vi xử lý: Intel Core i5 trở lên hoặc tương đương
- RAM: Tối thiểu 8GB (Khuyến nghị 16GB)

#### macOS

- Hệ điều hành: macOS Ventura (13.x) trở lên
- Bộ vi xử lý: Apple Silicon hoặc Intel Core i5 trở lên
- RAM: Tối thiểu 8GB (Khuyến nghị 16GB)

### Phần mềm

1. **Node.js & npm**

   - Node.js: `>=18.x.x` (khuyến nghị Node 20LTS)
   - npm: `>=9.x.x`
     📌 Kiểm tra phiên bản:

   ```sh
   node -v
   npm -v
   ```

2. **Java Development Kit (JDK)**

   - JDK: `>=17`
     📌 Kiểm tra phiên bản:

   ```sh
   java -version
   ```

3. **XCode (cho macOS)**
   - Xcode: `>=15.x.x`
   - CocoaPods: `>=1.14.0`
   - Command Line Tools

## Hướng dẫn cài đặt

### 1. Clone project

```sh
git clone git@github.com:quoctruongkt/MonkeyStories.git
cd MonkeyStories
```

### 2. Cài đặt Unity

- Tải Unity tại [Unity Download](https://unity.com/download)
- Copy mục vừa tải vào thư mục `unity/builds/`

### 3. Cài đặt dependencies

```sh
npm i
npx pod-install
```

### 4. Chạy ứng dụng

#### Android

```sh
npm run android
```

#### iOS

```sh
npm run ios
```

## Quy tắc phát triển

### Git Workflow

Sử dụng Git Flow với các nhánh chính:

- `main`: Code production
- `develop`: Code phát triển
- `feature/*`: Tính năng mới
- `bugfix/*`: Sửa lỗi
- `release/*`: Chuẩn bị release

### Quy ước Commit

Tuân thủ chuẩn Conventional Commits:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Ví dụ:

- feat: thêm tính năng đăng nhập
- fix: sửa lỗi crash ở màn hình home
- docs: cập nhật tài liệu API

### Code Style

- Tuân thủ ESLint và Prettier đã được cấu hình trong project
- Sử dụng TypeScript cho type-safety
- Viết unit test cho các logic quan trọng

## Đóng góp

1. Fork project
2. Tạo nhánh feature mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'feat: thêm tính năng mới'`)
4. Push lên nhánh (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

Dự án được phân phối dưới giấy phép [MIT](LICENSE).

## Liên hệ

Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, vui lòng liên hệ với chúng tôi qua:

- Email: [email]
- Website: [website]
- Discord: [discord]
