import {View, Text, TouchableOpacity} from 'react-native';
import React, {useReducer} from 'react';
import {colors} from '../utils/colors';

import {styles as globalStyles} from '../utils/globalStyles';

// defining types
enum CalculatorActionKind {
  ADD = 'ADD',
  MUL = 'MUL',
  SUB = 'SUB',
  DIV = 'DIV',
  MOD = 'MOD',
  ADD_CHAR = 'ADD_CHAR',
}

interface CalculatorAction {
  type: CalculatorActionKind;
  payload: number | string | null;
}
// An interface for our state
interface CalculatorState {
  result: number | null;
  input: number | null;
  currentInput: string;
}
function calculatorReducer(state: CalculatorState, action: CalculatorAction) {
  const {payload, type} = action;

  switch (type) {
    case CalculatorActionKind.ADD_CHAR:
      if (!payload) {
        return;
      }

      if (!state.currentInput) {
        return {
          ...state,
          currentInput: payload,
        };
      }

      if (state.input) {
        return {
          ...state,
          input: payload,
        };
      }

      return {
        ...state,
        currentInput: state.currentInput + payload.toString(),
      };
    case CalculatorActionKind.ADD:
      const input = state.input;
      const result = Number(state.currentInput) + Number(input);
      const currentInput = state.currentInput + '+';
      return {
        ...state,
        result,
        input,
        currentInput,
      };

    default:
      return state;
  }
}

const Calculator = () => {
  const [calState, dispatch] = useReducer(calculatorReducer, {
    result: null,
    input: null,
    currentInput: '',
  });

  const handlerAddChar = (payload: number) => () =>
    dispatch({type: CalculatorActionKind.ADD_CHAR, payload});
  const handlerOperation = (type: CalculatorActionKind) => () =>
    dispatch({type, payload: null});

  return (
    <View style={globalStyles.cal_btn}>
      <View style={globalStyles.result_view}>
        <View>
          <Text style={globalStyles.text_result}>{calState.currentInput}</Text>
        </View>
        <View>
          <Text style={[globalStyles.text_result, globalStyles.text_op]}>
            {calState.result}
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'flex-end',
        }}>
        <View style={globalStyles.wrap_btn}>
          <TouchableOpacity
            style={[globalStyles.btn, globalStyles.operator_btn]}
            onPress={handlerOperation(CalculatorActionKind.ADD)}>
            <Text style={globalStyles.text_btn}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.btn, globalStyles.operator_btn]}>
            <Text style={globalStyles.text_btn}>(</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.btn, globalStyles.operator_btn]}
            onPress={handlerOperation(CalculatorActionKind.ADD)}>
            <Text style={globalStyles.text_btn}>)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.btn, globalStyles.operator_btn]}
            onPress={handlerOperation(CalculatorActionKind.MOD)}>
            <Text style={globalStyles.text_btn}>%</Text>
          </TouchableOpacity>
          {/*  */}
          <TouchableOpacity
            style={[globalStyles.btn, globalStyles.operator_btn]}
            onPress={handlerOperation(CalculatorActionKind.DIV)}>
            <Text style={globalStyles.text_btn}>÷</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.btn}
            onPress={handlerAddChar(9)}>
            <Text style={globalStyles.text_btn}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.btn}
            onPress={handlerAddChar(8)}>
            <Text style={globalStyles.text_btn}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.btn}
            onPress={handlerAddChar(7)}>
            <Text style={globalStyles.text_btn}>7</Text>
          </TouchableOpacity>
          {/*  */}
          <TouchableOpacity
            style={[globalStyles.btn, globalStyles.operator_btn]}
            onPress={handlerOperation(CalculatorActionKind.MUL)}>
            <Text style={globalStyles.text_btn}>×</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.btn}
            onPress={handlerAddChar(6)}>
            <Text style={globalStyles.text_btn}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.btn}
            onPress={handlerAddChar(5)}>
            <Text style={globalStyles.text_btn}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.btn}
            onPress={handlerAddChar(4)}>
            <Text style={globalStyles.text_btn}>4</Text>
          </TouchableOpacity>
          {/*  */}
          <TouchableOpacity
            style={[globalStyles.btn, globalStyles.operator_btn]}
            onPress={handlerOperation(CalculatorActionKind.SUB)}>
            <Text style={globalStyles.text_btn}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.btn}
            onPress={handlerAddChar(3)}>
            <Text style={globalStyles.text_btn}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.btn}
            onPress={handlerAddChar(2)}>
            <Text style={globalStyles.text_btn}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.btn}
            onPress={handlerAddChar(1)}>
            <Text style={globalStyles.text_btn}>1</Text>
          </TouchableOpacity>

          {/*  */}
          <TouchableOpacity style={[globalStyles.btn, globalStyles.del_btn]}>
            <Text style={globalStyles.text_btn}>Del</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.btn}
            onPress={handlerAddChar(0)}>
            <Text style={globalStyles.text_btn}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[globalStyles.btn, globalStyles.equal_btn]}>
            <Text style={[globalStyles.text_btn, {color: colors.del_bg}]}>
              =
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Calculator;
