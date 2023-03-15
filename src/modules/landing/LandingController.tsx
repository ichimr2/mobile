import React from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LandingStackParamList} from '../../navigation/LandingNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type navOptions = 'signin' | 'signup';

export const LandingController: React.FC = () => {
  const bgimage = require('../../assets/image.png');
  const navigation =
    useNavigation<
      NativeStackNavigationProp<LandingStackParamList, 'LandingPage'>
    >();

  return (
    <View style={styles.container}>
      <Image source={bgimage} style={styles.BgImage} />

      <Text style={styles.title}>{`Welcome\nto Meet Up`}</Text>
      <Text style={styles.subTitle}>
        {`The best way to meet people and try new\nactivities. Let’s get started!`}
      </Text>

      <View style={styles.btnsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginSignUp', {page: 'signin'})}
          style={[styles.btnCont, {backgroundColor: '#9599B3'}]}>
          <Text style={styles.btnText}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginSignUp', {page: 'signup'})}
          style={[styles.btnCont, {backgroundColor: '#241332'}]}>
          <Text style={styles.btnText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  BgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  btnCont: {
    width: '100%',
    paddingVertical: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 250,
  },
  btnsContainer: {
    width: '100%',
    backgroundColor: '#9599B3',
    borderTopLeftRadius: 71,
  },
  btnText: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    fontWeight: '600',
    color: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Montserrat',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 45,
    marginTop: 15,
  },
});
