import { ref } from 'vue';
import Notify from 'src/utils/notify';
import { DirectoryMenuItemProps } from 'src/models/props';

export default function useFilePicker(options: {
  openFilePickerOptions: OpenFilePickerOptions;
  fileIcon: string;
  fileUpdatedCallBck?: () => void;
}) {
  const fileList = ref<DirectoryMenuItemProps[]>([]);
  const _fileHandleList = ref<FileSystemFileHandle[]>([]);

  const { openFilePickerOptions, fileIcon, fileUpdatedCallBck } = options;

  const getFile = async () => {
    try {
      _fileHandleList.value = await window.showOpenFilePicker(
        openFilePickerOptions
      );
    } catch (error) {
      Notify.error('没有选择文件');
      return;
    }
    for await (const item of _fileHandleList.value) {
      fileList.value.push(await _processFileHandle(item));
    }
    fileUpdatedCallBck && fileUpdatedCallBck();
  };
  const _processFileHandle = async (handle: FileSystemFileHandle) => {
    return {
      name: handle.name,
      icon: fileIcon,
      path: handle.name,
      content: await handle.getFile(),
    };
  };

  return {
    fileList,
    getFile,
  };
}
