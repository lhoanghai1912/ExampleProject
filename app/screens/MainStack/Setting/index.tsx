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
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducers/userSlice';

interface Props {
  navigation: any;
  route: any;
}
const SettingScreen: React.FC<Props> = ({ navigation }) => {
  const [lenhSX, setLenhSX] = useState('');
  const [soCa, setSoCa] = useState('');
  const [congDoan, setCongDoan] = useState('');
  const [soMay, setSoMay] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const dispatch = useDispatch();

  // const getMachines = async () => {
  //   try {
  //     // Gọi API Login để lấy session
  //     const loginRes = await HttpClient.post('/Login', {
  //       CompanyDB: 'DEMO - 2',
  //       UserName: 'manager',
  //       Password: 'sapb1',
  //     });

  //     const sessionId = loginRes.SessionId;
  //     const routeId = loginRes.RouteId;

  //     // Gọi API lấy danh sách máy móc
  //     const res = await getDanhSachMayMoc(
  //       // 'B1SESSION=b9457d16-4ffe-11f0-8000-00505698cb93',
  //       // '.node5',
  //       sessionId,
  //       routeId,
  //     );
  //     setData(res.value || []);
  //   } catch (err) {
  //     console.error('❌ Không thể load máy móc:', err);
  //   }
  // };
  // useEffect(() => {
  //   getMachines();
  // }, []);
  useEffect(() => {
    // Lấy dữ liệu từ AsyncStorage khi màn hình được render
    const loadData = async () => {
      const lenhSXValue = await AsyncStorage.getItem('LenhSX');
      const soCaValue = await AsyncStorage.getItem('SoCa');
      const congDoanValue = await AsyncStorage.getItem('CongDoan');
      const soMayValue = await AsyncStorage.getItem('SoMay');

      if (lenhSXValue) setLenhSX(lenhSXValue);
      if (soCaValue) setSoCa(soCaValue);
      if (congDoanValue) setCongDoan(congDoanValue);
      if (soMayValue) setSoMay(soMayValue);
    };

    loadData();
  }, []);

  const handleValueSubmit = (val: string, dropdownName: string) => {
    console.log('Selected value:', val);
    // Cập nhật các state với giá trị đã chọn
    switch (dropdownName) {
      case 'Lệnh sản xuất':
        setLenhSX(val);
        break;
      case 'Số ca':
        setSoCa(val);
        break;
      case 'Công đoạn':
        setCongDoan(val);
        break;
      case 'Số máy':
        setSoMay(val);
        break;
    }

    // handleClose(); // Đóng modal và reset giá trị
  };

  const handleSettingSubmit = async () => {
    if (!lenhSX || !soCa || !congDoan || !soMay) {
      setToastMessage('Vui lòng chọn đầy đủ các trường');
      setToastVisible(true);

      return;
    }
    // Xử lý khi người dùng nhấn nút "Xác nhận"
    await AsyncStorage.setItem('LenhSX', lenhSX);
    await AsyncStorage.setItem('SoCa', soCa);
    await AsyncStorage.setItem('CongDoan', congDoan);
    await AsyncStorage.setItem('SoMay', soMay);
    navigate(Screen_Name.Home_Screen);
  };
  const handleLogout = async () => {
    dispatch(logout());
    await AsyncStorage.clear(); // Xóa tất cả dữ liệu trong AsyncStorage
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
            {/* <CustomDropdown
              label="Lệnh sản xuất"
              placeHolder="Chọn Lệnh sản xuất"
              options={['CT1', 'CT2', 'CT3']}
              value={lenhSX}
              onSubmit={val => handleValueSubmit(val, 'Lệnh sản xuất')}
            />
            <CustomDropdown
              label="Số ca"
              placeHolder="Chọn Số ca"
              options={['Ca 1', 'Ca 2', 'Ca 3']}
              value={soCa}
              onSubmit={val => handleValueSubmit(val, 'Số ca')}
            />
            <CustomDropdown
              label="Công đoạn"
              placeHolder="Chọn Công đoạn"
              options={['Công đoạn 1', 'Công đoạn 2', 'Công đoạn 3']}
              value={congDoan}
              onSubmit={val => handleValueSubmit(val, 'Công đoạn')}
            />
            <CustomDropdown
              label="Số máy"
              placeHolder="Chọn Số máy"
              options={[
                'Số máy 1',
                'Số máy 2',
                'Số máy 3',
                'Số máy 4',
                'Số máy 5',
                'Số máy 6',
                'Số máy 7',
                'Số máy 8',
              ]}
              value={soMay}
              onSubmit={val => handleValueSubmit(val, 'Số máy')}
            /> */}
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
    marginVertical: Spacing.medium,
    paddingHorizontal: Spacing.lagre,
  },
});

export default SettingScreen;
