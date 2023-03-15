import {createClient, dedupExchange, fetchExchange} from 'urql';
import {cacheExchange, query} from '@urql/exchange-graphcache';
import {
  LoginMutation,
  MeQuery,
  MeDocument,
  LogoutMutation,
  RegisterMutation,
  UpdateUserPictureMutation,
  CreatePhotoMutation,
  GetPhotosQuery,
  GetPhotosDocument,
} from '../generated/graphql';
import {betterUpdateQuery} from './betterUpdateQuery';
import {SERVER_URL} from './constants';
import {PushNotification} from 'react-native';

export const client = createClient({
  url: SERVER_URL,
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              {query: MeDocument},
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              },
            );
          },
          updateUserPicture: (_result, args, cache, info) => {
            console.log('triggered');

            betterUpdateQuery<UpdateUserPictureMutation, MeQuery>(
              cache,
              {query: MeDocument},
              _result,
              (result, query) => {
                console.log('trigerred');
                return {
                  me: {...query.me!, profile_picture: result.updateUserPicture},
                };
              },
            );
          },
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              {query: MeDocument},
              _result,
              () => {
                return {me: null};
              },
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              {query: MeDocument},
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              },
            );
          },
          createPhoto: (_result, args, cache, info) => {
            betterUpdateQuery<CreatePhotoMutation, GetPhotosQuery>(
              cache,
              {query: GetPhotosDocument},
              _result,
              (result, query) => {
                if (result.createPhoto !== null) {
                  return {getPhotos: [result.createPhoto, ...query.getPhotos!]};
                } else {
                  return {getPhotos: [...query.getPhotos!]};
                }
              },
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
});
