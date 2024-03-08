import {View, StyleSheet, Image} from 'react-native';
import React from 'react'; 
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const WelcomeScreen = () => {
  const navigation = useNavigation<any>();
  const globalTheme = useSelector((x: any) => x);

  let ColorDetails: any = globalTheme?.selectedColor?.themeColorrs;
  if (ColorDetails?.color) {
    ColorDetails = ColorDetails;
  } else {
    ColorDetails = JSON.parse(ColorDetails);
  }

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        navigation.navigate('LoginScreen');
      }, 3000);
    }, []),
  );

  return (
    <View style={style.container}>
      <Image source={require("../../Assets/pngs/AppiconSeq.png")} style={{height:100, width:120 , resizeMode:"contain"}} />
    </View>
  );
};

export default WelcomeScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{color: 'white', fontSize: 26, fontWeight: '700'}
});
