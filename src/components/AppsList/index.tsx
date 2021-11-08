/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ApkData} from '../../utils/InstalledApps';
import {Button, List, ListItem, Avatar} from '@ui-kitten/components';

type Props = {
  appsList?: ApkData[];
};

const AppsList = ({appsList}: Props) => {
  const renderItemAccessory = () => <Button size="tiny">FOLLOW</Button>;

  const renderItemIcon = (props: any, icon: string) => (
    <Avatar {...props} style={{tintColor: 'none'}} source={{uri: icon}} />
  );

  return (
    <View>
      <List
        data={appsList}
        keyExtractor={item => item.packageName}
        renderItem={({item}) => (
          <ListItem
            title={item.appName}
            description={item.packageName}
            accessoryLeft={props => renderItemIcon(props, item.icon)}
            accessoryRight={renderItemAccessory}
          />
        )}
      />
    </View>
  );
};

export default AppsList;

const styles = StyleSheet.create({});
