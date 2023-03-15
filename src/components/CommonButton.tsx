import React from 'react';
import {GestureResponderEvent, Text, TouchableOpacity} from 'react-native';

type CommonButtonProps = {
  name: string;
  active: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

const CommonButton: React.FC<CommonButtonProps> = ({name, active, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '70%',
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: active ? '#8A56AC' : '#9599B3',
        borderRadius: 10,
        marginTop: 10,
      }}>
      <Text
        style={{
          color: '#fff',
          fontSize: 16,
          fontWeight: '500',
          fontFamily: 'Poppins',
          textAlign: 'center',
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};
export default CommonButton;
