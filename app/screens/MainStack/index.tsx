import React, { use } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import NavBar from '../../components/Navbar';
import { ICONS, IMAGES, TITLES } from '../../utils/constants';
import AppStyles from '../../components/AppStyle';
import AppButton from '../../components/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUserData } from '../../redux/reducers/userSlice';
import { navigate } from '../../navigation/RootNavigator';
import { Screen_Name } from '../../navigation/ScreenName';
import { Spacing } from '../../utils/spacing';
import { dataOption } from './dataOption';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fonts } from '../../utils/fontSize';
import styles from './style';
import { Colors } from '../../utils/color';
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
    <View style={styles.container}>
      {/* <KeyboardAwareScrollView scrollEnabled style={{ flex: 1 }}> */}
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
              borderEndEndRadius: 500,
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
              {userData.username || ''}
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
          borderRadius: 50,
          flexDirection: 'row', // Create two columns
          paddingHorizontal: Spacing.medium,
          paddingVertical: Spacing.lagre,
          backgroundColor: Colors.Gray,
        }}
      >
        <View style={{ flex: 1, paddingHorizontal: Spacing.medium }}>
          {dataOption.slice(0, dataOption.length / 2).map(item => (
            <AppButton
              customStyle={[
                {
                  marginBottom: Spacing.lagre,
                },
              ]}
              key={item.id}
              title={item.title}
              onPress={() => handleButtonPress(item.screenName)}
            />
          ))}
        </View>

        <View style={{ flex: 1, paddingHorizontal: Spacing.medium }}>
          {dataOption.slice(dataOption.length / 2).map(item => (
            <AppButton
              customStyle={[{ marginBottom: Spacing.lagre }]}
              key={item.id}
              title={item.title}
              onPress={() => handleButtonPress(item.screenName)}
            />
          ))}
        </View>
      </View>
      {/* </KeyboardAwareScrollView> */}
    </View>
  );
};

export default HomeScreen;
