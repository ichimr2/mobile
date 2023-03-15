import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Title, Drawer} from 'react-native-paper';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  useLogoutMutation,
  useMeQuery,
  useUpdateUserPictureMutation,
} from '../../generated/graphql';
import {handleChoosePhoto} from '../../shared/UploadImageCloud';

const DrawerScreen: React.FC<DrawerContentComponentProps> = props => {
  const [img, setImg] = React.useState<string | null>(null);

  const [{data}] = useMeQuery();
  const [, logOut] = useLogoutMutation();
  const [, updateProfile] = useUpdateUserPictureMutation();

  const ImagePicker = async () => {
    handleChoosePhoto().then((url: string) => {
      updateProfile({
        url,
        updateUserPictureId: data?.me?.id!,
      });
      setImg(url);
    });
  };

  const onLogout = () => logOut();

  return (
    <LinearGradient
      style={{flex: 1}}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      colors={['#241332', '#1A2871']}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 15,
                alignItems: 'center',
              }}>
              {data?.me?.profile_picture || img ? (
                <View
                  style={{
                    borderWidth: 2.5,
                    borderColor: '#fff',
                    borderRadius: 50,
                    position: 'relative',
                  }}>
                  <Avatar.Image
                    source={{
                      uri: img ? img : data?.me?.profile_picture!,
                    }}
                    size={100}
                  />
                  <TouchableOpacity
                    onPress={() => ImagePicker()}
                    style={{
                      padding: 5,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      borderRadius: 50,
                      right: -5,
                      bottom: -5,
                    }}>
                    <Icon name="camera-outline" size={25} color="#000" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{position: 'relative'}}>
                  <FontAwesome
                    name="user-circle-o"
                    size={100}
                    color="#c4c4c4"
                  />

                  <TouchableOpacity
                    onPress={() => ImagePicker()}
                    style={{
                      padding: 5,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      borderRadius: 50,
                      right: -5,
                      bottom: -5,
                    }}>
                    <Icon name="camera-outline" size={25} color="#000" />
                  </TouchableOpacity>
                </View>
              )}

              <View style={{flexDirection: 'column'}}>
                <Title style={styles.title}>{data?.me?.name}</Title>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              style={{borderTopWidth: 0.3, borderTopColor: '#D4D4D4'}}
              inactiveTintColor="#fff"
              icon={({size}) => (
                <SimpleIcons name="user-follow" color="#fff" size={size} />
              )}
              label="Test"
              onPress={() => {
                props.navigation.navigate('Main');
              }}
            />
            <DrawerItem
              style={{borderTopWidth: 0.3, borderTopColor: '#D4D4D4'}}
              inactiveTintColor="#fff"
              icon={({size}) => (
                <SimpleIcons name="settings" color="#fff" size={size} />
              )}
              label="Test"
              onPress={() => {
                props.navigation.navigate('Settings');
              }}
            />
            <DrawerItem
              style={{borderTopWidth: 0.3, borderTopColor: '#D4D4D4'}}
              inactiveTintColor="#fff"
              icon={({size}) => (
                <Icon name="md-help-outline" color="#fff" size={size} />
              )}
              label="Test"
              onPress={() => {
                props.navigation.navigate('Help');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={{justifyContent: 'center', alignItems: 'center'}}>
        <DrawerItem
          onPress={onLogout}
          style={styles.bottomDrawerSection}
          inactiveTintColor="#fff"
          icon={({size}) => (
            <Icon name="exit-outline" color="#fff" size={size} />
          )}
          label="Log Out"
        />
      </Drawer.Section>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 0,
  },
  title: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 60,
  },
  bottomDrawerSection: {
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 25,
    width: '60%',
    paddingLeft: 5,
    textAlign: 'center',
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerScreen;
