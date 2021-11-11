import React from 'react';
import {useAllApps} from '../hooks/queryHooks';
import AppsList from '../components/AppsList';
import MainLayout from '../layouts/MainLayout';
import ScanBanner from '../components/ScanBanner';

const HomeScreen = () => {
  const {data: appsList} = useAllApps();

  console.log({appsList: appsList});

  return (
    <MainLayout>
      <ScanBanner appsList={appsList} />
      <AppsList appsList={appsList} />
    </MainLayout>
  );
};

export default HomeScreen;
