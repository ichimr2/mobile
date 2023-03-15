import React from 'react';
import {TextInput, View, Text} from 'react-native';
import {ErrorsField} from '../generated/graphql';

type textInputProps = {
  text: string | undefined;
  onTextChange: (text: string) => void;
  placeHolder?: string;
  autoFocus?: boolean;
  secure?: boolean;
  errors?: ErrorsField[] | null;
  name: string;
};

export const TextInputComponent: React.FC<textInputProps> = ({
  text,
  onTextChange,
  placeHolder = 'Search',
  autoFocus,
  secure,
  errors,
  name,
}) => {
  const [localErrors, setLocalErrors] = React.useState(errors);

  React.useEffect(() => {
    setLocalErrors(errors);
  }, [errors]);
  return (
    <View style={{marginTop: 20}}>
      <TextInput
        style={{
          color: '#fff',
          fontSize: 16,
          fontFamily: 'Montserrat',
          fontWeight: '600',
        }}
        placeholderTextColor="#fff"
        placeholder={placeHolder}
        numberOfLines={1}
        value={text}
        onChangeText={props => {
          onTextChange(props);
          setLocalErrors(undefined);
        }}
        autoFocus={autoFocus}
        secureTextEntry={secure}
      />
      <View style={{width: '100%', height: 1, backgroundColor: '#352641'}} />
      <View>
        {localErrors &&
          localErrors
            .filter(i => i.field === name)
            .map((item, index) => {
              return (
                <Text key={index} style={{color: 'red'}}>
                  {item.message}
                </Text>
              );
            })}
      </View>
    </View>
  );
};
