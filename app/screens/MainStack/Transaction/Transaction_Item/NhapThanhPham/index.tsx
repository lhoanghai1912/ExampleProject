import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import NavBar from '../../../../../components/Navbar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppStyles from '../../../../../components/AppStyle';
import { Spacing } from '../../../../../utils/spacing';
import AppInput from '../../../../../components/AppInput';
import AppButton from '../../../../../components/AppButton';
import { TITLES } from '../../../../../utils/constants';
import { Colors } from '../../../../../utils/color';
import { Fonts } from '../../../../../utils/fontSize';
import moment, { duration } from 'moment';
import CalendarModal from '../../../../../components/Modal/DateTime';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppToast from '../../../../../components/AppToast';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
interface Props {
  navigation: any;
  route: any;
}

const NhapThanhPhamScreen: React.FC<Props> = ({ navigation }) => {
  const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
  const [selectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [docDate, setDocDate] = useState(selectedDate);

  const [lenhSX, setLenhSX] = useState('');
  const [soPhieu, setSoPhieu] = useState('');
  const [slNhapKho, setSlNhapKho] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showIndex, setShowIndex] = useState<number | null>(null);

  const data = [
    {
      label: 'Kho nhập',
      field: 'khoNhap',
      data: ['Kho 1', 'Kho 2', 'Kho 3', 'Kho 4'],
    },
  ];
  const [fields, setFields] = useState<{ [key: string]: string }>({
    khoNhap: '',
    slNhapKho: '',
  });
  const [inputStyles, setInputStyles] = useState<{ [key: string]: object }>({
    khoNhap: {},
    slNhapKho: {},
  });
  useEffect(() => {
    // Lấy dữ liệu từ AsyncStorage khi màn hình được render
    const loadData = async () => {
      const lenhSXValue = await AsyncStorage.getItem('LenhSX');
      const soPhieuValue = await AsyncStorage.getItem('SoPhieu');
      const maTpValue = await AsyncStorage.getItem('MaTP');
      const tenTPValue = await AsyncStorage.getItem('TenTP');
      if (lenhSXValue) setLenhSX(lenhSXValue);
      if (soPhieuValue) setSoPhieu(soPhieuValue);
      if (maTpValue) setSoPhieu(maTpValue);
      if (tenTPValue) setSoPhieu(tenTPValue);
    };

    loadData();
  }, []);
  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleDateSelect = (date: string) => {
    setDocDate(date);
    setModalCalendarVisible(false);
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
        <NavBar title="Nhập Thành Phẩm" onPress={handleBackPress} />
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
                <Text style={[AppStyles.text, { fontSize: Fonts.large }]}>
                  Thông tin Phiếu
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
                      <Text style={AppStyles.label}>Số phiếu</Text>
                      <Text style={AppStyles.disable}>{soPhieu || ''}</Text>
                    </View>
                    <AppInput
                      editable={false}
                      label="Ngày nhập kho"
                      value={docDate}
                      onPress={() => {
                        setModalCalendarVisible(true);
                      }}
                    ></AppInput>
                  </View>
                  <View style={{ flex: 1, marginHorizontal: Spacing.medium }}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalCalendarVisible(true);
                      }}
                    >
                      <View>
                        <Text style={AppStyles.label}>Lệnh sản xuất</Text>
                        <Text style={AppStyles.disable}>{lenhSX || ''}</Text>
                      </View>
                    </TouchableOpacity>
                    <View>
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
                      <Text style={AppStyles.label}>Mã TP/BTP</Text>
                      <Text style={AppStyles.disable}>{soPhieu || ''}</Text>
                    </View>
                    <AppInput
                      label="SL nhập kho"
                      style={inputStyles['slNhapKho']}
                      value={slNhapKho || ''}
                      onChangeText={text => {
                        setSlNhapKho(text);
                        setFields(prev => ({ ...prev, slNhapKho: text })); // Cập nhật fields
                      }}
                    ></AppInput>
                  </View>
                  <View style={{ flex: 1, marginHorizontal: Spacing.medium }}>
                    <View>
                      <Text style={AppStyles.label}>Tên TP/BTP</Text>
                      <Text style={AppStyles.disable}>{soPhieu || ''}</Text>
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

export default NhapThanhPhamScreen;
