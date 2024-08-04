import { ref } from 'vue';
import Notify from 'src/utils/notify';
import { DirectoryMenuItemProps } from 'src/models/props';

export default function useDirectoryPicker(options: {
  directoryUpdatedCallBack?: () => void;
}) {
  const { directoryUpdatedCallBack } = options;

  const directory = ref<DirectoryMenuItemProps>();
  const dirHandle = ref<FileSystemDirectoryHandle>();
  const fileList = ref<DirectoryMenuItemProps[]>([]);

  const getDirectory = async () => {
    try {
      dirHandle.value = await window.showDirectoryPicker({
        mode: 'read',
      });
    } catch (error) {
      Notify.error('没有选择文件夹');
      return;
    }
    directory.value = await processDirectoryHandle(
      dirHandle.value!,
      `${dirHandle.value.name}`
    );
    directoryUpdatedCallBack && directoryUpdatedCallBack();
  };
  const processDirectoryHandle = async (
    handle: FileSystemDirectoryHandle | FileSystemFileHandle,
    path: string
  ): Promise<DirectoryMenuItemProps> => {
    if (handle instanceof FileSystemFileHandle) {
      const file = {
        name: handle.name,
        path,
        icon: getFileIcon(handle.name),
        content: await handle.getFile(),
      };
      fileList.value.push(file);
      return file;
    }
    const children: DirectoryMenuItemProps[] = [];
    (await getProperDirectoryList(handle.values())).forEach(
      async (item: FileSystemDirectoryHandle | FileSystemFileHandle) => {
        children.push(
          await processDirectoryHandle(item, `${path}/${item.name}`)
        );
      }
    );
    return {
      name: handle.name,
      expanded: false,
      path,
      icon: 'mdi-folder-outline',
      children,
    };
  };
  const getProperDirectoryList = async (
    iter: AsyncIterableIterator<
      FileSystemDirectoryHandle | FileSystemFileHandle
    >
  ): Promise<(FileSystemDirectoryHandle | FileSystemFileHandle)[]> => {
    const out: (FileSystemDirectoryHandle | FileSystemFileHandle)[] = [];
    for await (const item of iter) {
      out.push(item);
    }
    return out;
  };

  const getFileIcon = (fileName: string): string => {
    const fileExtension = fileName.split('.').pop();
    switch (fileExtension) {
      case 'gitignore':
      case 'gitkeep':
        return 'mdi-git';
      case 'md':
        return 'mdi-language-markdown';
      case 'vue':
        return 'mdi-vuejs';
      case 'ts':
        return 'mdi-language-typescript';
      case 'js':
        return 'mdi-language-javascript';
      case 'json':
        return 'mdi-code-json';
      case 'md':
        return 'mdi-markdown';
      case 'html':
        return 'mdi-language-html5';
      case 'css':
        return 'mdi-language-css3';
      case 'scss':
        return 'mdi-language-css3';
      case 'sass':
        return 'mdi-language-sass';
      case 'less':
        return 'mdi-language-css3';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return 'mdi-file-image';
      case 'svg':
        return 'mdi-svg';
      case 'c':
        return 'mdi-language-c';
      case 'cpp':
        return 'mdi-language-cpp';
      case 'cs':
        return 'mdi-language-csharp';
      case 'go':
        return 'mdi-language-go';
      case 'java':
        return 'mdi-language-java';
      default:
        return 'mdi-file';
    }
  };

  const switchItemExpansion = (
    item: DirectoryMenuItemProps,
    value: boolean
  ) => {
    if (item.children) {
      item.expanded = value;
      item.children.forEach((item) => switchItemExpansion(item, value));
    }
  };
  return {
    directory,
    fileList,
    getDirectory,
    switchItemExpansion,
  };
}
