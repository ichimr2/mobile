import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {TextInputComponent} from '../../components/TextInput';
import {useLoginMutation, useRegisterMutation} from '../../generated/graphql';

import {LandingStackParamList} from '../../navigation/LandingNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

type formProps = {
  username: string;
  email: string;
  password: string;
  repeatPassword?: string;
};

const DEFAULT_STATE = {
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
};

type LoginSignUpControllerProps = {
  page: 'signup' | 'signin';
};

export const LoginSignUpController: React.FC<LoginSignUpControllerProps> = ({
  page,
}) => {
  StatusBar.setBackgroundColor('#241332', true);

  const [active, setActive] = React.useState<'signup' | 'signin'>(page);

  const [form, setForm] = React.useState<formProps>(DEFAULT_STATE);

  const [{data}, register] = useRegisterMutation();

  const [loginData, login] = useLoginMutation();

  const navigation =
    useNavigation<
      NativeStackNavigationProp<LandingStackParamList, 'LandingPage'>
    >();

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 40,
            paddingHorizontal: 25,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('LandingPage')}>
            <Icon name="chevron-back-outline" size={30} color="#fff" />
          </TouchableOpacity>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                setActive('signin');
                setForm(DEFAULT_STATE);
              }}
              style={active === 'signin' && styles.active}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  fontFamily: 'Montserrat',
                  color: active === 'signin' ? '#fff' : '#A7A0AD',
                }}>
                SIGN IN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setActive('signup');
                setForm(DEFAULT_STATE);
              }}
              style={[{marginLeft: 25}, active === 'signup' && styles.active]}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  fontFamily: 'Montserrat',
                  color: active === 'signup' ? '#fff' : '#A7A0AD',
                }}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
          <View />
        </View>
        <View style={{paddingHorizontal: 25, marginTop: 20}}>
          {/* If sign up is active */}
          {active === 'signup' && (
            <View>
              <TextInputComponent
                text={form.username}
                onTextChange={text => setForm({...form, username: text})}
                placeHolder="Username"
                name="Username"
                errors={data?.register.errors}
              />
              <TextInputComponent
                text={form.email}
                onTextChange={text => setForm({...form, email: text})}
                placeHolder="Email"
                name="Email"
                errors={data?.register.errors}
              />
              <TextInputComponent
                text={form.password}
                onTextChange={text => setForm({...form, password: text})}
                placeHolder="Password"
                secure={true}
                name="Password"
                errors={data?.register.errors}
              />
            </View>
          )}
          {/* End of sign up active */}

          {/* ----ELSE----- */}

          {/* If Sign In is active  */}

          {active === 'signin' && (
            <View>
              <TextInputComponent
                text={form.email}
                onTextChange={text => setForm({...form, email: text})}
                placeHolder="Email"
                name="Email"
                errors={loginData.data?.login.errors}
              />
              <TextInputComponent
                text={form.password}
                onTextChange={text => setForm({...form, password: text})}
                placeHolder="Password"
                secure={true}
                name="Password"
              />
            </View>
          )}

          {/* End of Sign In active */}
        </View>
      </View>

      <TouchableOpacity
        onPress={async () => {
          if (active === 'signup') {
            await register({
              options: {
                username: form.username,
                password: form.password,
                email: form.email,
              },
            });
          } else {
            await login({
              options: {
                password: form.password,
                email: form.email,
              },
            });
          }
        }}
        style={{
          backgroundColor: '#AE513D',
          borderTopLeftRadius: 70,
          height: 75,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            fontFamily: 'Montserrat',
            color: '#fff',
          }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#241332',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  active: {
    backgroundColor: '#D47FA6',
    borderRadius: 15,
    padding: 8,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
