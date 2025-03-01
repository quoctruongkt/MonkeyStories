import {
  copyFile,
  DocumentDirectoryPath,
  downloadFile,
  exists,
  mkdir,
  readDir,
} from '@dr.pogodin/react-native-fs';
import {unzip} from 'react-native-zip-archive';

const zipFile = `${DocumentDirectoryPath}/data/game.zip`;
const dataPath = `${DocumentDirectoryPath}/data`;
export const wordsPath = `${DocumentDirectoryPath}/words`;
export const unZipActivitiesPath = `${DocumentDirectoryPath}/unzip_activities`;
const zipActivitiesPath = `${DocumentDirectoryPath}/zip_activities`;

export const useDownloadData = () => {
  const createFolder = async (path: string): Promise<void> => {
    const isDirExist = await exists(path);
    if (!isDirExist) {
      await mkdir(path);
      console.log('createFolder', '✅ Đã tạo thư mục:', path);
      return;
    }

    console.log('createFolder', '⚠️ Thư mục đã tồn tại:', path);
  };

  const checkAndCopyFile = async (from: string, target: string) => {
    const isFileExist = await exists(target);
    if (!isFileExist) {
      return copyFile(from, target);
    }

    console.log('checkAndCopyFile', '⚠️ File đã tồn tại:', target);
  };

  const downloadData = async (): Promise<void> => {
    try {
      await createFolder(dataPath);
      await createFolder(wordsPath);
      await createFolder(unZipActivitiesPath);
      await createFolder(zipActivitiesPath);

      const download = downloadFile({
        fromUrl: 'https://vnmedia2.monkeyuni.net/Test/games.zip',
        toFile: zipFile,
      });
      await download.promise;
      console.log('downloadData', '✅ Tải xong', zipFile);

      await unzip(zipFile, dataPath);
      console.log('downloadData', '✅ Đã giải nén', zipFile);

      const files = await readDir(`${dataPath}/game`);
      console.log(
        'downloadData',
        '📂 Danh sách file trong thư mục games:',
        files,
      );

      for (const file of files) {
        if (file.name.endsWith('.zip')) {
          const zipPath = file.path;
          const unzipPath = zipPath.replace('.zip', ''); // Tạo thư mục cùng tên file ZIP
          console.log(
            'downloadData',
            `📦 Giải nén file: ${file.name} -> ${unzipPath}`,
          );

          await unzip(zipPath, unzipPath);
          console.log('downloadData', `✅ Đã giải nén: ${file.name}`);

          const fileName = file.name.replace('.zip', '');
          const gameFolder = await readDir(`${unzipPath}/${fileName}`);
          console.log(
            'downloadData',
            '📂 Danh sách file trong thư mục game:',
            gameFolder,
          );

          // copy toàn bộ thư mục word vào words
          const words = await readDir(`${unzipPath}/${fileName}/words`);
          console.log(
            'downloadData',
            '📂 Danh sách file trong thư mục words:',
            words,
          );
          for (const word of words) {
            await checkAndCopyFile(word.path, `${wordsPath}/${word.name}`);
          }
          console.log('downloadData', '✅ Đã copy vào words');

          // copy toàn bộ thư mục activities vào zip activities
          const activities = await readDir(
            `${unzipPath}/${fileName}/activities`,
          );
          console.log(
            'downloadData',
            '📂 Danh sách file trong thư mục activity:',
            activities,
          );
          for (const activity of activities) {
            await checkAndCopyFile(
              activity.path,
              `${zipActivitiesPath}/${activity.name}`,
            );
          }
          console.log('downloadData', '✅ Đã copy vào activitiesPath');

          //Giải nén activities
          const zipActivities = await readDir(zipActivitiesPath);
          for (const zipActivity of zipActivities) {
            const zipName = zipActivity.name;
            const folderName = zipName.replace('.zip', '');
            await createFolder(`${unZipActivitiesPath}/${folderName}`);
            await unzip(
              zipActivity.path,
              `${unZipActivitiesPath}/${folderName}`,
            );
          }
          console.log('downloadData', '✅ Đã giải nén vào activitiesPath');
        }
      }
    } catch (err: any) {
      console.error('downloadData', err.message);
    }
  };

  return {downloadData};
};
