import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from '../../../components/Navbar';
import { TITLES } from '../../../utils/constants';
import AppStyles from '../../../components/AppStyle';
import { Colors } from '../../../utils/color';
import { Spacing } from '../../../utils/spacing';
import AppButton from '../../../components/AppButton';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducers/userSlice';
import { navigate } from '../../../navigation/RootNavigator';
import { dataMenu } from './dataMenu';

interface Props {
  navigation: any;
  route: any;
}
const MenuScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout());
  };
  const handleButtonPress = (screenName: string) => {
    navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <NavBar title={TITLES.menu} onPress={() => navigation.goBack()}></NavBar>
      <View style={AppStyles.body}>
        <View
          style={{
            marginTop: Spacing.medium,
            flex: 1,
            width: '100%',
            borderRadius: 50,
            flexDirection: 'row', // Create two columns
            paddingHorizontal: Spacing.small,
            paddingVertical: Spacing.lagre,
            backgroundColor: Colors.Gray,
          }}
        >
          <View style={{ flex: 1, paddingHorizontal: Spacing.medium }}>
            {dataMenu.slice(0, dataMenu.length / 2).map(item => (
              <AppButton
                customStyle={[
                  {
                    marginBottom: Spacing.lagre,
                    paddingHorizontal: Spacing.small,
                    height: 80,
                  },
                ]}
                key={item.id}
                title={item.title}
                onPress={() => handleButtonPress(item.screenName)}
              />
            ))}
          </View>

          <View style={{ flex: 1, paddingHorizontal: Spacing.medium }}>
            {dataMenu.slice(dataMenu.length / 2).map(item => (
              <AppButton
                customStyle={[{ marginBottom: Spacing.lagre, height: 80 }]}
                key={item.id}
                title={item.title}
                onPress={() => handleButtonPress(item.screenName)}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  buttonGroup: {
    justifyContent: 'space-between',
    marginTop: Spacing.xxlarge,
    marginHorizontal: Spacing.medium,
  },
});

export default MenuScreen;
