import {useQuery} from 'react-query';
import InstalledApps from '../utils/InstalledApps';

const getAllApps = async () => {
  const apps = await InstalledApps.getApps();
  return apps;
};
export const useAllApps = () => {
  const query = useQuery('allApps', getAllApps);
  return query;
};

const getUserApps = async () => {
  const apps = await InstalledApps.getUserApps();
  return apps;
};
export const useUserApps = () => {
  const query = useQuery('userApps', getUserApps);
  return query;
};

const getSystemApps = async () => {
  const apps = await InstalledApps.getSystemApps();
  return apps;
};
export const useSystemApps = () => {
  const query = useQuery('systemApps', getSystemApps);
  return query;
};
