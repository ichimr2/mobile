import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ErrorsField = {
  __typename?: 'ErrorsField';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPhoto?: Maybe<Photo>;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updateUserPicture: Scalars['String'];
};


export type MutationCreatePhotoArgs = {
  options: PhotoOptions;
};


export type MutationLoginArgs = {
  options: LoginOptions;
};


export type MutationRegisterArgs = {
  options: UserRegisterOptions;
};


export type MutationUpdateUserPictureArgs = {
  id: Scalars['Float'];
  url: Scalars['String'];
};

export type Photo = {
  __typename?: 'Photo';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  score: Scalars['Float'];
  state: Scalars['String'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
  user: User;
};

export type PhotoOptions = {
  id: Scalars['Float'];
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getPhotos: Array<Photo>;
  me?: Maybe<User>;
};


export type QueryGetPhotosArgs = {
  options?: InputMaybe<GetPhotosOptions>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  photos?: Maybe<Photo>;
  profile_picture?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type UserRegisterOptions = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type GetPhotosOptions = {
  sortBy?: InputMaybe<Scalars['String']>;
};

export type LoginOptions = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'userResponse';
  errors?: Maybe<Array<ErrorsField>>;
  user?: Maybe<User>;
};

export type RegularUserFragment = { __typename?: 'User', id: number, name: string, email: string, profile_picture?: string | null, createdAt: string, updatedAt: string };

export type CreatePhotoMutationVariables = Exact<{
  options: PhotoOptions;
}>;


export type CreatePhotoMutation = { __typename?: 'Mutation', createPhoto?: { __typename?: 'Photo', url: string, state: string, score: number, id: number } | null };

export type LoginMutationVariables = Exact<{
  options: LoginOptions;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'userResponse', user?: { __typename?: 'User', id: number, name: string, email: string, profile_picture?: string | null, createdAt: string, updatedAt: string } | null, errors?: Array<{ __typename?: 'ErrorsField', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UserRegisterOptions;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'userResponse', user?: { __typename?: 'User', id: number, name: string, email: string, profile_picture?: string | null, createdAt: string, updatedAt: string } | null, errors?: Array<{ __typename?: 'ErrorsField', field: string, message: string }> | null } };

export type UpdateUserPictureMutationVariables = Exact<{
  url: Scalars['String'];
  updateUserPictureId: Scalars['Float'];
}>;


export type UpdateUserPictureMutation = { __typename?: 'Mutation', updateUserPicture: string };

export type GetPhotosQueryVariables = Exact<{
  options?: InputMaybe<GetPhotosOptions>;
}>;


export type GetPhotosQuery = { __typename?: 'Query', getPhotos: Array<{ __typename?: 'Photo', url: string, state: string, score: number, id: number }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, name: string, email: string, profile_picture?: string | null, createdAt: string, updatedAt: string } | null };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  name
  email
  profile_picture
  createdAt
  updatedAt
}
    `;
export const CreatePhotoDocument = gql`
    mutation createPhoto($options: PhotoOptions!) {
  createPhoto(options: $options) {
    url
    state
    score
    id
  }
}
    `;

export function useCreatePhotoMutation() {
  return Urql.useMutation<CreatePhotoMutation, CreatePhotoMutationVariables>(CreatePhotoDocument);
};
export const LoginDocument = gql`
    mutation Login($options: loginOptions!) {
  login(options: $options) {
    user {
      ...RegularUser
    }
    errors {
      field
      message
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UserRegisterOptions!) {
  register(options: $options) {
    user {
      ...RegularUser
    }
    errors {
      field
      message
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateUserPictureDocument = gql`
    mutation updateUserPicture($url: String!, $updateUserPictureId: Float!) {
  updateUserPicture(url: $url, id: $updateUserPictureId)
}
    `;

export function useUpdateUserPictureMutation() {
  return Urql.useMutation<UpdateUserPictureMutation, UpdateUserPictureMutationVariables>(UpdateUserPictureDocument);
};
export const GetPhotosDocument = gql`
    query getPhotos($options: getPhotosOptions = {sortBy: "newest"}) {
  getPhotos(options: $options) {
    url
    state
    score
    id
  }
}
    `;

export function useGetPhotosQuery(options?: Omit<Urql.UseQueryArgs<GetPhotosQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPhotosQuery>({ query: GetPhotosDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};