import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import AppStyles from '../../components/AppStyle';
import { IMAGES, TITLES } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import styles from './style';
import { useDispatch } from 'react-redux';
import { setToken, setUserData } from '../../redux/reducers/userSlice';
import NavBar from '../../components/Navbar';

interface Props {
  navigation: any;
  route: any;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const token1 = '123abc';
  const data = [username, password];
  const handleBack = async () => {
    navigation.goBack();
  };

  const handleLogin = async () => {
    console.log('Login Pressed');
    try {
      await AsyncStorage.setItem('accesstoken', token1);
      dispatch(setUserData({ username: username, password: password }));
      dispatch(setToken({ token: token1 }));
    } catch (error) {
      console.log('error ', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <NavBar title="Đăng nhập" onPress={handleBack} /> */}
      <View style={AppStyles.header}>
        <Image
          source={IMAGES.foxAI}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
          }}
          resizeMode="contain"
        ></Image>
      </View>
      <View style={[AppStyles.body]}>
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
              style={styles.inputText}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            ></AppInput>
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
    </View>
  );
};

export default LoginScreen;
