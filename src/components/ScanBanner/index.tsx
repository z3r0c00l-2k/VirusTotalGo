/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {
  Layout,
  Text,
  StyleService,
  useStyleSheet,
  Avatar,
} from '@ui-kitten/components';
import {checkApkResult, getAnalysis} from '../../utils/VirusTotalScanner';
import {useApkScanData} from '../../hooks/mmkvHooks';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import InstalledApps from '../../utils/InstalledApps';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';

type Props = {
  appsList?: ApkData[];
};

type ScanStatus = {
  totalApps: number;
  totalScanned: number;
  totalThreats: number;
};

const {width} = Dimensions.get('window');
const BTN_WIDTH = width / 2.5;

const ScanBanner = ({appsList}: Props) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanningApp, setScanningApp] = useState<ApkData | null>(null);
  const [currentScanStatusText, setCurrentScanStatusText] = useState('');
  const [scanStatus, setScanStatus] = useState<ScanStatus>({} as ScanStatus);

  const offset = useSharedValue(1);

  const styles = useStyleSheet(themedStyles);

  // useEffect(() => {
  //   setScanningApp(appsList[0]);
  //   return () => {};
  // }, []);

  useEffect(() => {
    if (isScanning) {
      offset.value = withRepeat(withTiming(1.2, {duration: 500}), -1, true);
    } else {
      offset.value = 1;
    }
    return () => {};
  }, [isScanning]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: offset.value}],
    };
  });

  const {updateScanData} = useApkScanData();

  const onScan = async () => {
    if (appsList) {
      setIsScanning(true);
      setScanStatus({
        totalApps: appsList.length,
        totalScanned: 0,
        totalThreats: 0,
      });
      const list: any = {};
      let newlyUploadedApps = [];
      for (const app of appsList) {
        setScanningApp(app);
        setCurrentScanStatusText('Calculating SHA-256...');
        const sha256 = await InstalledApps.getFileSha256(app.apkDir);
        app.fileSha256 = sha256;
        setCurrentScanStatusText('Scanning File...');
        const fileResult = await checkApkResult(app);
        if (!fileResult.pending) {
          setCurrentScanStatusText('');
          console.log({sha256});
          const isThreat = false;
          setScanStatus(prevData => ({
            ...prevData,
            totalScanned: prevData?.totalScanned + 1,
            totalThreats: prevData?.totalThreats + (isThreat ? 1 : 0),
          }));
          list[app.packageName] = fileResult;
        } else {
          newlyUploadedApps.push(fileResult);
        }
      }

      setCurrentScanStatusText('Getting File Analysis Data...');
      // getting newly uploaded files result
      for (const app of newlyUploadedApps) {
        const analysisResult = await getAnalysis(app.analysisId);
        if (analysisResult) {
          list[app.packageName] = analysisResult;
        }
      }
      setCurrentScanStatusText('');
      setIsScanning(false);
      updateScanData(list);
    }
  };

  return (
    <Layout style={styles.container}>
      <Text category="h5" style={styles.headerText}>
        VirusTotal Go
      </Text>
      <View style={styles.statusContainer}>
        {isScanning && (
          <>
            <Text category="c2">{currentScanStatusText}</Text>
            <View style={styles.appContainer}>
              <Avatar
                source={{uri: scanningApp?.icon}}
                style={{width: 40, height: 40}}
              />
              <View style={{marginLeft: 10}}>
                <Text category="h6">{scanningApp?.appName}</Text>
                <Text category="c1">{scanningApp?.packageName}</Text>
              </View>
            </View>
          </>
        )}
      </View>
      <View style={[styles.scanBtnContainer]}>
        <TouchableWithoutFeedback onPress={onScan}>
          <Animated.View style={[styles.scanBtnOut, animatedStyles]}>
            <View style={styles.scanBtnIn}>
              <Text category="h5" style={styles.scanBtnText}>
                {isScanning ? 'Scanning' : 'Scan'}
              </Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.scanningDetailsContainer}>
        {isScanning && (
          <>
            <View style={styles.scanStatusItem}>
              <Text category="s1">Total Apps : </Text>
              <Text category="s1">{scanStatus.totalApps}</Text>
            </View>
            <View style={styles.scanStatusItem}>
              <Text category="s1">Total Scanned : </Text>
              <Text category="s1">{scanStatus.totalScanned}</Text>
            </View>
            <View style={styles.scanStatusItem}>
              <Text category="s1">Total Threats : </Text>
              <Text category="s1">{scanStatus.totalThreats}</Text>
            </View>
          </>
        )}
      </View>
    </Layout>
  );
};

export default ScanBanner;

const themedStyles = StyleService.create({
  container: {
    paddingVertical: 10,
    flex: 1,
  },
  headerText: {
    textAlign: 'center',
  },
  scanBtnContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  scanBtnOut: {
    width: BTN_WIDTH,
    height: BTN_WIDTH,
    backgroundColor: 'color-primary-200',
    borderRadius: BTN_WIDTH / 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 10,
    overflow: 'hidden',
    padding: 10,
  },
  scanBtnIn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'color-primary-500',
    borderRadius: BTN_WIDTH / 2,
  },
  scanBtnText: {
    color: 'text-control-color',
  },
  statusContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  scanningDetailsContainer: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanStatusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
