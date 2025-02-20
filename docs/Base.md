# Cách tạo nhanh một components hoặc một màn hình

- Trong terminal chạy script sau:

```
node create componentName
```

- Hệ thống sẽ tự sinh ra thư mục ComponentName cùng với file cần thiết
- Để tạo màn hình thì thêm thuộc tính `screens` vào sau:

```
node create screenName screens
```

# Quy tắc commit code:

## 1. Điều kiện

- Trước khi commit sẽ chạy `lint`, nếu có lỗi trong rules thì sẽ từ chối commit

## 2. Cấu trúc commit message

```
<type>(<scope>): <message>
```

- `<type>`: Loại commit (bắt buộc, phải thuộc danh sách type-enum).
- `<scope>`: Phạm vi ảnh hưởng của commit (tùy chọn).
- `<message>`: Mô tả ngắn gọn về thay đổi (bắt buộc, không quá 100 ký tự).

## 3. Các loại commit hợp lệ (type-enum)

| Type     | Ý nghĩa                                                                              |
| -------- | ------------------------------------------------------------------------------------ |
| feat     | Thêm tính năng mới                                                                   |
| fix      | Sửa lỗi                                                                              |
| chore    | Công việc phụ trợ (không ảnh hưởng code chính, ví dụ: update package)                |
| docs     | Cập nhật tài liệu                                                                    |
| style    | Thay đổi về coding style (không ảnh hưởng logic, ví dụ: chỉnh format, thêm dấu cách) |
| refactor | Cải thiện code mà không thay đổi chức năng (ví dụ: tối ưu code, làm sạch code)       |
| test     | Thêm hoặc cập nhật test cases                                                        |
| revert   | Hoàn tác (revert) commit trước đó                                                    |
| ci       | Cấu hình CI/CD                                                                       |

# Unity

## 1. `UnityBridge` là gì?

- `UnityBridge` là lớp trung gian dùng để giao tiếp giữa React Native và Unity. Nó cung cấp các phương thức base để gửi yêu cầu từ RN ➡️ Unity và xử lý phản hồi khi nhận được yêu cầu từ Unity ➡️ React native.

### Phụ thuộc

- Yêu cầu:

  - `unityRef`: Tham chiếu đến đối tượng Unity cần giao tiếp.
  - `onMessageHandler`: Hàm callback xử lý message nhận từ Unity theo logic nghiệp vụ.

- Hằng số:

  - `EUnityGameObject`: Định nghĩa tên của đối tượng Unity.
  - `EUnityMethodName`: Định nghĩa tên các phương thức của Unity.

- Kiểu dữ liệu:
  - `TMessageUnity`: Kiểu message được xử dụng để gửi và nhận dữ liệu.
- Hàm tiện ích:
  - `generateId`: Sinh mã định danh duy nhất cho mỗi message.

## 2. Làm sao để send message sang Unity?

- Sử dụng hook `useUnity` để lấy hàm `sendMessageToUnity` và gửi message theo định dạng `TMessageUnity` (bao gồm id, type, và payload). Ví dụ:

```typescript
import React from 'react';
import {useUnity} from './path/to/UnityProvider';

const MyComponent = () => {
  const {sendMessageToUnity} = useUnity();

  const handleSendMessage = () => {
    const message = {
      id: 'uniqueMessageId123', // Sinh id duy nhất cho mỗi message
      type: 'ACTION_TYPE', // Loại hành động cần gửi
      payload: {
        // Dữ liệu cụ thể cần gửi sang Unity
        key: 'value',
      },
    };

    sendMessageToUnity(message);
  };

  return <Button onClick={handleSendMessage}>Gửi Message Sang Unity</Button>;
};

export default MyComponent;
```

## 2. Xử lý message Unity gửi sang như thế nào?

- Có 2 chỗ có thể xử lý message mà Unity truyền sang:
  - Ở màn hình cụ thể: Xử lý logic cho tính năng cụ thể nào đó. Nếu màn nào cần xử lý message thì sẽ gọi `registerHandler`. Ví dụ:

```typescript
const ScreenA = () => {
  const {registerHandler, unregisterHandler} = useUnity();

  useEffect(() => {
    // Đăng ký handler cho message type TYPE_A
    registerHandler(EMessageTypeUN.TYPE_A, async data => {
      console.log('ScreenA xử lý TYPE_A với data:', data);
      // Thực hiện xử lý logic của ScreenA cho TYPE_A
      return 'Kết quả từ ScreenA cho TYPE_A';
    });

    // Đăng ký handler cho message type TYPE_B
    registerHandler(EMessageTypeUN.TYPE_B, async data => {
      console.log('ScreenA xử lý TYPE_B với data:', data);
      // Xử lý logic cho TYPE_B
      return 'Kết quả từ ScreenA cho TYPE_B';
    });

    // Hủy đăng ký khi ScreenA unmount
    return () => {
      unregisterHandler(EMessageTypeUN.TYPE_A);
      unregisterHandler(EMessageTypeUN.TYPE_B);
    };
  }, [registerHandler, unregisterHandler]);

  return (
    <View>
      <Text>Screen A</Text>
    </View>
  );
};
```

- Ở trong `UnityProvider`: Xử lý cho các message chung

# Download data học

## 1. Cấu trúc thư mục lưu trữ

```
document/
├── data/
├── words/
|   └── *.bundle
├── zip_activities/
└── unzip_activities/
|   └── [activity_id]
|       ├── config.json
|       ├── list_word.json
|       ├── word.json
|       └── list_word_rule.json
```

# Icons

## 1. Các bước để thêm icon

- Bước 1: Truy cập [link](https://svgps.app/) để tạo file `selection.json`.
-
