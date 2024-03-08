import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useSelector} from 'react-redux';

import AppTextInput from '../../Components/AppTextInput';
import {AppButton} from '../../Components/AppButton';

const schema = yup.object().shape({
  username: yup.string().required('*Please enter your name').trim(),
  email: yup
    .string()
    .required('*Please enter email.')
    .email('Please enter a valid email address.')
    .trim(),
  password: yup
    .string()
    .required('*Please enter password')
    .min(8, 'Password should be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{9,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    ),
  confirmPassword: yup
    .string()
    .required('*Please enter confirm password')
    .oneOf([yup.ref('password'), null], 'Confirm Password does not match'),
});

const RegisterScreen = () => {
  const navigation = useNavigation<any>();

  const [checkBox, setCheckBox] = useState(false);
  const [errorCheckBox, setErrorCheckbox] = useState('');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((values: any) => {
    if (checkBox) {
      setErrorCheckbox('');
      Keyboard.dismiss();
    } else {
      setErrorCheckbox('To continue, please agree to our Terms & Conditions');
    }
  });
  const globalTheme = useSelector((x: any) => x);

  let ColorDetails: any = globalTheme?.selectedColor?.themeColorrs;
  if (ColorDetails?.color) {
    ColorDetails = ColorDetails;
  } else {
    ColorDetails = JSON.parse(ColorDetails);
  }

  return (
    <ScrollView contentContainerStyle={{backgroundColor: 'black', flex: 1}}>
      <View style={style.container}>
        <Text style={[style.welcomeText, {color: ColorDetails.color}]}>
          Welcomeback
        </Text>
        <Text style={[style.signText, {color: ColorDetails.forgetPass}]}>
          Continue to sign up
        </Text>

        <Text style={[style.nameText, {color: ColorDetails.color}]}>Name</Text>

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
        <Text
         style={[style.nameText, {color: ColorDetails.color}]}>
          Email
        </Text>
        <AppTextInput
          name="email"
          outerViewProps={{style: {height: 47, borderRadius: 5}}}
          control={control}
          textInputProps={{
            placeholder: '',
            style: {
              backgroundColor: ColorDetails.fields,
            },
          }}
        />
        {errors.email && (
          <Text style={style.errorField}>{errors.email['message']}</Text>
        )}
        <Text
       style={[style.nameText, {color: ColorDetails.color}]}>
          Password
        </Text>
        <AppTextInput
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
        <Text
        style={[style.nameText, {color: ColorDetails.color}]}>
          Confirm password
        </Text>
        <AppTextInput
          name="confirmPassword"
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
        {errors.confirmPassword && (
          <Text style={style.errorField}>
            {errors.confirmPassword['message']}
          </Text>
        )}
        <Text style={style.errorField}>{errorCheckBox}</Text>
        <AppButton
          text="Sign Up"
          loaderColor={'black'}
          buttonProps={{
            onPress: onSubmit,
            style: [
              style.signupbutton,
              {backgroundColor: ColorDetails.btnColor},
            ],
          }}
          innerTextProps={{
            style: {
              color: ColorDetails.btnText,
              fontSize: 15,
            },
          }}
        />

        <View style={style.accountCounter}>
          <Text
            style={[
              style.accountCounterContainer,
              {color: ColorDetails.color},
            ]}>
            Already have an account? click here to sign in
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}>
            <Text style={[style.signTextText, {color: ColorDetails.btnColor}]}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
};

export default RegisterScreen;

const style = StyleSheet.create({
  nameText: {
    marginTop: 20,
    fontSize: 14,
  },
  accountCounter: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  accountCounterContainer: {
    opacity: 0.5,
    textAlign: 'center',
  },
  errorField: {
    fontSize: 10,
    color: 'red',
    fontFamily: 'Cairo-SemiBold',
  },
  bottomText: {
    fontSize: 11,
    marginHorizontal: 5,
  },
  bottomContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 0,
    paddingBottom: 25,
    paddingRight: 20,
  },
  container: {
    paddingTop: 50,
    padding: 25,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 40,
    marginTop: 30,
    fontWeight: '600',
  },
  signText: {
    fontSize: 22,
    marginTop: 5,
    marginBottom: 10,
  },
  signTextText: {
    opacity: 0.8,
    textAlign: 'center',
    marginLeft: 4,
    fontWeight: '700',
  },
  signupbutton: {
    marginVertical: 20,
    marginTop: 10,
    height: 50,
    width: '100%',
    borderRadius: 5,
  },
});
