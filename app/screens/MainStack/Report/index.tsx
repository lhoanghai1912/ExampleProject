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
import { Colors } from '../../../utils/color';
import LinearGradient from 'react-native-linear-gradient';

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
    <LinearGradient
      colors={[Colors.primary, '#ffffff']}
      style={styles.container}
    >
      <View style={styles.container}>
        <NavBar
          title={TITLES.report}
          style={AppStyles.header}
          onPress={() => navigation.goBack()}
        ></NavBar>
        <View style={AppStyles.body}>
          <View
            style={{
              marginTop: Spacing.medium,
              flex: 1,
              width: '100%',
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              borderWidth: 2,
              borderColor: Colors.white,

              flexDirection: 'row', // Create two columns
              paddingHorizontal: Spacing.small,
              paddingVertical: Spacing.large,
            }}
          >
            <View style={{ flex: 1, paddingHorizontal: Spacing.medium }}>
              {dataReport.slice(0, dataReport.length).map(item => (
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
            {dataReport.slice(dataReport.length / 2).map(item => (
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

export default ReportScreen;
