import {View, Text, TouchableOpacity} from 'react-native';
import React, {useReducer} from 'react';
import {colors} from '../utils/colors';

import {styles as globalStyles} from '../utils/globalStyles';

// defining types
enum CalculatorActionKind {
  ADD = 'ADD',
  MUL = 'MUL',
  SUB = 'SUB',
  EQUAL = 'EQUAL',
  DIV = 'DIV',
  MOD = 'MOD',
  DEL = 'DEL',
  ADD_CHAR = 'ADD_CHAR',
}

interface CalculatorAction {
  type: CalculatorActionKind;
  payload: number | null;
}
// An interface for our state
type CalculatorState = {
  result: number | null;
  last_op: CalculatorActionKind | null;
  input: string | null;
  left_inp: string | null;
  currentInput: string;
};
const initialState: CalculatorState = {
  input: null,
  currentInput: '',
  result: null,
  left_inp: null,
  last_op: null,
};

function calculatorReducer(state: CalculatorState, action: CalculatorAction) {
  const {payload, type} = action;

  switch (type) {
    // add char
    case CalculatorActionKind.ADD_CHAR:
      if (payload == null || payload === undefined) {
        return state;
      }
      console.log('state: ', state);
      const input1 =
        state.input == null
          ? payload.toString()
          : state.input + payload.toString();
      const currentInput = state.currentInput
        ? state.currentInput + payload.toString()
        : input1;

      if (state.last_op) {
        console.log('state.last : ', state);
        state.result = MakeOperation(
          Number(state.left_inp),
          Number(input1),
          state.last_op,
        );
      }

      return {
        ...state,
        input: input1,
        currentInput,
      };
    // sum number
    case CalculatorActionKind.ADD:
      // make sure that sign doesn't exist
      if (state.input == null) {
        return state;
      }

      state.currentInput = state.currentInput + '+';

      if (state.last_op) {
        state.left_inp = MakeOperation(
          Number(state.left_inp),
          Number(state.input),
          state.last_op,
        ).toString();
      } else {
        state.left_inp = state.input;
      }

      state.last_op = type;
      state.input = null;

      return {...state};

    case CalculatorActionKind.SUB:
      // make sure that sign doesn't exist
      if (state.input === '-') {
        return {...state};
      }

      if (state.input == null && state.left_inp == null) {
        state.input = '-';
      } else {
        if (state.last_op) {
          state.left_inp = MakeOperation(
            Number(state.left_inp),
            Number(state.input),
            state.last_op,
          ).toString();
        } else {
          state.left_inp = state.input;
        }

        // state.left_inp = state.input;
        state.input = null;
        state.last_op = type;
      }

      state.currentInput = state.currentInput + '-';

      return {...state};
    case CalculatorActionKind.MUL:
      // make sure that sign doesn't exist
      if (state.input == null) {
        return state;
      }

      state.currentInput = state.currentInput + '×';

      if (state.last_op) {
        state.left_inp = MakeOperation(
          Number(state.left_inp),
          Number(state.input),
          state.last_op,
        ).toString();
      } else {
        state.left_inp = state.input;
      }

      state.last_op = type;
      state.input = null;

      return {...state};

    case CalculatorActionKind.DIV:
      // make sure that sign doesn't exist
      if (!state.input) {
        return state;
      }

      state.currentInput = state.currentInput + '÷';
      state.left_inp = state.input;
      state.last_op = type;
      state.input = null;

      return {...state};

    case CalculatorActionKind.EQUAL:
      if (!state.input) {
        return {...state};
      }

      if (state.last_op) {
        state.result = MakeOperation(
          Number(state.left_inp),
          Number(state.input),
          state.last_op,
        );
      } else {
        state.result = Number(state.input);
      }

      state.input = null;
      state.currentInput = '';
      return {...state};

    case CalculatorActionKind.DEL:
      return initialState;
    default:
      return {...state};
  }
}

function MakeOperation(
  left_inp: number,
  right_inp: number,
  op: CalculatorActionKind,
) {
  switch (op) {
    case CalculatorActionKind.ADD:
      return left_inp + right_inp;
    case CalculatorActionKind.MUL:
      return left_inp * right_inp;
    case CalculatorActionKind.SUB:
      return left_inp - right_inp;
    case CalculatorActionKind.DIV:
      return left_inp / right_inp;

    default:
      return left_inp;
  }
}

const Calculator = () => {
  const [calState, dispatch] = useReducer(calculatorReducer, initialState);

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
          <TouchableOpacity
            style={[globalStyles.btn, globalStyles.del_btn]}
            onPress={() => {
              dispatch({type: CalculatorActionKind.DEL, payload: null});
            }}>
            <Text style={globalStyles.text_btn}>Del</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.btn}
            onPress={handlerAddChar(0)}>
            <Text style={globalStyles.text_btn}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.btn, globalStyles.equal_btn]}
            onPress={() => {
              dispatch({type: CalculatorActionKind.EQUAL, payload: null});
            }}>
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
