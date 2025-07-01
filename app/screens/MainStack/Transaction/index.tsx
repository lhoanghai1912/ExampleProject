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
import LinearGradient from 'react-native-linear-gradient';
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
    <LinearGradient
      colors={[Colors.primary, '#ffffff']}
      style={styles.container}
    >
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
              flexDirection: 'row', // Create two columns
              paddingHorizontal: Spacing.small,
              borderTopLeftRadius: 50,
              borderColor: Colors.white,
              borderWidth: 2,
              borderTopRightRadius: 50,
              paddingVertical: Spacing.large,
              // backgroundColor: Colors.white,
            }}
          >
            <View
              style={{
                flex: 1,
                paddingHorizontal: Spacing.medium,
                justifyContent: 'space-around',
              }}
            >
              {dataTransaction.slice(0, dataTransaction.length).map(item => (
                <AppButton
                  customStyle={[
                    {
                      marginBottom: Spacing.large,
                      paddingHorizontal: Spacing.small,
                      height: 50,
                      borderWidth: 1,
                      borderColor: Colors.white,
                    },
                  ]}
                  key={item.id}
                  title={item.title}
                  onPress={() => handleButtonPress(item.screenName)}
                />
              ))}
            </View>

            {/* <View style={{ flex: 1, paddingHorizontal: Spacing.medium }}>
            {dataTransaction.slice(dataTransaction.length / 2).map(item => (
              <AppButton
                customStyle={[{ marginBottom: Spacing.large, height: 50 }]}
                key={item.id}
                title={item.title}
                onPress={() => handleButtonPress(item.screenName)}
              />
            ))}
          </View> */}
          </View>
        </View>
      </View>
    </LinearGradient>
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
export default TransactionScreen;
