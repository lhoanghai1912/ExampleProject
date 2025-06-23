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

    useEffect(() => {
      getMachines();
    }, []);
  };
  return (
    <View style={styles.container}>
      <NavBar title={TITLES.settings} onPress={() => navigation.goBack()} />
      <View style={AppStyles.body}>
        <View style={styles.wrapBody}>
          {/* <Text
            style={[AppStyles.title, { marginBottom: Spacing.xlarge }]}
          >{`Thiết lập ca làm việc`}</Text> */}
          <View>
            <CustomDropdown
              label="Lệnh sản xuất"
              placeHolder="Chọn Lệnh sản xuất"
              options={['CT1', 'CT2', 'CT3']}
              value={value1}
              onSelect={setValue1}
            />
            <CustomDropdown
              label="Số ca"
              placeHolder="Chọn Số ca"
              options={['Ca1', 'Ca2', 'Ca3']}
              value={value2}
              onSelect={setValue2}
            />
            <CustomDropdown
              label="Công đoạn"
              placeHolder="Chọn Công đoạn"
              options={['Công đoạn 1', 'Công đoạn 2', 'Công đoạn 3']}
              value={value3}
              onSelect={setValue3}
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
              onSelect={setValue4}
            />
          </View>
          <AppButton
            onPress={() => {
              console.log('pressed');
            }}
            title={TITLES.accept}
            customStyle={[
              { marginTop: Spacing.xlarge, marginHorizontal: Spacing.medium },
            ]}
          ></AppButton>
        </View>
        <View style={AppStyles.footer}></View>
      </View>
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
