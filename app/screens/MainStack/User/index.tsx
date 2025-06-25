import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from '../../../components/Navbar';
import { TITLES } from '../../../utils/constants';
import AppStyles from '../../../components/AppStyle';
import AppInput from '../../../components/AppInput';
import { Spacing } from '../../../utils/spacing';
import AppButton from '../../../components/AppButton';
import AppToast from '../../../components/AppToast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducers/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../../utils/color';

interface Props {
  navigation: any;
  route: any;
}
const UserInfo_Screen: React.FC<Props> = ({ navigation }) => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Fullname, setFullname] = useState('');
  const [Department, setDepartment] = useState('');
  const [Center, setCenter] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const dispatch = useDispatch();
  const handleSummit = () => {
    // Handle submit logic here
    if (!Username || !Password || !Fullname || !Department || !Center) {
      setToastMessage('Vui lòng điền đầy đủ thông tin');
      setToastVisible(true);
      return;
    } else {
      setToastMessage('Thông tin đã được cập nhật thành công');
      setToastVisible(true);
    }
  };
  const handleLogout = async () => {
    dispatch(logout());
    await AsyncStorage.clear(); // Xóa tất cả dữ liệu trong AsyncStorage
  };
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: Colors.primary }}>
        <NavBar title={TITLES.user} onPress={() => navigation.goBack()} />
      </View>
      <KeyboardAwareScrollView scrollEnabled>
        <View style={AppStyles.body}>
          <View style={styles.wrapBody}>
            <View>
              <AppInput
                label="Username"
                placeholder="Username"
                value={Username}
                onChangeText={setUsername}
              />
              <AppInput
                label="Password"
                placeholder="Password"
                value={Password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              <AppInput
                label="Fullname"
                placeholder="Fullname"
                value={Fullname}
                onChangeText={setFullname}
              />
              <AppInput
                label="Department"
                placeholder="Department"
                value={Department}
                onChangeText={setDepartment}
              />
              <AppInput
                label="Center"
                placeholder="Center"
                value={Center}
                onChangeText={setCenter}
              />
            </View>
            <AppButton
              onPress={() => handleSummit()}
              title={TITLES.accept}
              customStyle={[
                { marginTop: Spacing.xlarge, marginHorizontal: Spacing.medium },
              ]}
            ></AppButton>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <AppToast
        message={toastMessage}
        visible={toastVisible}
        duration={3000}
        onHide={() => setToastVisible(false)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  wrapBody: {
    flex: 1,
    marginTop: Spacing.medium,
    borderRadius: 50,
    paddingVertical: Spacing.xxlarge,
    paddingHorizontal: Spacing.medium,
    justifyContent: 'space-around',
    // marginHorizontal: Spacing.medium,
    backgroundColor: Colors.Gray,
  },
});

export default UserInfo_Screen;
