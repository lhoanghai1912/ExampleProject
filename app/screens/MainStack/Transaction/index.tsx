import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from '../../../components/Navbar';
import { TITLES } from '../../../utils/constants';
import AppStyles from '../../../components/AppStyle';
import { Spacing } from '../../../utils/spacing';
import AppButton from '../../../components/AppButton';
import { logout } from '../../../redux/reducers/userSlice';
import { useDispatch } from 'react-redux';
import { navigate } from '../../../navigation/RootNavigator';
import { dataTransaction } from './dataTransaction';
import { Colors } from '../../../utils/color';
interface Props {
  navigation: any;
  route: any;
}
const TransactionScreen: React.FC<Props> = ({ navigation }) => {
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
        title={TITLES.transaction}
        style={AppStyles.header}
        onPress={() => navigation.goBack()}
      ></NavBar>
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
            {dataTransaction.slice(0, dataTransaction.length / 2).map(item => (
              <AppButton
                customStyle={[
                  {
                    marginBottom: Spacing.lagre,
                    paddingHorizontal: Spacing.small,
                    height: 50,
                  },
                ]}
                key={item.id}
                title={item.title}
                onPress={() => handleButtonPress(item.screenName)}
              />
            ))}
          </View>

          <View style={{ flex: 1, paddingHorizontal: Spacing.medium }}>
            {dataTransaction.slice(dataTransaction.length / 2).map(item => (
              <AppButton
                customStyle={[{ marginBottom: Spacing.lagre, height: 50 }]}
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
export default TransactionScreen;
