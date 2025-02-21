import {
  DocumentDirectoryPath,
  readDir,
  ReadDirResItemT,
  readFile,
} from '@dr.pogodin/react-native-fs';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import JSONTree from 'react-native-json-tree';
import {useStyles} from 'react-native-unistyles';

import {stylesheet} from './Files.styles';

const theme = {
  base00: '#ffffff', // Màu nền
  base0D: '#007AFF', // Màu key JSON
  base09: '#D35400', // Màu value số
  base0B: '#27AE60', // Màu value boolean
};

export const Files: React.FC = () => {
  const {styles} = useStyles(stylesheet);
  const [files, setFiles] = useState<ReadDirResItemT[]>([]); // Danh sách file/thư mục
  const [currentPath, setCurrentPath] = useState<string>(DocumentDirectoryPath); // Đường dẫn hiện tại
  const [selectedJson, setSelectedJson] = useState<string | null>(null);
  const [jsonData, setJsonData] = useState<any>(null);

  useEffect(() => {
    loadFiles(currentPath);
  }, [currentPath]);

  // Hàm load danh sách file/thư mục
  const loadFiles = async (dirPath: string) => {
    try {
      const fileList = await readDir(dirPath);
      setFiles(fileList);
    } catch (error) {
      console.error('Lỗi đọc thư mục:', error);
    }
  };

  // Lấy thư mục cha mà không cần path.dirname()
  const getParentPath = (fullPath: string): string => {
    const parts = fullPath.split('/'); // Tách đường dẫn thành mảng
    parts.pop(); // Loại bỏ phần cuối (thư mục hiện tại)
    return parts.join('/'); // Ghép lại thành đường dẫn mới
  };

  const handlePress = async (item: ReadDirResItemT) => {
    if (item.isDirectory()) {
      setCurrentPath(item.path); // Nếu là thư mục, vào bên trong
    } else {
      const fileName = item.name;
      if (fileName.endsWith('.json')) {
        try {
          const content = await readFile(item.path, 'utf8');
          setJsonData(JSON.parse(content));
          setSelectedJson(item.path);
        } catch (error) {
          console.error('Lỗi đọc file JSON:', error);
          Alert.alert('Lỗi', 'Không thể đọc file JSON!');
        }
      } else {
        Alert.alert('Lỗi', 'Không thể mở file này.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Nút quay lại (ẩn nếu đang ở thư mục gốc) */}
      {currentPath !== DocumentDirectoryPath && (
        <TouchableOpacity
          onPress={() => setCurrentPath(getParentPath(currentPath))}
          style={styles.buttonBack}>
          <Text>⬅️ Quay lại</Text>
        </TouchableOpacity>
      )}

      {/* Hiển thị danh sách file/thư mục */}
      {/* Hiển thị JSON nếu file được chọn */}
      {selectedJson ? (
        <View style={styles.jsonContainer}>
          {/* Nút quay lại danh sách file */}
          <TouchableOpacity
            onPress={() => setSelectedJson(null)}
            style={styles.jsonBack}>
            <Text>⬅️ Quay lại danh sách file</Text>
          </TouchableOpacity>

          <BottomSheetScrollView>
            {jsonData ? (
              <JSONTree data={jsonData} theme={theme} />
            ) : (
              <Text>Đang tải JSON...</Text>
            )}
          </BottomSheetScrollView>
        </View>
      ) : (
        <FlatList
          data={files}
          keyExtractor={item => item.path}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handlePress(item)}
              style={styles.item}>
              <Text>
                {item.isDirectory() ? '📁 ' : '📄 '} {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};
