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

import AppToast from '../../../../../components/AppToast';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  navigation: any;
  route: any;
}
const XuatKhoTraHangScreen: React.FC<Props> = ({ navigation }) => {
  const [soCa, setSoCa] = useState('');
  const [soPhieu, setSoPhieu] = useState('');
  const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
  const [selectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [docDate, setDocDate] = useState(selectedDate);
  const [showIndex, setShowIndex] = useState<number | null>(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isCameraOn, setIsCameraOn] = useState(false); // State for camera activation
  const device = useCameraDevice('back');
  const [slDaXuat, setSLDaXuat] = useState('');
  const [slThucTra, setSlThucTra] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const data = [
    {
      label: 'Kho xuất',
      field: 'khoXuat',
      data: ['Kho 1', 'Kho 2', 'Kho 3', 'Kho 4'],
    },
  ];
  const [fields, setFields] = useState<{ [key: string]: string }>({
    khoXuat: '',
    slDaXuat: '',
    slThucTra: '',
  });
  const [inputStyles, setInputStyles] = useState<{ [key: string]: object }>({
    khoXuat: {},
    slDaXuat: {},
    slThucTra: {},
  });
  useEffect(() => {
    // Lấy dữ liệu từ AsyncStorage khi màn hình được render
    const loadData = async () => {
      const soCaValue = await AsyncStorage.getItem('SoCa');
      const soPhieuValue = await AsyncStorage.getItem('SoPhieu');
      if (soCaValue) setSoCa(soCaValue);
      if (soPhieuValue) setSoPhieu(soPhieuValue);
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
  const handleBackPress = () => {
    navigation.goBack(); // This will navigate back to the previous screen
  };
  useEffect(() => {
    if (submitted) {
      const updateInputstyle: any = {};

      Object.keys(fields).forEach(field => {
        if (fields[field]) {
          updateInputstyle[field] = { borderColor: 'white' }; // Nếu có giá trị, thì không có viền đỏ
        } else {
          updateInputstyle[field] = { borderColor: 'red' }; // Nếu không có giá trị, bôi đỏ viền
        }
      });
      setInputStyles(updateInputstyle); // Cập nhật lại trạng thái viền
    }
  }, [fields]);
  const handleSubmit = async () => {
    // Lưu dữ liệu vào AsyncStorage
    setSubmitted(true);
    let isError = false;

    const updateInputstyle: any = {};
    Object.keys(fields).forEach(field => {
      if (!fields[field]) {
        isError = true;
        updateInputstyle[field] = { borderColor: 'red' };
      }
    });

    setInputStyles(updateInputstyle);
    if (isError) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: `Vui lòng nhập đủ các trường`,
        visibilityTime: 1500,
        autoHide: true,
      });
    } else {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: `Cập nhật thành công`,
        visibilityTime: 1500,
        autoHide: true,
      });
      setTimeout(() => {
        navigation.goBack(); // Quay lại màn hình trước
      }, 1500);
    }
  };
  return (
    <LinearGradient
      colors={[Colors.primary, '#ffffff']}
      style={styles.container}
    >
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
                marginVertical: Spacing.large,
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
                    <View>
                      {data.map((dropdown, idx) => (
                        <View key={idx} style={AppStyles.dropdownWrapper}>
                          <Text style={AppStyles.label}>{dropdown.label}</Text>
                          <TouchableOpacity
                            onPress={() =>
                              setShowIndex(showIndex === idx ? null : idx)
                            }
                          >
                            <Text
                              style={[
                                AppStyles.input,
                                inputStyles[dropdown.field],
                              ]}
                            >
                              {fields[dropdown.field] || 'Select value'}
                            </Text>
                          </TouchableOpacity>

                          {showIndex === idx && (
                            <View style={AppStyles.dropdown}>
                              {dropdown.data.map((item: string, i: number) => (
                                <TouchableOpacity
                                  key={i}
                                  style={AppStyles.dropdownItem}
                                  onPress={() => {
                                    setFields(prev => ({
                                      ...prev,
                                      [dropdown.field]: item,
                                    }));
                                    setShowIndex(null);
                                  }}
                                >
                                  <Text style={AppStyles.text}>{item}</Text>
                                </TouchableOpacity>
                              ))}
                            </View>
                          )}
                        </View>
                      ))}
                    </View>
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
                    <AppInput
                      label="SL Đã xuất"
                      style={inputStyles['slDaXuat']}
                      value={slDaXuat || ''}
                      onChangeText={text => {
                        setSLDaXuat(text);
                        setFields(prev => ({ ...prev, slDaXuat: text })); // Cập nhật fields
                      }}
                    ></AppInput>
                    <AppInput
                      label="SL thực trả"
                      style={inputStyles['slThucTra']}
                      value={slThucTra || ''}
                      onChangeText={text => {
                        setSlThucTra(text);
                        setFields(prev => ({ ...prev, slThucTra: text })); // Cập nhật fields
                      }}
                    ></AppInput>
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
      </View>
    </LinearGradient>
  );
};

export default XuatKhoTraHangScreen;
