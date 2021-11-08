import React from 'react';
import {useUserApps} from '../hooks/queryHooks';
import AppsList from '../components/AppsList';
import MainLayout from '../layouts/MainLayout';

const HomeScreen = () => {
  const {data: appsList} = useUserApps();

  // console.log({appsList});

  return (
    <MainLayout>
      <AppsList appsList={appsList} />
    </MainLayout>
  );
};

export default HomeScreen;
