import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from '../../../components/Navbar';
import { TITLES } from '../../../utils/constants';
import AppStyles from '../../../components/AppStyle';
import { Colors } from '../../../utils/color';
interface Props {
  navigation: any;
  route: any;
}
const MenuScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <NavBar title={TITLES.menu} onPress={() => navigation.goBack()} />
      <View style={AppStyles.body}>
        <Text>MenuScreen</Text>
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

export default MenuScreen;
