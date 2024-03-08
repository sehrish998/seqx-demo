import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const PostDetails = (props: any) => {

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
        <Text style={style.postDetailText}>Post Details</Text>
        <Text style={style.userText}>
          {userdata?.user?.username
            ? userdata?.user?.username
            : userdata?.username}
        </Text>

        <View key={props.route.params.item.userId} style={style.container}>
          <Text style={style.titleText}>{props.route.params.item.title}</Text>
          <Text style={style.bodyText}>{props.route.params.item.body}</Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default PostDetails;

const style = StyleSheet.create({
  postDetailText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 30,
  },
  container: {
    backgroundColor: '#024873',
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 25,
    margin: 35,
  },
  bodyText: {
    color: 'white',
    fontSize: 12,
    textTransform: 'capitalize',
    textAlign: 'center',
    marginTop: 10,
  },
  titleText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  userText: {
    color: 'white',
    fontSize: 22,
    marginLeft: 25,
    marginTop: 20,
    textTransform: 'capitalize',
  },
});
