import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import AppStyles from '../../components/AppStyle';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';

import { setToken, setUserData } from '../../redux/reducers/userSlice';
import { IMAGES, TITLES } from '../../utils/constants';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../utils/color';

interface Props {
  navigation: any;
  route: any;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('manager');
  const [password, setPassword] = useState('sapb1');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const token = '123abc1';
      await AsyncStorage.setItem('accesstoken', token);

      dispatch(
        setUserData({
          userData: {
            username,
            password,
            token,
            fullname: 'User Test',
          },
        }),
      );

      dispatch(setToken({ token }));
    } catch (error) {
      console.log('Login error:', error);
    }
  };
  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch('https://160.30.252.14:50000/b1s/v1/Login', {
  //       method: 'POST',
  //       headers: {
  //         Accecpt: 'application/json, text/plain, */*',
  //         'Accept-Encoding': 'gzip, deflate, br',
  //         'Content-Type': 'application/json',
  //         Connection: 'keep-alive',
  //       },
  //       body: JSON.stringify({
  //         CompanyDB: 'DEMO - 2',
  //         UserName: 'manager',
  //         Password: 'sapb1',
  //       }),
  //     });
  //     console.log('abcccccc');

  //     const data = await response.json();
  //     if (response.ok) {
  //       console.log('Login successful', data);
  //       return data;
  //     } else {
  //       console.error('Login failed', data);
  //       return null;
  //     }
  //   } catch (error) {
  //     console.log('Error during login:', error);

  //     return null;
  //   }
  // };

  return (
    <LinearGradient
      colors={[Colors.primary, '#ffffff']}
      style={styles.container}
    >
      {/* <View style={styles.container}> */}
      <Image source={IMAGES.foxAI} style={styles.logo} resizeMode="contain" />

      <View style={styles.wrapLogin}>
        <Text style={styles.title}>{TITLES.login}</Text>

        <AppInput
          placeholder="Tên đăng nhập"
          value={username}
          onChangeText={setUsername}
          style={styles.inputText}
        />

        <AppInput
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputText}
        />

        <TouchableOpacity style={styles.forgotWrapper}>
          <Text style={styles.forgotText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <AppButton
          title="Đăng nhập"
          onPress={handleLogin}
          disabled={!(username && password)}
          customStyle={[styles.loginButton]}
        />
      </View>
      {/* </View> */}
    </LinearGradient>
  );
};

export default LoginScreen;
