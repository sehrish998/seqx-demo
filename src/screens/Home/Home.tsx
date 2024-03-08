import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {logOutUser} from '../../store/userSlice';
import {useGetAllTodo} from '../../Hooks/Auth/useGetPosts';

const Home = () => {
  const navigation = useNavigation<any>();
  const getAllPosts = useGetAllTodo();
  const dispatch = useDispatch();
  const userState: any = useSelector((state: any) => state.user);

  var userdata: any = userState?.user;
  if (userdata?.username) {
    userdata = userState?.user;
  } else {
    userdata = JSON.parse(userState?.user);
  }

  return (
    <ScrollView contentContainerStyle={{flex: 1, backgroundColor: 'black'}}>
      <View style={{flex: 1}}>
        <Text
          style={style.welcome}>
          Welcome Back
        </Text>
        <Text
          style={style.user}>
          {userdata?.user?.username
            ? userdata?.user?.username
            : userdata?.username}
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={getAllPosts.data}
          refreshControl={
            <RefreshControl
              refreshing={getAllPosts.isLoading}
              colors={['#76a9ff']}
              progressBackgroundColor={'#ECF3FF'}
            />
          }
          renderItem={({item, index}: any) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PostDetails', {item: item});
                }}
                key={item.userId}
                style={style.container}>
                <Text style={style.title}>{item.title}</Text>
                <Text style={style.body}>{item.body}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <TouchableOpacity
        onPress={async () => {
          await dispatch(logOutUser());
          navigation.navigate('LoginScreen');
        }}>
        <Text style={style.logout}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default Home;

const style = StyleSheet.create({
  errorField: {
    fontSize: 10,
    color: 'red',
    fontFamily: 'Cairo-SemiBold',
  },
  logout: {
    color: 'white',
    fontSize: 14,
    marginLeft: 25,
    marginTop: 20,
    textTransform: 'capitalize',
    textDecorationLine: 'underline',
  },
  body: {
    marginTop: 10,
    color: 'white',
    fontSize: 12,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#024873',
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 20,
    margin: 20,
  },
  user:{
    color: 'white',
    fontSize: 22,
    marginLeft: 25,
    marginVertical: 20,
    textTransform: 'capitalize',
  },
  welcome:{
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 30,
  }
});
