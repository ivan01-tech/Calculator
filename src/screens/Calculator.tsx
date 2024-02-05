/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors} from '../utils/colors';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const cal_btn_width = 22;

const Calculator = () => {
  return (
    <View style={styles.cal_btn}>
      <View style={styles.result_view}>
        <Text>ddsds</Text>
        <View>
          <Text style={styles.text_result}>sdcscsdcsdcsdsdcsdced89</Text>
        </View>
        {/* result */}
        <View></View>
      </View>

      <View
        style={{
          justifyContent: 'flex-end',
        }}>
        <View style={styles.wrap_btn}>
          <TouchableOpacity style={[styles.btn, styles.operator_btn]}>
            <Text style={styles.text_btn}>/</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.operator_btn]}>
            <Text style={styles.text_btn}>(</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.operator_btn]}>
            <Text style={styles.text_btn}>)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.operator_btn]}>
            <Text style={styles.text_btn}>%</Text>
          </TouchableOpacity>
          {/*  */}
          <TouchableOpacity style={[styles.btn, styles.operator_btn]}>
            <Text style={styles.text_btn}>÷</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text_btn}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text_btn}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text_btn}>7</Text>
          </TouchableOpacity>
          {/*  */}
          <TouchableOpacity style={[styles.btn, styles.operator_btn]}>
            <Text style={styles.text_btn}>×</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text_btn}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text_btn}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text_btn}>4</Text>
          </TouchableOpacity>
          {/*  */}
          <TouchableOpacity style={[styles.btn, styles.operator_btn]}>
            <Text style={styles.text_btn}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text_btn}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text_btn}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text_btn}>1</Text>
          </TouchableOpacity>

          {/*  */}
          <TouchableOpacity style={[styles.btn, styles.del_btn]}>
            <Text style={styles.text_btn}>Del</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text_btn}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.equal_btn]}>
            <Text style={[styles.text_btn, {color: colors.del_bg}]}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  result_view: {
    backgroundColor: '#FFFFFF',
    height: heightPercentageToDP('20%'),
    justifyContent: 'flex-end',
  },
  text_result: {
    fontSize: 40,
    letterSpacing: 1,
    writingDirection: 'rtl',

    textAlign: 'right',
    fontFamily: 'Montserrat-Bold',
  },
  cal_btn: {
    flex: 1,
    gap: 20,

    backgroundColor: colors.primary_bg,
    justifyContent: 'flex-end',
  },
  wrap_btn: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    margin: 10,
    alignContent: 'flex-end',
  },
  btn: {
    width: widthPercentageToDP(`${cal_btn_width}%`),
    height: 60,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.secondary_btn,
  },
  text_btn: {
    fontSize: 25,
    fontFamily: 'Montserrat-Medium',
    color: colors.text_color,
    textAlign: 'center',
  },
  equal_btn: {
    width: widthPercentageToDP(`${cal_btn_width}%`) * 2,
    backgroundColor: colors.text_color,
  },
  del_btn: {
    backgroundColor: colors.del_bg,
  },
  operator_btn: {backgroundColor: colors.thrid_btn},
});

export default Calculator;
