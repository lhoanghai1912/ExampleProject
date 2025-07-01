import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ICONS, IMAGES, TITLES } from '../../utils/constants';
import AppStyles from '../../components/AppStyle';
import AppButton from '../../components/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/userSlice';
import { navigate } from '../../navigation/RootNavigator';
import { Screen_Name } from '../../navigation/ScreenName';
import { Spacing } from '../../utils/spacing';
import { dataOption } from './dataOption';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fonts } from '../../utils/fontSize';
import styles from './style';
import { Colors } from '../../utils/color';
import LinearGradient from 'react-native-linear-gradient';
const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: any) => state.user);
  const handleLogout = async () => {
    dispatch(logout());
    await AsyncStorage.clear();
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
        <View
          style={{
            paddingBottom: Spacing.xlarge,
          }}
        >
          <View
            style={[
              styles.header,
              {
                marginHorizontal: Spacing.medium,
                borderBottomLeftRadius: 50,
              },
            ]}
          >
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigate(Screen_Name.UserInfo_Screen);
                }}
              >
                <Image
                  source={IMAGES.avtar}
                  style={[
                    AppStyles.avartar,
                    {
                      alignSelf: 'flex-start',
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, paddingLeft: Spacing.medium }}>
              <Text style={AppStyles.text}>Welcome Back!</Text>
              <Text style={[AppStyles.text, { fontSize: Fonts.large }]}>
                {userData.fullname || ''}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: 100,
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                onPress={() => navigate(Screen_Name.Setting_Screen)}
              >
                <Image
                  source={ICONS.setting}
                  style={[AppStyles.icon, { width: 35, height: 35 }]}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image
                  source={ICONS.logout}
                  style={[AppStyles.icon, { width: 35, height: 35 }]}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            width: '100%',
            borderColor: Colors.white,
            borderWidth: 2,
            borderRadius: 50,
            paddingHorizontal: Spacing.medium,
            paddingVertical: Spacing.large,
            // backgroundColor: Colors.white,
          }}
        >
          <View style={{ flex: 1, paddingHorizontal: Spacing.medium }}>
            {dataOption.slice(0, dataOption.length).map(item => (
              <AppButton
                customStyle={[
                  {
                    marginBottom: Spacing.large,
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
          {dataOption.slice(dataOption.length / 2).map(item => (
            <AppButton
              customStyle={[{ marginBottom: Spacing.large }]}
              key={item.id}
              title={item.title}
              onPress={() => handleButtonPress(item.screenName)}
            />
          ))}
        </View> */}
        </View>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;
