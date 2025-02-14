# Phiên bản tương thích

- Tương thích với Unity `2022.3.57f1` trở lên.

- Unity `2022.1.20f1` hoạt động bình thường trên Android, nhưng bị lỗi khi chạy debug trên XCode.

# Cách run project với Unity

- Cần phải tải thư mục `unity/builds` từ CI hoặc tự build Unity theo hướng dẫn tại [link](https://github.com/azesmway/react-native-unity).
- Dọn dẹp và run project như bình thường.

# Một số lỗi thường gặp khi tích hợp

## 1. UnityPlayer cannot be converted to FrameLayout

- Cập nhật code trong `node_modules`:

```
public FrameLayout requestFrame() {
      try {
          //Attempt to invoke getFrameLayout() for the newer UnityPlayer class
          Method getFrameLayout = unityPlayer.getClass().getMethod("getFrameLayout");
          return (FrameLayout) getFrameLayout.invoke(unityPlayer);
      } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
          // If it is old UnityPlayer, use isInstance() and cast() to bypass incompatible type checks when compiling using newer versions of UnityPlayer
          if (FrameLayout.class.isInstance(unityPlayer)) {
              return FrameLayout.class.cast(unityPlayer);
          } else {
              return null;
          }
      }
  }
```

## 2. [CXX1100] android.ndkVersion is [27.0.12077973] but android.ndkPath ... refers to a different version [23.1.7779]

- Vào file `unity/builds/android/unityLibrary/build.gradle`, tìm kiếm `--tool-chain-path=` và sửa lại:

```
commandLineArgs.add("--tool-chain-path=" + android.ndkPath)
```

# Giao tiếp RN <-> Unity

## 1. Mục tiêu

- **Mô hình request/response**:
  Unity gửi yêu cầu (request) đến RN, RN xử lý nghiệp vụ và gửi lại phản hồi (response) với kết quả (resolve) hoặc lỗi (reject).

- **Định dạng thống nhất**:
  Mỗi message là một JSON với các trường:

  - id: Mã định danh duy nhất
  - type: Loại message (ví dụ: "getData")
  - payload: Dữ liệu yêu cầu hoặc kết quả (có thể chứa thông tin lỗi)

## 2. Quy trình giao tiếp

1. **Unity gửi yêu cầu đến RN:**

- Unity gửi một JSON message qua hàm như `UnityMessageManager.Instance.SendMessageToRN`
- Ví dụ:

```json
{
  "id": "abc123",
  "type": "getData",
  "payload": "Yêu cầu dữ liệu"
}
```

2. **RN nhận và xử lý yêu cầu:**

- Sau xử lý, RN gửi lại phản hồi qua postMessage với cùng `id` và `type`.
- Nếu thành công, RN gửi:

```json
{
  "id": "abc123",
  "type": "getData",
  "payload": {
    "success": true,
    "result": "Dữ liệu trả về"
  }
}
```

- Nếu có lỗi, RN gửi:

```json
{
  "id": "abc123",
  "type": "getData",
  "payload": {
    "success": false,
    "result": "Thông báo lỗi"
  }
}
```

## 3. Lưu ý cho Unity

- Đồng nhất định dạng message:
  Cả RN và Unity cần thống nhất về cấu trúc JSON (id, type, payload).

- Xử lý lỗi:
  Khi nhận phản hồi, kiểm tra payload.success (nếu có) để phân biệt giữa kết quả thành công và lỗi.

- Cấu hình UnityMessageManager:
  Đảm bảo rằng Unity đã tích hợp và cấu hình đúng UnityMessageManager (hoặc giải pháp tương đương) để nhận và gửi message.
