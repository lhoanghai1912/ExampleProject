import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from '../../../components/Navbar';
import { TITLES } from '../../../utils/constants';
import AppStyles from '../../../components/AppStyle';
import { Spacing } from '../../../utils/spacing';
import CustomDropdown from '../../../components/DropDown';
import AppButton from '../../../components/AppButton';
import { HttpClient } from '../../../services';
import { getDanhSachMayMoc } from '../../../services/machine';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../../../navigation/RootNavigator';
import { Screen_Name } from '../../../navigation/ScreenName';
import AppToast from '../../../components/AppToast';

interface Props {
  navigation: any;
  route: any;
}
const SettingScreen: React.FC<Props> = ({ navigation }) => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const getMachines = async () => {
    try {
      // Gọi API Login để lấy session
      const loginRes = await HttpClient.post('/Login', {
        CompanyDB: 'DEMO - 2',
        UserName: 'manager',
        Password: 'sapb1',
      });

      const sessionId = loginRes.SessionId;
      const routeId = loginRes.RouteId;

      // Gọi API lấy danh sách máy móc
      const res = await getDanhSachMayMoc(
        // 'B1SESSION=b9457d16-4ffe-11f0-8000-00505698cb93',
        // '.node5',
        sessionId,
        routeId,
      );
      setData(res.value || []);
    } catch (err) {
      console.error('❌ Không thể load máy móc:', err);
    }
  };

  useEffect(() => {
    getMachines();
  }, []);

  const handleClose = () => {
    //
  };

  const handleValueSubmit = (val: string, dropdownName: string) => {
    console.log('Selected value:', val);
    // Cập nhật các state với giá trị đã chọn
    switch (dropdownName) {
      case 'Lệnh sản xuất':
        setValue1(val);
        break;
      case 'Số ca':
        setValue2(val);
        break;
      case 'Công đoạn':
        setValue3(val);
        break;
      case 'Số máy':
        setValue4(val);
        break;
    }
    console.log('vale1 after submit ', value1);

    // handleClose(); // Đóng modal và reset giá trị
  };

  const handleSettingSubmit = async () => {
    if (!value1 || !value2 || !value3 || !value4) {
      setToastMessage('Vui lòng chọn đầy đủ các trường');
      setToastVisible(true);

      return;
    }
    // Xử lý khi người dùng nhấn nút "Xác nhận"
    await AsyncStorage.setItem('LenhSX', value1);
    await AsyncStorage.setItem('SoCa', value2);
    await AsyncStorage.setItem('CongDoan', value3);
    await AsyncStorage.setItem('SoMay', value4);
    navigate(Screen_Name.Menu_Screen);
  };
  return (
    <View style={styles.container}>
      <NavBar title={TITLES.settings} onPress={() => navigation.goBack()} />
      <View style={AppStyles.body}>
        <View style={[styles.wrapBody]}>
          <Text
            style={[AppStyles.title, { marginBottom: Spacing.xlarge }]}
          >{`Thiết lập ca làm việc`}</Text>
          <View>
            <CustomDropdown
              label="Lệnh sản xuất"
              placeHolder="Chọn Lệnh sản xuất"
              options={['CT1', 'CT2', 'CT3']}
              value={value1}
              onClose={handleClose}
              onSubmit={val => handleValueSubmit(val, 'Lệnh sản xuất')}
            />
            <CustomDropdown
              label="Số ca"
              placeHolder="Chọn Số ca"
              options={['Ca1', 'Ca2', 'Ca3']}
              value={value2}
              onClose={handleClose}
              onSubmit={val => handleValueSubmit(val, 'Số ca')}
            />
            <CustomDropdown
              label="Công đoạn"
              placeHolder="Chọn Công đoạn"
              options={['Công đoạn 1', 'Công đoạn 2', 'Công đoạn 3']}
              value={value3}
              onClose={handleClose}
              onSubmit={val => handleValueSubmit(val, 'Công đoạn')}
            />
            <CustomDropdown
              label="Số máy"
              placeHolder="Chọn Số máy"
              options={[
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
              ]}
              value={value4}
              onClose={handleClose}
              onSubmit={val => handleValueSubmit(val, 'Số máy')}
            />
          </View>
          <AppButton
            onPress={() => handleSettingSubmit()}
            title={TITLES.accept}
            customStyle={[
              { marginTop: Spacing.xlarge, marginHorizontal: Spacing.medium },
            ]}
          ></AppButton>
        </View>
        <View style={AppStyles.footer}></View>
      </View>
      {/* Custom Toast */}
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
    // marginVertical: Spacing.medium,
  },
});

export default SettingScreen;
