import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from '../../../components/Navbar';
import { TITLES } from '../../../utils/constants';
import AppStyles from '../../../components/AppStyle';
import { Spacing } from '../../../utils/spacing';
import AppButton from '../../../components/AppButton';
import { dataReport } from './dataReport';
import { navigate } from '../../../navigation/RootNavigator';
import { logout } from '../../../redux/reducers/userSlice';
import { useDispatch } from 'react-redux';

interface Props {
  navigation: any;
  route: any;
}
const ReportScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout());
  };
  const handleButtonPress = (screenName: string) => {
    navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <NavBar
        title={TITLES.report}
        style={AppStyles.header}
        onPress={() => navigation.goBack()}
      ></NavBar>
      <View style={AppStyles.body}>
        <View style={styles.buttonGroup}>
          {dataReport.map(item => (
            <AppButton
              customStyle={[{ marginBottom: Spacing.lagre }]}
              key={item.id}
              title={item.title}
              onPress={() => handleButtonPress(item.screenName)}
            />
          ))}
        </View>
        {/* <AppButton title={TITLES.logout} onPress={handleLogout}></AppButton> */}
      </View>
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

export default ReportScreen;
