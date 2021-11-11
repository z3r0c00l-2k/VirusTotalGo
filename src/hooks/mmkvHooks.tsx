import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';
import {Appearance} from 'react-native';

const MMKV: MMKVStorage.API = new MMKVStorage.Loader().initialize();
type LiteralUnion<T extends U, U = string> = T | (U & {});

export const useStorage = (
  key: LiteralUnion<'user' | 'password'>,
  defaultValue?: any,
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

export const useApkScanData = () => {
  const [apkScanData, setApkScanData] = useStorage('apkScanData', {});

  const updateScanData = (newList: Object) => {
    const newData = {...apkScanData, ...newList};
    setApkScanData(newData);
  };

  return {apkScanData, updateScanData};
};
