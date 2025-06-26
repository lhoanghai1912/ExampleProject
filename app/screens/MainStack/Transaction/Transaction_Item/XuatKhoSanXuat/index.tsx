import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './style';
import NavBar from '../../../../../components/Navbar';
import AppStyles from '../../../../../components/AppStyle';
import { ICONS, IMAGES, TITLES } from '../../../../../utils/constants';
import { Colors } from '../../../../../utils/color';
import { Spacing } from '../../../../../utils/spacing';
import AppInput from '../../../../../components/AppInput';
import { Fonts } from '../../../../../utils/fontSize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from '../../../../../components/AppButton';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import CalendarModal from '../../../../../components/Modal/DateTime';
import moment from 'moment';
import AppToast from '../../../../../components/AppToast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomDropdown from '../../../../../components/DropDown';
import { navigate } from '../../../../../navigation/RootNavigator';
import { Screen_Name } from '../../../../../navigation/ScreenName';

interface Props {
  navigation: any;
  route: any;
}
const XuatKhoSanXuatScreen: React.FC<Props> = ({ navigation }) => {
  const [lenhSX, setLenhSX] = useState('');
  const [soCa, setSoCa] = useState('');
  const [congDoan, setCongDoan] = useState('');
  const [soMay, setSoMay] = useState('');
  const device = useCameraDevice('back');
  const [isCameraOn, setIsCameraOn] = useState(false); // State for camera activation
  const { hasPermission, requestPermission } = useCameraPermission();
  const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
  const [selectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [docDate, setDocDate] = useState(selectedDate);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
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

  const onSubmit = async () => {
    // Lưu dữ liệu vào AsyncStorage khi người dùng nhấn nút Submit
    try {
      console.log('Data saved successfully');
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
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  };
  const handleQR = async () => {
    requestPermission();
    if (hasPermission) {
      console.log('Request Permission Accecpted');

      setIsCameraOn(true);
    }
  };
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
    },
  });
  const handleDateSelect = (date: string) => {
    setDocDate(date);
    setModalCalendarVisible(false);
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
  };
  const handleSubmit = async () => {
    // Kiểm tra các trường thông tin
    if (!lenhSX || !soCa || !soMay || !congDoan) {
      setToastMessage('Vui lòng điền đầy đủ thông tin');
      setToastVisible(true);
      return;
    }

    // Lưu dữ liệu vào AsyncStorage
    try {
      await AsyncStorage.setItem('LenhSX', lenhSX);
      await AsyncStorage.setItem('SoCa', soCa);
      await AsyncStorage.setItem('CongDoan', congDoan);
      await AsyncStorage.setItem('SoMay', soMay);
      setToastMessage('Dữ liệu đã được lưu thành công');
      setToastVisible(true);
      setTimeout(() => {
        navigation.goBack(); // Navigate back after 1.5 seconds
      }, 500);
    } catch (error) {
      console.error('Error saving data:', error);
      setToastMessage('Lỗi khi lưu dữ liệu');
      setToastVisible(true);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <NavBar title="Xuất Kho Sản Xuất" navigation={navigation} />
        <KeyboardAwareScrollView
          style={AppStyles.scrollView}
          scrollEnabled
          contentContainerStyle={AppStyles.scrollContent}
        >
          <View style={[AppStyles.body, { marginBottom: Spacing.xlarge }]}>
            <View
              style={{
                flex: 1,
                marginVertical: Spacing.lagre,
                marginHorizontal: Spacing.medium,
              }}
            >
              <View
                style={{
                  borderColor: Colors.Gray,
                  borderWidth: 1,
                  marginBottom: Spacing.medium,
                  borderRadius: 10,
                  paddingVertical: Spacing.small,
                  paddingHorizontal: Spacing.small,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: Spacing.small,
                  }}
                >
                  <Text
                    style={[
                      AppStyles.text,
                      { fontSize: Fonts.large, verticalAlign: 'middle' },
                    ]}
                  >
                    Thông tin Phiếu
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleQR()}
                    style={{
                      backgroundColor: Colors.Gray,
                      padding: 5,
                      width: 50,
                      height: 50,
                      borderRadius: 500,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      source={ICONS.scan}
                      style={[AppStyles.icon, { borderRadius: 500 }]}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: Spacing.medium,
                  }}
                >
                  <View style={{ flex: 1, marginHorizontal: Spacing.medium }}>
                    <View>
                      <Text style={AppStyles.label}>Số phiếu</Text>
                      <Text style={AppStyles.disable}>{'Số phiếu'}</Text>
                    </View>
                    <View>
                      <Text style={AppStyles.label}>Số lô</Text>
                      <Text style={AppStyles.disable}>{'Số lô'}</Text>
                    </View>
                    {/* <CustomDropdown
                      label="Lệnh sản xuất"
                      placeHolder="Chọn Lệnh sản xuất"
                      options={['CT1', 'CT2', 'CT3']}
                      value={lenhSX}
                      onSubmit={val => handleValueSubmit(val, 'Lệnh sản xuất')}
                    /> */}
                    <View>
                      <Text style={AppStyles.label}>Lệnh sản xuất</Text>
                      <TouchableOpacity>
                        <Text style={AppStyles.input}>{lenhSX}</Text>
                      </TouchableOpacity>
                    </View>
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
                  </View>
                  <View style={{ flex: 1, marginHorizontal: Spacing.medium }}>
                    <View>
                      <Text style={AppStyles.label}>Kho xuất</Text>
                      <Text style={AppStyles.disable}>{'Kho xuất'}</Text>
                    </View>
                    <View>
                      <Text style={AppStyles.label}>Ngày xuất Kho</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setModalCalendarVisible(true);
                        }}
                      >
                        <Text style={AppStyles.input}>
                          {moment(docDate).format('DD/MM/YYYY')}
                        </Text>
                      </TouchableOpacity>
                    </View>

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
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderColor: Colors.Gray,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingVertical: Spacing.small,
                  paddingHorizontal: Spacing.small,
                }}
              >
                <Text style={[AppStyles.text, { fontSize: Fonts.large }]}>
                  Thông tin Vật liệu
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: Spacing.medium,
                  }}
                >
                  <View style={{ flex: 1, marginHorizontal: Spacing.medium }}>
                    <View>
                      <Text style={AppStyles.label}>Mã NVL</Text>
                      <Text style={AppStyles.disable}>{'Mã NVL'}</Text>
                    </View>
                    <View>
                      <Text style={AppStyles.label}>Tên NVL</Text>
                      <Text style={AppStyles.disable}>{'Tên NVL'}</Text>
                    </View>
                  </View>
                  <View style={{ flex: 1, marginHorizontal: Spacing.medium }}>
                    <AppInput label="SL thực xuất"></AppInput>
                    <AppInput label="DVT"></AppInput>
                  </View>
                </View>
              </View>
            </View>
            <AppButton
              title={TITLES.accept}
              onPress={() => handleSubmit()}
              customStyle={[{ marginHorizontal: Spacing.xxxlarge }]}
            ></AppButton>
          </View>
        </KeyboardAwareScrollView>
      </View>
      {/* Camera */}
      <View
        style={[
          {
            display: isCameraOn ? 'flex' : 'none',
            position: 'absolute',
            top: '35%',
            width: '50%',
            height: '30%',
            zIndex: 2,
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: 0.5,
          },
        ]}
      >
        {device && (
          <Camera
            style={[
              StyleSheet.absoluteFill,
              { display: isCameraOn ? 'flex' : 'none', flex: 1 },
            ]}
            device={device}
            isActive={isCameraOn}
            codeScanner={codeScanner}
          />
        )}
        <AppButton
          title="X"
          customStyle={[
            {
              position: 'absolute',
              bottom: 10,
              width: 50,
              height: 50,
              borderRadius: 500,
            },
          ]}
          onPress={() => {
            setIsCameraOn(false);
          }}
        />
      </View>
      <CalendarModal
        visible={modalCalendarVisible}
        selectedDate={docDate}
        onDateSelect={handleDateSelect}
        onClose={() => setModalCalendarVisible(!modalCalendarVisible)}
      />
      <AppToast
        message={toastMessage}
        visible={toastVisible}
        duration={3000}
        onHide={() => setToastVisible(false)}
      />
    </View>
  );
};

export default XuatKhoSanXuatScreen;
