import { ref, onUnmounted } from 'vue';
import { DirectoryMenuItemProps } from 'src/models/props';
import { useUrl } from 'src/utils/url';
const { createObjectUrl, revokeAllUrls } = useUrl();

export default function useFileViewerTabs() {
  const fileTabs = ref<DirectoryMenuItemProps[]>([]);
  const currentTabName = ref<string | undefined>(undefined);

  const viewFileContent = (item: DirectoryMenuItemProps) => {
    if (item.code) {
      currentTabName.value = item.path;
      return;
    }
    const fileExtension = item.name.split('.').pop();
    switch (fileExtension) {
      case 'png':
      case 'jpg':
      case 'jpeg': {
        item.src = createObjectUrl(item.content!);
        currentTabName.value = item.path;
        break;
      }
      default: {
        const reader = new FileReader();
        reader.readAsText(item.content!, 'UTF-8');
        reader.onload = (e) => {
          item.code = e.target!.result as string;
          currentTabName.value = item.path;
        };
      }
    }
  };
  const addTab = (item: DirectoryMenuItemProps) => {
    // 该文件不存在tab中则添加，再获取内容，若存在则直接切换到该tab
    if (!fileTabs.value.find((tab) => tab.path === item.path)) {
      fileTabs.value.push(item);
    }
    viewFileContent(item);
  };
  const deleteTabByIndex = (tab: DirectoryMenuItemProps, i: number) => {
    // 删掉tab
    fileTabs.value = fileTabs.value.filter((_, index) => index !== i);
    // 删掉的不是当前tab，不需要切换
    if (currentTabName.value !== tab.path) {
      return;
    }
    // 删掉的是当前tab且当前只有一个tab，则置为undefined
    if (fileTabs.value.length === 0) {
      currentTabName.value = undefined;
      return;
    }
    // 删掉的是当前tab且为第一个tab，切换到后一个tab
    if (i === 0) {
      currentTabName.value = fileTabs.value[0].path;
      return;
    }
    // 其他情况下切换到前一个tab
    currentTabName.value = fileTabs.value[i - 1].path;
  };
  const resetTabs = () => {
    fileTabs.value = [];
    currentTabName.value = undefined;
  };
  onUnmounted(() => {
    revokeAllUrls();
  });
  return {
    fileTabs,
    currentTabName,
    resetTabs,
    addTab,
    viewFileContent,
    deleteTabByIndex,
  };
}
