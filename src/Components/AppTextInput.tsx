import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {
  TouchableOpacity,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
  Text,
  I18nManager,
} from 'react-native';
//import {SvgProps} from 'react-native-svg';
import {useSelector} from 'react-redux';

interface IAppTextInput {
  name?: any;
  control?: any;
  outerViewProps?: ViewProps;
  textInputProps?: TextInputProps;
  // icon?: React.FC<SvgProps>;
  IconProps?: any;
  setCurrentValue?: any;
  editable?: any;
  testID?: any;
}

export default function AppTextInput({
  testID,
  name,
  control,
  outerViewProps = {},
  textInputProps = {},
  setCurrentValue,
  icon: Icon,
  editable,
  IconProps = {},
}: IAppTextInput) {
  const {style: outerViewStyle, ...outerViewRestProps} = outerViewProps;
  const {style: textInputStyle, ...textInputRest} = textInputProps;
  const {style: IconStyle, ...IconRest} = IconProps;
  const {field} = useController({name, control});

  const [showPassword1, setShowPassword1] = useState(true);

  const globalTheme = useSelector((x: any) => x);
  let ColorDetails: any = globalTheme?.selectedColor?.themeColorrs;
  if (ColorDetails?.color) {
    ColorDetails = ColorDetails;
  } else {
    ColorDetails = JSON.parse(ColorDetails);
  }

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          height: 50,
          // borderWidth: 1,
          marginVertical: 8,
          // backgroundColor: "white",
          alignItems: 'center',
          // borderRadius:10
        },
        outerViewStyle,
      ]}
      {...outerViewRestProps}>
      {!!Icon ? (
        <TouchableOpacity
          style={[{flexShrink: 0, marginLeft: 8}, IconStyle]}
          {...IconRest}>
          <Icon />
        </TouchableOpacity>
      ) : (
        <Text></Text>
      )}
      <TextInput
        testID={testID}
        editable={editable}
        {...textInputRest}
        placeholderTextColor="#B9B9B9"
        onChangeText={e => {
          setCurrentValue && setCurrentValue(e);
          field.onChange(e);
        }}
        secureTextEntry={
          (showPassword1 && name == 'password') ||
          (showPassword1 && name == 'confirmPassword')
            ? true
            : false
        }
        value={field.value}
        // defaultValue={'defaultValue'} // Setting the default value here

        style={[
          {
            width: '80%',
            borderRadius: 5,
            // writingDirection: 'rtl' ,
            //  textAlign: "right",
            fontSize: 13,
            padding: 12,
            flex: 1,
            // fontFamily: 'Cairo-SemiBold',
            color: 'white',
            // backgroundColor: '#014476',
          },
          textInputStyle,
        ]}
      />
    </View>
  );
}
