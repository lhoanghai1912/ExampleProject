import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GeneralReportScreen = () => {
  return (
    <View style={styles.container}>
      <Text>GeneralReportScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GeneralReportScreen;
