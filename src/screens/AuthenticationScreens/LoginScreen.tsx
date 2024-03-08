import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';

import AppTextInput from '../../Components/AppTextInput';
import {AppButton} from '../../Components/AppButton';
import {loginUser} from '../../store/userSlice';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const schema: any = yup.object().shape({
    username: yup
      .string()
      .required('Please enter your registered username')
      .min(4, 'Username must be 4 char long'),
    password: yup
      .string()
      .required('Please enter password')
      .trim()
      .min(4, 'Password must be 4 char long'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = handleSubmit(async values => {
    Keyboard.dismiss();
    const dataa = {
      username: values.username,
      password: values.password,
    };
 await dispatch(loginUser(dataa));
  });

  const globalTheme = useSelector((x: any) => x);

  let ColorDetails: any = globalTheme?.selectedColor?.themeColorrs;
  if (ColorDetails?.color) {
    ColorDetails = ColorDetails;
  } else {
    ColorDetails = JSON.parse(ColorDetails);
  }

  return (
    <ScrollView contentContainerStyle={{flex: 1, backgroundColor: '#031629'}}>
      <View style={style.container}>
        <Text style={[style.welcomeBack, {color: ColorDetails.color}]}>
          Welcomeback
        </Text>
        <Text style={[style.continuesign, {color: ColorDetails.forgetPass}]}>
          continue to sign in
        </Text>

        <Text style={[style.name, {color: ColorDetails.color}]}>Name</Text>

        <AppTextInput
          name="username"
          outerViewProps={{style: {height: 47, borderRadius: 5}}}
          control={control}
          textInputProps={{
            placeholder: '',
            style: {
              backgroundColor: ColorDetails.fields,
            },
          }}
        />
        {errors.username && (
          <Text style={style.errorField}>{errors.username['message']}</Text>
        )}
        <Text style={[style.name, {color: ColorDetails.color}]}>Password</Text>
        <AppTextInput
          testID="password"
          name="password"
          outerViewProps={{style: {height: 47, borderRadius: 5}}}
          control={control}
          textInputProps={{
            secureTextEntry: true,
            placeholder: '',
            style: {
              backgroundColor: ColorDetails.fields,
            },
          }}
        />
        {errors.password && (
          <Text style={style.errorField}>{errors.password['message']}</Text>
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgetPasswordScreen');
          }}>
          <Text style={[style.forgetText, {color: ColorDetails.forgetPass}]}>
            Forget password?
          </Text>
        </TouchableOpacity>

        <AppButton
          testID="submitBtn"
          text={'Sign in'}
          loaderColor={'black'}
          buttonProps={{
            onPress: onSubmit,
            style: [style.signinBtn, {backgroundColor: ColorDetails.btnColor}],
          }}
          innerTextProps={{
            style: {
              color: ColorDetails.btnText,
              fontSize: 15,
            },
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={[style.contin, {color: ColorDetails.color}]}>
            {'Don’t have an account? click here to'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegisterScreen');
            }}>
            <Text style={[style.signup, {color: ColorDetails.btnColor}]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default LoginScreen;

const style = StyleSheet.create({
  signinBtn: {
    marginVertical: 20,
    marginTop: 20,
    height: 47,
    width: '100%',
    borderRadius: 5,
  },
  contin: {
    opacity: 0.5,
    textAlign: 'center',
  },
  errorField: {
    fontSize: 10,
    color: 'red',
    fontFamily: 'Cairo-SemiBold',
  },
  signup: {
    opacity: 0.8,
    textAlign: 'center',
    marginLeft: 4,
    fontWeight: '700',
  },
  container: {
    marginTop: 80,
    padding: 25,
    justifyContent: 'center',
  },
  welcomeBack: {
    fontSize: 40,
    marginTop: 50,
    fontWeight: '600',
  },
  continuesign: {
    fontSize: 22,
    marginTop: 5,
    marginBottom: 10,
  },
  name: {
    marginTop: 40,
    fontSize: 14,
  },
  forgetText: {
    fontSize: 13,

    marginBottom: 20,
    marginTop: 5,
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
});
