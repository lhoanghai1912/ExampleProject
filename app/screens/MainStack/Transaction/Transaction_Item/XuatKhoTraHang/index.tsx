import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import styles from './style';
import CalendarModal from '../../../../../components/Modal/DateTime';
import AppButton from '../../../../../components/AppButton';
import { ICONS, TITLES } from '../../../../../utils/constants';
import { Spacing } from '../../../../../utils/spacing';
import NavBar from '../../../../../components/Navbar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStyles from '../../../../../components/AppStyle';
import { Colors } from '../../../../../utils/color';
import AppInput from '../../../../../components/AppInput';
import { Fonts } from '../../../../../utils/fontSize';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import CustomDropdown from '../../../../../components/DropDown';
import { navigate } from '../../../../../navigation/RootNavigator';
import { Screen_Name } from '../../../../../navigation/ScreenName';
import AppToast from '../../../../../components/AppToast';

interface Props {
  navigation: any;
  route: any;
}
const XuatKhoTraHangScreen: React.FC<Props> = ({ navigation }) => {
  const [soCa, setSoCa] = useState('');
  const [soPhieu, setSoPhieu] = useState('');
  const [khoXuat, setKhoXuat] = useState('');
  const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
  const [selectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [docDate, setDocDate] = useState(selectedDate);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isCameraOn, setIsCameraOn] = useState(false); // State for camera activation
  const device = useCameraDevice('back');

  useEffect(() => {
    // Lấy dữ liệu từ AsyncStorage khi màn hình được render
    const loadData = async () => {
      const soCaValue = await AsyncStorage.getItem('SoCa');
      const soPhieuValue = await AsyncStorage.getItem('SoPhieu');
      const khoXuatValue = await AsyncStorage.getItem('KhoXuat');
      if (soCaValue) setSoCa(soCaValue);
      if (soPhieuValue) setSoPhieu(soPhieuValue);
      if (khoXuatValue) setKhoXuat(khoXuatValue);
    };

    loadData();
  }, []);
  const handleDateSelect = (date: string) => {
    setDocDate(date);
    setModalCalendarVisible(false);
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
  const handleValueSubmit = (val: string, dropdownName: string) => {
    console.log('Selected value:', val);
    // Cập nhật các state với giá trị đã chọn
    switch (dropdownName) {
      case 'Số ca':
        setSoCa(val);
        break;
    }
  };
  const handleBackPress = () => {
    navigation.goBack(); // This will navigate back to the previous screen
  };
  const handleSubmit = async () => {
    // Kiểm tra các trường thông tin
    if (!soCa) {
      setToastMessage('Vui lòng điền đầy đủ thông tin');
      setToastVisible(true);
      return;
    }
    // Lưu dữ liệu vào AsyncStorage
    try {
      await AsyncStorage.setItem('SoCa', soCa);
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
      <NavBar title="Trả lại NVL " onPress={handleBackPress} />
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
                    <Text style={AppStyles.disable}>{soPhieu || ''}</Text>
                  </View>
                  <View>
                    <Text style={AppStyles.label}>Số ca</Text>
                    <Text style={AppStyles.disable}>{soCa || 'Ca'}</Text>
                  </View>
                </View>
                <View style={{ flex: 1, marginHorizontal: Spacing.medium }}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalCalendarVisible(true);
                    }}
                  >
                    <AppInput
                      editable={false}
                      value={docDate}
                      label="Ngày nhập kho"
                    ></AppInput>
                  </TouchableOpacity>
                  <AppInput label="Kho nhập" editable={false}></AppInput>
                </View>
              </View>
            </View>
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
                    <Text style={AppStyles.disable}>{soPhieu || ''}</Text>
                  </View>
                  <View>
                    <Text style={AppStyles.label}>Tên NVL</Text>
                    <Text style={AppStyles.disable}>{soPhieu || ''}</Text>
                  </View>
                  <View>
                    <Text style={AppStyles.label}>Số lô</Text>
                    <Text style={AppStyles.disable}>{soPhieu || ''}</Text>
                  </View>
                </View>
                <View style={{ flex: 1, marginHorizontal: Spacing.medium }}>
                  <View>
                    <Text style={AppStyles.label}>SL đã xuất</Text>
                    <Text style={AppStyles.input}>{soPhieu || ''}</Text>
                  </View>
                  <View>
                    <Text style={AppStyles.label}>SL thực trả</Text>
                    <Text style={AppStyles.input}>{soPhieu || ''}</Text>
                  </View>
                  <View>
                    <Text style={AppStyles.label}>Đơn vị tính</Text>
                    <Text style={AppStyles.disable}>{soPhieu || ''}</Text>
                  </View>
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

export default XuatKhoTraHangScreen;
