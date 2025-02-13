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
