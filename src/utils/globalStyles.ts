import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const cal_btn_width = 22;

export const styles = StyleSheet.create({
  result_view: {
    minHeight: heightPercentageToDP('20%'),
    justifyContent: 'flex-end',
    alignContent: 'space-between',
    padding: 10,
    paddingRight: 2,
    gap: 10,
  },
  text_op: {
    fontSize: 40,
    fontFamily: 'Montserrat-Bold',
  },
  text_result: {
    fontSize: 25,
    letterSpacing: 1,

    writingDirection: 'rtl',
    color: colors.text_color,
    textAlign: 'right',
    fontFamily: 'Montserrat-Medium',
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
