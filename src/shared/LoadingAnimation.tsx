import React from 'react';
import {View, Text} from 'react-native';
import Anim1 from './lottie-animations/blue-dotsies.json';
import Anim2 from './lottie-animations/purple-ripple.json';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

type LoadingAnimation = {
  loadingState: boolean;
};

const LoadingAnimation: React.FC<LoadingAnimation> = ({loadingState}) => {
  if (!loadingState) return null;
  return (
    <LinearGradient
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      colors={['#000000', '#2C2248', '#544188']}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0.8,
        zIndex: 9999900,
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LottieView
          source={Anim2}
          style={{transform: [{scale: 1.3}]}}
          autoPlay
          loop
        />
      </View>
      <LottieView
        source={Anim1}
        style={{transform: [{scale: 0.8}]}}
        autoPlay
        loop
      />
      <Text
        style={{
          color: '#fff',
          textAlign: 'center',
          position: 'absolute',
          top: '65%',
          left: '40%',
          fontSize: 18,
          fontWeight: '500',
          fontFamily: 'Poppins',
        }}>
        Loading...
      </Text>
    </LinearGradient>
  );
};

export default LoadingAnimation;
