import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from '../../../components/Navbar';
import { TITLES } from '../../../utils/constants';
import AppStyles from '../../../components/AppStyle';

interface Props {
  navigation: any;
  route: any;
}
const ReportScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <NavBar title={TITLES.report} onPress={() => navigation.goBack()} />
      <View style={AppStyles.body}>
        <Text>{TITLES.report}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ReportScreen;
