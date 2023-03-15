import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {handleChoosePhoto} from '../../shared/UploadImageCloud';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/MainNavigator';
import {useCreatePhotoMutation, useMeQuery} from '../../generated/graphql';
import LoadingAnimation from '../../shared/LoadingAnimation';

type UploadProps = {};

export const Upload: React.FC<UploadProps> = () => {
  const [img, setImg] = React.useState<string | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Main'>>();

  const [{data, fetching}, createPhoto] = useCreatePhotoMutation();
  const [err, setErr] = React.useState<boolean>(false);

  const [me] = useMeQuery();

  React.useEffect(() => {
    if (data?.createPhoto === null) {
      setErr(true);
    }
  }, [data]);

  return (
    <>
      <LoadingAnimation loadingState={fetching} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: !img ? 'center' : 'space-between',
          padding: 10,
        }}>
        {img !== null && (
          <View
            style={{
              width: '100%',
              height: '54%',
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <Image
              source={{
                uri: img,
              }}
              style={{flex: 1, borderRadius: 10}}
            />
          </View>
        )}
        <View
          style={{
            width: '100%',
            backgroundColor: '#241332',
            //   borderTopLeftRadius: 80,
            //   borderTopRightRadius: 80,
            //   borderBottomLeftRadius: 80,
            marginBottom: '3%',
            borderRadius: 10,
            paddingBottom: 12,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              marginTop: 10,
              marginLeft: '10%',
            }}>
            {err ? (
              <Text style={{color: 'red', fontSize: 15}}>
                This photo doesn't have expressions!
              </Text>
            ) : (
              <Text style={{color: '#fff', fontSize: 26}}>Hello!</Text>
            )}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#998FA2',
              alignSelf: 'flex-start',
              marginTop: 10,
              marginLeft: '10%',
              width: '80%',
              marginBottom: 10,
            }}>
            Here you can select and upload you photos!
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (img !== null && !err) {
                createPhoto({options: {id: me.data?.me?.id!, url: img}});
              } else {
                handleChoosePhoto().then(url => {
                  setImg(url);
                  setErr(false);
                });
              }
            }}
            style={[style.button, {backgroundColor: '#8A56AC'}]}>
            <Text style={[style.buttonText, {color: '#fff'}]}>
              {img !== null && !err ? 'Upload' : 'Select'}
            </Text>
          </TouchableOpacity>
          {img !== null && (
            <TouchableOpacity
              onPress={() => {
                setImg(null);
              }}
              style={[style.button, {backgroundColor: '#D47FA6'}]}>
              <Text style={[style.buttonText, {color: '#fff'}]}>Discard</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}
            style={[style.button, {backgroundColor: '#998FA2'}]}>
            <Text style={[style.buttonText, {color: '#fff'}]}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  button: {
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 10,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
