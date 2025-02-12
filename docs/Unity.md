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
