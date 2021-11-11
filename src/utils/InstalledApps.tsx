import {NativeModules} from 'react-native';

const {RNInstalledApps} = NativeModules;

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
  getFileSha256(apkDir: string): Promise<string> {
    return RNInstalledApps.getFileSha256(apkDir);
  },
};

export default InstalledApps;
