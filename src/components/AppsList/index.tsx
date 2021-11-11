/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, List, ListItem} from '@ui-kitten/components';
import {convertBytes} from '../../utils/FilesizeHelper';
import {useApkScanData} from '../../hooks/mmkvHooks';

type Props = {
  appsList?: ApkData[];
};

const AppsList = ({appsList}: Props) => {
  const {apkScanData} = useApkScanData();

  console.log({apkScanData});

  const renderItemAccessory = () => <Button size="tiny">FOLLOW</Button>;

  const renderItemIcon = (props: any, icon: string) => (
    <Image {...props} style={styles.appIcon} source={{uri: icon}} />
  );

  return (
    <View style={{flex: 1}}>
      <List
        data={appsList}
        keyExtractor={item => item.packageName}
        renderItem={({item}) => (
          <ListItem
            title={item.appName}
            description={convertBytes(item.size)}
            accessoryLeft={props => renderItemIcon(props, item.icon)}
            accessoryRight={renderItemAccessory}
          />
        )}
      />
    </View>
  );
};

export default AppsList;

const styles = StyleSheet.create({
  appIcon: {width: 32, height: 32, borderRadius: 16},
});
