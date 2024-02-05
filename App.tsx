import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import Calculator from './src/screens/Calculator';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Calculator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});

export default App;
