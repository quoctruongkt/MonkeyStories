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

## 3. Lỗi với thư viện `IngameDebugConsole` trên Android

- Các bước fix lỗi:

1. Trong thư mục gốc `android`, tạo thư mục mới với tên `IngameDebugConsole`.
2. Di chuyển file `IngameDebugConsole.aar` từ thư mục `unity/builds/android/unityLibrary/libs/` sang thư mục vừa tạo.
3. Trong thư mục `android/IngameDebugConsole/`, tạo file `build.gradle` với nội dung:

```gradle
configurations.maybeCreate("default")
artifacts.add("default", file('IngameDebugConsole.aar'))
```

4. Sửa file `android/settings.gradle` để thêm module mới:

```gradle
include ':IngameDebugConsole'
project(':IngameDebugConsole').projectDir = file('./IngameDebugConsole')

include ':unityLibrary'
project(':unityLibrary').projectDir = new File('..\\unity\\builds\\android\\unityLibrary')
```

5. Trong file `unity/builds/android/unityLibrary/build.gradle`, thay đổi dòng dependency từ:

```gradle
implementation(name: 'IngameDebugConsole', ext:'aar')
```

thành:

```gradle
implementation project(':IngameDebugConsole')
```

> Note: Có thể áp dụng tương tự với các thư viện khác

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

> ⚠️ Lưu ý: result cần chuyển thành `string` để unity có thể đọc được

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

## 4. Các message RN → UN

| Type          | Payload                                       | Mô tả                                 |
| ------------- | --------------------------------------------- | ------------------------------------- |
| `open_map`    | [TOpenMapPayload](#--topenmappayload)         | Yêu cầu mở map học                    |
| `orientation` | [TOrientationPayload](#--torientationpayload) | Yêu cầu Unity thực hiện xoay màn hình |
| `open_unity`  | [TOpenUnityPayload](#--topenunitypayload)     | Yêu cầu mở Unity                      |
|               |                                               |                                       |

## 5. Các message UN -> RN

| Type            | Payload                                       | Result                                      | Mô tả                                                          |
| --------------- | --------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------- |
| `CloseUnity`    | `null`                                        | `null`                                      | Unity yêu cầu đóng map                                         |
| `GetDataLesson` | [TLessonPressPayload](#--tlessonpresspayload) | [TLessonPressResult](#--tlessonpressresult) | Unity bấm vào lesson trong map. Trả về data của lesson được ấn |
| `FinishLesson`  | [TLessonDonePayload](#--tlessondonepayload)   | [TLessonDoneResult](#--tlessondoneresult)   | Unity báo đã học xong. Trả về trạng thái map mới               |
|                 |                                               |                                             |                                                                |

## 6. Types

### - TOpenUnityPayload

```
{
  destination: string
}
```

### - TOpenMapPayload

```typescript
enum ELessonStatus {
  Lock = 1,
  Doing = 2,
  Done = 3
}

type TLessonItem {
  lesson_id: number;
  status: ELessonStatus;
}

type TOpenMapPayload = {
  list_lesson: TLessonItem[];
};
```

- Ví dụ:

```typescript
{
  id: "123",
  type: "open_map",
  payload: {
    list_lesson: [
      {
        lesson_id: 123,
        status: 1
      },
      {
        lesson_id: 456,
        status: 2
      },
      {
        lesson_id: 789,
        status: 3
      },
    ]
  }
}
```

### - TLessonPressPayload

```typescript
type TLessonPressPayload = {
  lesson_id: number;
};
```

### - TLessonPressResult

```typescript
type TLessonPressResult = {
  activity_path: string;
  word_path: string;
  game_id: number;
};
```

- Ví dụ:

```typescript
{
  id: "123",
  type: "GetDataLesson",
  payload: {
    success: true,
    result: {
      game_id: 123,
      activity_path: "src/data/activity",
      word_path: "src/data/word"
    }
  }
}
```

### - TLessonDonePayload

```typescript
type TLessonDonePayload = {
  lesson_id: number;
  status: ELessonStatus;
};
```

### - TLessonDoneResult

```typescript
type TLessonDoneResult = TOpenMapPayload;
```

- Ví dụ:

```typescript
{
  id: "123",
  type: "GetDataLesson",
  payload: {
    success: true,
    result: {
      list_lesson: [
        {
          lesson_id: 123,
          status: 1
        },
        {
          lesson_id: 456,
          status: 2
        },
        {
          lesson_id: 789,
          status: 3
        },
      ]
    }
  }
}
```

# - TOrientationPayload

```typescript
enum EOrientationToUnity {
  PORTRAIT = 'PORTRAIT',
  LANDSCAPE_LEFT = 'LANDSCAPE-LEFT',
  LANDSCAPE_RIGHT = 'LANDSCAPE-RIGHT',
}

type TOrientationPayload = {
  orientation: EOrientationToUnity;
};
```

- Ví dụ:

```typescript
{
  id: "123",
  type: "orientation",
  payload: {
    orientation: 'PORTRAIT'
  }
}
```
