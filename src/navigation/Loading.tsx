import React from 'react';
import {View, Text} from 'react-native';

export const Loading = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          color: '#000',
        }}>
        Loading...
      </Text>
    </View>
  );
};
