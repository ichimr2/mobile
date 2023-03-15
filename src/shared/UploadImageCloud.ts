import {ToastAndroid} from 'react-native';
import * as ImagePicker from 'react-native-image-picker/src';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import React from 'react';
import {CLOUDINARY_URL} from '../utils/constants';

export const handleChoosePhoto = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', includeBase64: true},
      async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets) {
          ToastAndroid.show('Uploading...', ToastAndroid.LONG);

          return ImageResizer.createResizedImage(
            response.assets[0].uri!,
            720,
            720,
            'PNG',
            75,
            0,
            RNFS.DocumentDirectoryPath,
          ).then(async resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64').then(
              async responseData => {
                const data = new FormData();
                data.append('file', `data:image/png;base64,${responseData}`);
                data.append('upload_preset', 'l3sycdc7');
                data.append('cloud_name', 'dbcazdgbx');
                fetch(CLOUDINARY_URL, {
                  method: 'POST',
                  body: data,
                })
                  .then(async res => {
                    return res.json();
                  })
                  .then(response => {
                    return resolve(response.url);
                  })
                  .catch(err => {
                    console.log(err.response);
                    return reject(false);
                  });
              },
            );
          });
        }
      },
    );
  });
};
