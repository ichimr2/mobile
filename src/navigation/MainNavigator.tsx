import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
// import {BottomNavigator} from './mainNavigator/BottomNavigator';
import DrawerScreen from './mainNavigator/Drawer';
import {BottomNavigator} from './mainNavigator/BottomNavigator';

export type RootStackParamList = {
  Main: undefined;
  Profile: undefined;
  Home: undefined;
};

const Stack = createDrawerNavigator<RootStackParamList>();

export const MainNavigator = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          drawerStyle: {
            height: '95%',
            alignSelf: 'center',
            marginTop: '5%',
            borderTopRightRadius: 50,
            overflow: 'hidden',
            borderBottomRightRadius: 50,
          },
        }}
        drawerContent={props => <DrawerScreen {...props} />}>
        <Stack.Screen
          options={{headerShown: false}}
          name="Main"
          component={BottomNavigator}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={BottomNavigator}
        />
      </Stack.Navigator>
    </>
  );
};
