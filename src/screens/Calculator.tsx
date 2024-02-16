/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useReducer} from 'react';
import {colors} from '../utils/colors';

import {styles as globalStyles} from '../utils/globalStyles';
import DigitButton from '../components/DigitButton';
import OperationButton from '../components/OperationButton';

const operations = {
  add: '+',
  mod: '%',
  mul: '×',
  div: '÷',
  sub: '-',
};
// defining types
enum CalculatorActionKind {
  CLEAR = 'CLEAR',
  EVALUATE = 'EVALUATE',
  OPERATION = 'OPERATION',
  EQUAL = 'EQUAL',
  REMOVE_DIGIT = 'REMOVE_DIGIT',
  DEL = 'DEL',
  ADD_DIGIT = 'ADD_DIGIT',
}

interface CalculatorAction {
  type: CalculatorActionKind;
  payload: string | null;
}
// An interface for our state
type CalculatorState = {
  operation: string | null;
  currentOperand: string | null;
  previousOperand: string | null;
  override: boolean;
};
const initialState: CalculatorState = {
  operation: null,
  override: false,
  currentOperand: null,
  previousOperand: null,
};

function calculatorReducer(state: CalculatorState, action: CalculatorAction) {
  const {payload, type} = action;

  switch (type) {
    case CalculatorActionKind.ADD_DIGIT:
      if (state.override) {
        return {
          ...initialState,
          override: false,
          currentOperand: `${payload}`,
        };
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          currentOperand: `${payload}`,
        };
      }
      if (state.currentOperand.includes('.') && payload === '.') {
        return state;
      }

      if (state.currentOperand === '0' && payload === '0') {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand}${payload}`,
      };

    case CalculatorActionKind.OPERATION:
      if (state.override) {
        return initialState;
      }

      if (state.currentOperand == null && state.operation == null) {
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: null,
          operation: payload,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload,
        currentOperand: null,
      };
    case CalculatorActionKind.REMOVE_DIGIT:
      if (state.override) {
        return initialState;
      }
      if (state.currentOperand === null) {
        return state;
      }

      if (state.currentOperand.length === 1) {
        return {...state, currentOperand: null};
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand?.slice(0, -1)}`,
      };
    case CalculatorActionKind.CLEAR:
      return initialState;

    case CalculatorActionKind.EQUAL:
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operation == null
      ) {
        return state;
      }
      state.override = true;

      if (state.currentOperand == null && state.previousOperand != null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: null,
          operation: null,
          override: true,
        };
      }
      return {
        ...state,
        currentOperand: evaluate(state),
        operation: null,
        previousOperand: null,
      };

    default:
      return state;
  }
}

function evaluate({
  currentOperand,
  operation,
  previousOperand,
}: CalculatorState) {
  let result = '';
  const prev = parseFloat(previousOperand as string);
  const nex = parseFloat(currentOperand as string);
  switch (operation) {
    case operations.add:
      result = (prev + nex).toString();
      break;
    case operations.mod:
      result = (prev % nex).toString();
      break;
    case operations.mul:
      result = (prev * nex).toString();
      break;
    case operations.div:
      result = (prev / nex).toString();
      break;
    case operations.sub:
      result = (prev - nex).toString();
      break;
  }

  return result;
}

const INTERGER_FORMAT = new Intl.NumberFormat('fr-CM', {
  maximumFractionDigits: 0,
  style: 'decimal',
});
const formatNumber = (operand: string | null) => {
  if (operand === null) {
    return operand;
  }
  const [integer, decimal] = operand.split('.');

  if (decimal == null) {
    return INTERGER_FORMAT.format(Number(integer));
  }

  return `${INTERGER_FORMAT.format(Number(integer))}.${decimal}`;
};
const Calculator = () => {
  const [calState, dispatch] = useReducer(calculatorReducer, initialState);
  //
  const addDigitHandler = (digit: string) => {
    dispatch({type: CalculatorActionKind.ADD_DIGIT, payload: digit});
  };

  //
  const removeDigitHandler = (digit: string) => {
    dispatch({type: CalculatorActionKind.REMOVE_DIGIT, payload: digit});
  };

  //
  const clearDigitHandler = () => {
    dispatch({type: CalculatorActionKind.CLEAR, payload: null});
  };
  const handlerOperation = (op: string) => {
    dispatch({
      type: CalculatorActionKind.OPERATION,
      payload: op,
    });
  };
  return (
    <View style={globalStyles.cal_btn}>
      <View style={globalStyles.result_view}>
        <View>
          <Text style={globalStyles.text_result}>{`${
            calState.previousOperand
              ? formatNumber(calState.previousOperand)
              : ''
          }${calState.operation ? calState.operation : ''}`}</Text>
        </View>
        <View>
          <Text style={[globalStyles.text_result, globalStyles.text_op]}>
            {calState.currentOperand
              ? formatNumber(calState.currentOperand)
              : ''}
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'flex-end',
        }}>
        <View style={globalStyles.wrap_btn}>
          {/*  */}
          <OperationButton op={operations.div} dispatch={handlerOperation} />

          <OperationButton op={operations.mod} dispatch={handlerOperation} />

          <DigitButton digit="." dispatch={addDigitHandler} />

          <DigitButton
            style={[globalStyles.btn, globalStyles.del_btn]}
            digit="DEL"
            dispatch={clearDigitHandler}
          />

          {/*  */}
          <OperationButton op={operations.add} dispatch={handlerOperation} />

          <DigitButton digit="9" dispatch={addDigitHandler} />
          <DigitButton digit="8" dispatch={addDigitHandler} />
          <DigitButton digit="7" dispatch={addDigitHandler} />

          {/*  */}
          <OperationButton op={operations.mul} dispatch={handlerOperation} />

          <DigitButton digit="6" dispatch={addDigitHandler} />
          <DigitButton digit="5" dispatch={addDigitHandler} />
          <DigitButton digit="4" dispatch={addDigitHandler} />
          {/*  */}
          <OperationButton op={operations.sub} dispatch={handlerOperation} />

          <DigitButton digit="3" dispatch={addDigitHandler} />
          <DigitButton digit="2" dispatch={addDigitHandler} />
          <DigitButton digit="1" dispatch={addDigitHandler} />

          {/*  */}
          <DigitButton
            digit="AC"
            dispatch={removeDigitHandler}
            style={[globalStyles.btn, globalStyles.del_btn]}
          />

          <DigitButton digit="0" dispatch={addDigitHandler} />
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
