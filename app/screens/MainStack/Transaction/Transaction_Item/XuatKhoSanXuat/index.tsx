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
import UserInfoModal from '../../../../../components/Modal/UserInfo';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';

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
  const [submitted, setSubmitted] = useState(false);
  const [slThucXuat, setSLThucXuat] = useState('');
  const [showIndex, setShowIndex] = useState<number | null>(null);
  const [dvTinh, setDvTinh] = useState('');
  const data = [
    {
      label: 'Kho xuất',
      field: 'khoXuat',
      data: ['Kho 1', 'Kho 2', 'Kho 3', 'Kho 4'],
    },
  ];
  const [fields, setFields] = useState<{ [key: string]: string }>({
    khoXuat: '',
    slThucXuat: '',
    dvTinh: '',
  });
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
  const [inputStyles, setInputStyles] = useState<{ [key: string]: object }>({
    khoXuat: {},
    slThucXuat: {},
    dvTinh: {},
  });
  const onSubmit = async () => {
    // Lưu dữ liệu vào AsyncStorage khi người dùng nhấn nút Submit
    try {
      console.log('Data saved successfully');
      if (!lenhSX || !soCa || !congDoan || !soMay) {
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
  const handleBackPress = () => {
    navigation.goBack();
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
    let isError1 = false;

    const updateInputstyle: any = {};
    Object.keys(fields).forEach(field => {
      if (!fields[field]) {
        isError = true;
        updateInputstyle[field] = { borderColor: 'red' };
      }
    });

    // Kiểm tra các trường riêng biệt như slThucXuat và dvTinh
    if (!slThucXuat) {
      isError = true;
      updateInputstyle['slThucXuat'] = { borderColor: 'red' };
    }

    if (!dvTinh) {
      isError = true;
      updateInputstyle['dvTinh'] = { borderColor: 'red' };
    }
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
    } else if (isError1) {
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
        <View style={{ flex: 1 }}>
          <NavBar title="Xuất Kho Sản Xuất" onPress={handleBackPress} />
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
                        <Text style={AppStyles.disable}>{'Số phiếu'}</Text>
                      </View>
                      <View>
                        <Text style={AppStyles.label}>Số lô</Text>
                        <Text style={AppStyles.disable}>{'Số lô'}</Text>
                      </View>
                      <View>
                        <Text style={AppStyles.label}>Lệnh sản xuất</Text>
                        <Text style={AppStyles.disable}>
                          {lenhSX || 'Lệnh sản xuất'}
                        </Text>
                      </View>
                      <View>
                        <Text style={AppStyles.label}>Số máy</Text>
                        <Text style={AppStyles.disable}>{soMay || 'Máy'}</Text>
                      </View>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: Spacing.medium }}>
                      <View>
                        <View>
                          {data.map((dropdown, idx) => (
                            <View key={idx} style={AppStyles.dropdownWrapper}>
                              <Text style={AppStyles.label}>
                                {dropdown.label}
                              </Text>
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
                                  {dropdown.data.map(
                                    (item: string, i: number) => (
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
                                        <Text style={AppStyles.text}>
                                          {item}
                                        </Text>
                                      </TouchableOpacity>
                                    ),
                                  )}
                                </View>
                              )}
                            </View>
                          ))}
                        </View>
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

                      <View>
                        <Text style={AppStyles.label}>Số ca</Text>
                        <Text style={AppStyles.disable}>{soCa || 'Ca'}</Text>
                      </View>

                      <View>
                        <Text style={AppStyles.label}>Công đoạn</Text>
                        <Text style={AppStyles.disable}>
                          {congDoan || 'Công đoạn'}
                        </Text>
                      </View>
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
                      <AppInput
                        label="SL thực xuất"
                        style={inputStyles['slThucXuat']}
                        value={slThucXuat || ''}
                        onChangeText={text => {
                          setSLThucXuat(text);
                          setFields(prev => ({ ...prev, slThucXuat: text })); // Cập nhật fields
                        }}
                      ></AppInput>
                      <AppInput
                        label="Đơn vị tính"
                        style={inputStyles['dvTinh']}
                        value={dvTinh || ''}
                        onChangeText={text => {
                          setDvTinh(text);
                          setFields(prev => ({ ...prev, dvTinh: text })); // Cập nhật fields
                        }}
                      ></AppInput>
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
              onSubmit();
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

export default XuatKhoSanXuatScreen;
