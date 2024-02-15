import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles as globalStyles} from '../utils/globalStyles';
type DigitButtonProps = {
  op: string;
  style?: any;
  dispatch: (digit: string) => void;
};
const OperationButton = ({op, dispatch}: DigitButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => dispatch(op)}
      style={[globalStyles.btn, globalStyles.operator_btn]}>
      <Text style={globalStyles.text_btn}>{op}</Text>
    </TouchableOpacity>
  );
};

export default OperationButton;
