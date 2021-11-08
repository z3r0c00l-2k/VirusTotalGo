import {NativeModules} from 'react-native';

const {RNInstalledApps} = NativeModules;

export type ApkData = {
  apkDir: string;
  appName: string;
  icon: string;
  packageName: string;
  versionName: string;
  versionCode: number;
  firstInstallTime: number;
  lastUpdateTime: number;
  size: number;
};

const InstalledApps = {
  getApps(): Promise<ApkData[]> {
    return RNInstalledApps.getApps();
  },
  getUserApps(): Promise<ApkData[]> {
    return RNInstalledApps.getUserApps();
  },
  getSystemApps(): Promise<ApkData[]> {
    return RNInstalledApps.getSystemApps();
  },
};

export default InstalledApps;
