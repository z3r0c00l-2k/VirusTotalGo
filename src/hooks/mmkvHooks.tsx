import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';
import {Appearance} from 'react-native';

const MMKV: MMKVStorage.API = new MMKVStorage.Loader().initialize();
type LiteralUnion<T extends U, U = string> = T | (U & {});

export const useStorage = (
  key: LiteralUnion<'user' | 'password'>,
  defaultValue?: string | boolean | null,
) => {
  const [value, setValue] = useMMKVStorage(key, MMKV, defaultValue);
  return [value, setValue];
};

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useStorage(
    'isDarkMode',
    Appearance.getColorScheme() === 'dark',
  );

  return {
    isDarkMode,
    setIsDarkMode,
  };
};
