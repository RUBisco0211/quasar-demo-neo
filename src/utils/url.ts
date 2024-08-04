export const useUrl = () => {
  const urlMap = new Map<Blob, string>();
  return {
    createObjectUrl: (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      urlMap.set(blob, url);
      return url;
    },
    revokeAllUrls: () => {
      urlMap.forEach(URL.revokeObjectURL);
      urlMap.clear();
    },
  };
};
