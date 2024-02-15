import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles as globalStyles} from '../utils/globalStyles';

type DigitButtonProps = {
  digit: string;
  style?: any;
  dispatch: (digit: string) => void;
};
const DigitButton = ({digit, style, dispatch}: DigitButtonProps) => {
  return (
    <TouchableOpacity
      style={style ? style : globalStyles.btn}
      onPress={() => dispatch(digit)}>
      <Text style={globalStyles.text_btn}>{digit}</Text>
    </TouchableOpacity>
  );
};

export default DigitButton;
