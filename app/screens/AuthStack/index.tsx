import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AppStyles from '../../components/AppStyle';
import { IMAGES, TITLES } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import styles from './style';
import { useDispatch } from 'react-redux';
import { setToken, setUserData } from '../../redux/reducers/userSlice';
import NavBar from '../../components/Navbar';
import { Spacing } from '../../utils/spacing';

interface Props {
  navigation: any;
  route: any;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('manager');
  const [password, setPassword] = useState('sapb1');
  const dispatch = useDispatch();
  const token1 = '123abc1';
  const handleBack = async () => {
    navigation.goBack();
  };

  const handleLogin = async () => {
    console.log('Login Pressed');
    try {
      await AsyncStorage.setItem('accesstoken', token1);
      // console.log('Dispatching user data: ', { userData: data });
      dispatch(
        setUserData({
          userData: { username: username, password: password, token: token1 },
        }),
      );
      dispatch(setToken({ token: token1 }));
    } catch (error) {
      console.log('error ', error);
    }

    // try {
    //   const response = await fetch('https://160.30.252.14:50000/b1s/v1/Login', {
    //     method: 'POST',
    //     headers: {
    //       Accecpt: 'application/json, text/plain, */*',
    //       'Accept-Encoding': 'gzip, deflate, br',
    //       'Content-Type': 'application/json',
    //       Connection: 'keep-alive',
    //     },
    //     body: JSON.stringify({
    //       CompanyDB: 'DEMO - 2',
    //       UserName: 'manager',
    //       Password: 'sapb1',
    //     }),
    //   });
    //   console.log('abcccccc');

    //   const data = await response.json();
    //   if (response.ok) {
    //     console.log('Login successful', data);
    //     return data;
    //   } else {
    //     console.error('Login failed', data);
    //     return null;
    //   }
    // } catch (error) {
    //   console.error('Error during login:', error);
    //   console.log('Error during login:', error);

    //   return null;
    // }
  };

  return (
    <View style={styles.container}>
      {/* <NavBar title="Đăng nhập" onPress={handleBack} /> */}
      <Image source={IMAGES.foxAI} style={styles.logo} resizeMode="contain" />
      <View style={styles.wrapLogin}>
        <View style={styles.bodyItem}>
          <Text style={AppStyles.title}>{TITLES.login}</Text>
        </View>
        <View style={styles.bodyItem}>
          <AppInput
            placeholder="Usesname"
            style={styles.inputText}
            value={username}
            onChangeText={setUsername}
          ></AppInput>
          <AppInput
            placeholder="Password"
            style={[styles.inputText]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          ></AppInput>
        </View>
        <View style={[styles.bodyItem]}>
          <TouchableOpacity style={{ justifyContent: 'center' }}>
            <Text style={[styles.text, { marginBottom: Spacing.small }]}>
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bodyItem}>
          <AppButton
            disabled={!(username && password)}
            title={TITLES.login}
            onPress={handleLogin}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
