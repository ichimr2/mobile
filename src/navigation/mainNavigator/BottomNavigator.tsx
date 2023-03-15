import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Home} from './bottomNavigator/Home';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../constants/style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../MainNavigator';
import {DrawerActions} from '@react-navigation/native';
import FeIcon from 'react-native-vector-icons/Feather';
import {UploadPhoto} from './bottomNavigator/UploadPhoto';

const Tab = createBottomTabNavigator();

const EmptyComponent: React.FC = () => {
  return null;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export const BottomNavigator: React.FC<Props> = ({navigation}) => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let icon = require('../../assets/bottomBar/plus.png');
            let name = 'home';
            if (route.name === 'Home') {
              icon = require('../../assets/bottomBar/sm-solid-home.png');
              name = 'home';
            } else if (route.name === 'Upload') {
              icon = require('../../assets/bottomBar/ios-calendar.png');
              name = 'plus-square';
            } else if (route.name === 'Profile') {
              icon = require('../../assets/bottomBar/sm-solid-friends.png');
              name = 'user';
            }
            const tintColor = focused ? colors.accent : '#273C66';
            return route.name !== 'Profile' ? (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <FeIcon name={name} color={tintColor} size={25} />
                <Text style={{color: focused ? colors.accent : '#273C66'}}>
                  {route.name}
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  navigation.dispatch(DrawerActions.openDrawer());
                }}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <FeIcon name="user" color={tintColor} size={25} />
                <Text style={{color: focused ? colors.accent : '#273C66'}}>
                  {route.name}
                </Text>
              </TouchableOpacity>
            );
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: '#273C66',

          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            height: 80,
          },
          headerShown: false,
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Upload" component={UploadPhoto} />
        <Tab.Screen name="Profile" component={Home} />
      </Tab.Navigator>
    </>
  );
};
