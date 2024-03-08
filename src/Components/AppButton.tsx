import React from 'react';
import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface IAppButton {
  buttonProps?: TouchableOpacityProps;
  innerTextProps?: TextProps;
  text: string;
  isLoading?: boolean;
  loaderColor?: string;
  testID?: any;
}
export function AppButton({
  buttonProps = {},
  innerTextProps = {},
  text,
  isLoading,
  loaderColor,
  testID,
}: IAppButton) {
  const {style: buttonStyle, ...buttonRest} = buttonProps;
  const {style: textStyle, ...textRest} = innerTextProps;

  return (
    <TouchableOpacity
      testID={"btn-hi"}
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          height: 45,
        },
        buttonStyle,
      ]}
      {...buttonRest}>
      {!isLoading ? (
        <Text
          style={[{fontSize: 20, fontWeight: '700', color: 'white'}, textStyle]}
          {...textRest}>
          {text}
        </Text>
      ) : (
        <ActivityIndicator size="small" color={loaderColor} />
      )}
    </TouchableOpacity>
  );
}
