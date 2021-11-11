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
};

export default InstalledApps;
