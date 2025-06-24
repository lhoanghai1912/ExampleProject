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
  return (
    <View style={styles.container}>
      <NavBar title={TITLES.user} onPress={() => navigation.goBack()} />
      <KeyboardAwareScrollView scrollEnabled>
        <View style={AppStyles.body}>
          <View style={styles.wrapBody}>
            {/* <Text
            style={[AppStyles.title, { marginBottom: Spacing.xlarge }]}
          >{`Thông tin người dùng`}</Text> */}
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
          <View style={AppStyles.footer}></View>
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
  },
  wrapBody: {
    flex: 1,
    paddingVertical: Spacing.xxlarge,
    justifyContent: 'space-around',
    marginHorizontal: Spacing.medium,
  },
});

export default UserInfo_Screen;
