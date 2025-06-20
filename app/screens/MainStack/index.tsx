import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import NavBar from '../../components/Navbar';
import { TITLES } from '../../utils/constants';
import AppStyles from '../../components/AppStyle';
import AppButton from '../../components/AppButton';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/userSlice';
import { navigate } from '../../navigation/RootNavigator';
import { Screen_Name } from '../../navigation/ScreenName';
import { Spacing } from '../../utils/spacing';
import { dataOption } from './dataOption';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout());
  };
  const handleButtonPress = (screenName: string) => {
    navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <NavBar title={TITLES.home} style={AppStyles.header}></NavBar>
      <View style={AppStyles.body}>
        <View style={styles.buttonGroup}>
          {dataOption.map(item => (
            <AppButton
              customStyle={[{ marginBottom: Spacing.lagre }]}
              key={item.id}
              title={item.title}
              onPress={() => handleButtonPress(item.screenName)}
            />
          ))}
        </View>
      </View>
      <AppButton title={TITLES.logout} onPress={handleLogout}></AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonGroup: {
    justifyContent: 'space-between',
    marginTop: Spacing.xxlarge,
    marginHorizontal: Spacing.medium,
  },
});

export default HomeScreen;
