import { defineStore } from 'pinia';
import { Dark, LocalStorage } from 'quasar';

interface DarkState {
  mode: boolean;
}

export default defineStore('dark', () => {
  const switchDarkMode = () => {
    const value: boolean = _getDarkMode()!;
    Dark.set(!value);
    LocalStorage.set('dark', { mode: !value });
  };
  const initDarkMode = (value: boolean) => {
    if (!LocalStorage.has('dark')) {
      LocalStorage.set('dark', { mode: value });
    }
    Dark.set(_getDarkMode()!);
  };
  const _getDarkMode: () => boolean | undefined = () => {
    if (LocalStorage.has('dark')) {
      return (LocalStorage.getItem('dark') as DarkState).mode;
    }
  };
  return {
    switchDarkMode,
    initDarkMode,
  };
});
