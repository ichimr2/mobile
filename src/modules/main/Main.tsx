import React from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {useGetPhotosQuery} from '../../generated/graphql';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {Keyboard} from 'react-native';
import Ant from 'react-native-vector-icons/AntDesign';

enum sortOptions {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export const Main: React.FC = () => {
  const [searchActive, setSearchActive] = React.useState<boolean>(false);
  const [sortBy, setSortBy] = React.useState<sortOptions>(sortOptions.NEWEST);
  const [dropActive, setDropActive] = React.useState<boolean>(false);

  const [myPhotos] = useGetPhotosQuery({
    variables: {options: {sortBy: sortBy}},
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setSearchActive(false);
      }}
      style={style.container}>
      {/* Modal */}
      {/* <SortModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setActiveFilter={setActiveFilter}
        activeFilter={activeFilter}
      /> */}
      {/* End of Modal */}
      {/* Header and search bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: searchActive ? 'flex-start' : 'space-between',
          marginTop: 20,
          height: 40,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (searchActive) setSearchActive(false);
          }}>
          <Icon name="chevron-back-outline" size={35} color="#fff" />
        </TouchableOpacity>
        {!searchActive ? (
          <TouchableOpacity onPress={() => setSearchActive(!searchActive)}>
            <Feather name="search" color="#fff" size={20} />
          </TouchableOpacity>
        ) : (
          <TextInput
            autoFocus={true}
            style={{width: '80%', height: '100%', color: '#fff'}}
            placeholderTextColor="#fff"
            placeholder="Search here..."
          />
        )}
      </View>
      {/* End of header and searchbar */}

      <View style={style.hairStylist}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-end',
            marginBottom: 15,
          }}>
          <Text style={{fontSize: 10, fontWeight: '500', color: '#000'}}>
            SortBy:
          </Text>
          <View style={{position: 'relative'}}>
            <TouchableOpacity
              onPress={() => setDropActive(!dropActive)}
              style={{
                borderWidth: 1,
                borderColor: '#000',
                padding: 4,
                marginLeft: 4,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: '#000',
                  textTransform: 'capitalize',
                }}>
                {sortBy}
              </Text>
              <Ant
                name="caretdown"
                size={11}
                color="#000"
                style={{marginLeft: 3}}
              />
            </TouchableOpacity>
            {dropActive && (
              <View
                style={{
                  position: 'absolute',
                  bottom: -52,
                  backgroundColor: '#fff',
                  width: '100%',
                  marginLeft: 4,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: '#000',
                  zIndex: 10,
                  padding: 1,
                }}>
                {(
                  Object.keys(sortOptions) as Array<keyof typeof sortOptions>
                ).map((key, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSortBy(sortOptions[key]);
                        setDropActive(false);
                      }}
                      key={index}
                      style={{
                        width: '100%',
                        backgroundColor:
                          sortBy === key.toLowerCase() ? '#c4c4c4' : '#fff',
                        padding: 4,
                      }}>
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '700',
                          color: '#000',
                          textTransform: 'capitalize',
                          marginLeft: 2,
                        }}>
                        {key}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </View>

        <ScrollView style={{marginBottom: '35%'}}>
          {myPhotos.data?.getPhotos?.map(item => {
            return (
              <View
                key={item.id}
                style={{
                  width: '100%',
                  height: 275,
                  marginVertical: 10,
                }}>
                <Image
                  style={{height: 250, borderRadius: 10}}
                  source={{uri: item.url}}
                />
                <Text style={{color: '#000'}}>
                  {item.state} (Based on the last 7 days)
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#2E1643',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  hairStylist: {
    width: '100%',
    zIndex: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
});
