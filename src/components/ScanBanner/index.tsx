import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Layout, Button, Text} from '@ui-kitten/components';
import {checkApkResult} from '../../utils/VirusTotalScanner';
import {useApkScanData} from '../../hooks/mmkvHooks';

type Props = {
  appsList?: ApkData[];
};

const ScanBanner = ({appsList}: Props) => {
  const {updateScanData} = useApkScanData();

  const onScan = async () => {
    if (appsList) {
      const list: any = {};
      for (const app of appsList) {
        const fileResult = await checkApkResult(app);
        console.log({fileResult});
        list[app.packageName] = fileResult;
      }
      updateScanData(list);
    }
  };

  return (
    <Layout style={styles.container}>
      <Text category="h5" style={styles.headerText}>
        VirusTotal Go
      </Text>
      <View />
      <Button onPress={onScan}>Scan</Button>
    </Layout>
  );
};

export default ScanBanner;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  headerText: {
    textAlign: 'center',
  },
});
