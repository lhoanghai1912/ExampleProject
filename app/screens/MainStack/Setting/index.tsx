import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
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
import { Colors } from '../../../utils/color';

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
  const [selectedValues, setSelectedValues] = useState('');
  const [showSelects, setShowSelect] = useState(false);
  const [selectedField, setSelectedField] = useState('');

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
  const handleValueSelect = (value: string) => {
    setSelectedValues(value);
    setShowSelect(false); // Đóng modal sau khi chọn giá trị
  };
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
  const lenhSX1 = ['CT1', 'CT2', 'CT3'];
  const soCa1 = ['Ca 1', 'Ca 2', 'Ca 3'];
  const congDoan1 = ['Công đoạn 1', 'Công đoạn 2', 'Công đoạn 3'];
  const soMay1 = ['Số máy 1', 'Số máy 2', 'Số máy 3', 'Số máy 4'];
  return (
    <View style={styles.container}>
      <NavBar title={TITLES.settings} onPress={() => navigation.goBack()} />
      <View style={AppStyles.body}>
        <View style={[styles.wrapBody]}>
          <Text
            style={[AppStyles.title, { marginBottom: Spacing.xlarge }]}
          >{`Thiết lập ca làm việc`}</Text>
          {/* <View>
            <CustomDropdown
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
            />
          </View> */}
          {/* <View>

            {['lenhSX', 'soCa', 'congDoan', 'soMay'].map((field, index) => (
              <View
                key={index}
                style={{ marginBottom: Spacing.medium, width: '100%' }}
              >
                <Text style={AppStyles.label}>{field}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setCurrentField(field), setShowSelect(true);
                  }}
                >
                  <Text style={AppStyles.input}>{`Chọn ${field}`}</Text>
                </TouchableOpacity>
              </View>
            ))}
            <Modal
              transparent={true}
              animationType="slide"
              visible={showSelects}
              onRequestClose={() => setShowSelect(false)} // Đóng modal khi nhấn ngoài
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: 10,
                  // top: '40%',
                  justifyContent: 'center',
                  // marginHorizontal: Spacing.medium,
                  paddingVertical: Spacing.medium,
                  paddingHorizontal: Spacing.medium,
                }}
              >
                {options[currentField]?.map((option: string, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleValueSelect(option)}
                  >
                    <Text style={AppStyles.input}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Modal>
            <Text style={AppStyles.label}>Lệnh sản xuất</Text>
            <TouchableOpacity>
              <Text style={AppStyles.input}>
                {lenhSX || 'Chọn lệnh sản xuất'}
              </Text>
            </TouchableOpacity>
          </View> */}
          <View style={{ flex: 1, marginBottom: 10 }}>
            <View>
              <View>
                <Text style={AppStyles.label}>Chọn lệnh sản xuất</Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedField('lenhSX');
                    setShowSelect(!showSelects);
                  }}
                >
                  <Text style={AppStyles.input}>
                    {lenhSX || 'Chon lenh sx'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={AppStyles.label}>Chọn lệnh sản xuất</Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedField('soCa');
                    setShowSelect(!showSelects);
                  }}
                >
                  <Text style={AppStyles.input}>{soCa || 'Chon so ca'}</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedField('congDoan');
                    setShowSelect(!showSelects);
                  }}
                >
                  <Text style={AppStyles.input}>
                    {congDoan || 'Chon cong doan'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedField('soMay');
                    setShowSelect(!showSelects);
                  }}
                >
                  <Text style={AppStyles.input}>{soMay || 'Chon so may'}</Text>
                </TouchableOpacity>
              </View>
              {/* <View
                style={{
                  display: showSelects ? 'flex' : 'none',
                  position: 'absolute',
                  width: '100%',
                  top: 0,
                  marginTop: 50,
                  paddingTop: Spacing.small,
                  backgroundColor: Colors.white,
                  zIndex: 9999, // Đảm bảo dropdown luôn xuất hiện phía trên các phần tử khác
                }}
              >
                {lenhSX1.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleValueSelect(item)}
                    // style={AppStyles.input}
                  >
                    <Text style={AppStyles.input}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View> */}
            </View>
            <View
              style={{
                position: 'absolute',
                top: 150, // Điều chỉnh tùy vào vị trí của các input trước đó
                width: '100%',
                backgroundColor: Colors.white,
                zIndex: 9999,
                padding: Spacing.small,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#ddd',
              }}
            >
              {selectedField === 'lenhSX' &&
                lenhSX1.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleValueSelect(item)}
                  >
                    <Text style={AppStyles.input}>{item}</Text>
                  </TouchableOpacity>
                ))}

              {selectedField === 'soCa' &&
                soCa1.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleValueSelect(item)}
                  >
                    <Text style={AppStyles.input}>{item}</Text>
                  </TouchableOpacity>
                ))}

              {selectedField === 'congDoan' &&
                congDoan1.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleValueSelect(item)}
                  >
                    <Text style={AppStyles.input}>{item}</Text>
                  </TouchableOpacity>
                ))}

              {selectedField === 'soMay' &&
                soMay1.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleValueSelect(item)}
                  >
                    <Text style={AppStyles.input}>{item}</Text>
                  </TouchableOpacity>
                ))}
            </View>
            {/* <View>
              <Text style={AppStyles.label}>Số máy</Text>
              <TouchableOpacity onPress={() => console.log('abc')}>
                <Text style={AppStyles.input}></Text>
                <View
                  style={{
                    display: showSelects ? 'none' : 'none',
                    position: 'absolute',
                    top: 70,

                    width: '100%',
                  }}
                >
                  {lenhSX1.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleValueSelect(item)}
                      // style={AppStyles.input}
                    >
                      <Text style={AppStyles.input}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={AppStyles.label}> Công đoạn</Text>
              <TouchableOpacity onPress={() => console.log('abc')}>
                <Text style={AppStyles.input}></Text>
                <View
                  style={{
                    display: showSelects ? 'none' : 'none',
                    position: 'absolute',
                    top: 70,

                    width: '100%',
                  }}
                >
                  {lenhSX1.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleValueSelect(item)}
                      // style={AppStyles.input}
                    >
                      <Text style={AppStyles.input}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={AppStyles.label}>Số ca </Text>
              <TouchableOpacity onPress={() => console.log('abc')}>
                <Text style={AppStyles.input}></Text>
                <View
                  style={{
                    display: showSelects ? 'none' : 'none',
                    position: 'absolute',
                    top: 70,

                    width: '100%',
                  }}
                >
                  {lenhSX1.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleValueSelect(item)}
                      // style={AppStyles.input}
                    >
                      <Text style={AppStyles.input}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableOpacity>
            </View> */}
          </View>
          {/* <View style={{ flex: 1 }}>
            <Text style={AppStyles.label}>Chọn lệnh sản xuất</Text>
            <TouchableOpacity onPress={() => setShowSelect(!showSelects)}>
              <Text style={AppStyles.input}></Text>
              <View
                style={{
                  display: showSelects ? 'flex' : 'none',
                  position: 'absolute',
                  top: 70,

                  width: '100%',
                }}
              >
                {lenhSX1.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleValueSelect(item)}
                    // style={AppStyles.input}
                  >
                    <Text style={AppStyles.input}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </View> */}
          {/* <AppButton
            onPress={() => handleSettingSubmit()}
            title={TITLES.accept}
            customStyle={[
              {
                marginTop: Spacing.xlarge,
                marginHorizontal: Spacing.medium,
              },
            ]}
          ></AppButton> */}
        </View>
        <View style={AppStyles.footer}></View>
      </View>
      {/* Custom Toast */}
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
    paddingHorizontal: Spacing.lagre,
  },
});

export default SettingScreen;
