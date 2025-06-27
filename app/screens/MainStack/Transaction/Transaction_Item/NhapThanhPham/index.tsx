import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import NavBar from '../../../../../components/Navbar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppStyles from '../../../../../components/AppStyle';
import { Spacing } from '../../../../../utils/spacing';
import AppInput from '../../../../../components/AppInput';
import AppButton from '../../../../../components/AppButton';
import { ICONS, TITLES } from '../../../../../utils/constants';
import { Colors } from '../../../../../utils/color';
import { Fonts } from '../../../../../utils/fontSize';
import moment, { duration } from 'moment';
import CalendarModal from '../../../../../components/Modal/DateTime';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppToast from '../../../../../components/AppToast';
import CustomDropdown from '../../../../../components/DropDown';
interface Props {
  navigation: any;
  route: any;
}

const NhapThanhPhamScreen: React.FC<Props> = ({ navigation }) => {
  const [modalCalendarVisible, setModalCalendarVisible] = useState(false);
  const [selectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [docDate, setDocDate] = useState(selectedDate);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [lenhSX, setLenhSX] = useState('');
  const [soPhieu, setSoPhieu] = useState('');
  const [tenTP, setTenTP] = useState('');
  const [maTP, setMaTP] = useState('');

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
  const handleValueSubmit = (val: string, dropdownName: string) => {
    console.log('Selected value:', val);
    // Cập nhật các state với giá trị đã chọn
    switch (dropdownName) {
      case 'Lệnh sản xuất':
        setLenhSX(val);
        break;
    }
  };
  const handleSubmit = async () => {
    // Kiểm tra các trường thông tin
    if (!lenhSX) {
      setToastMessage('Vui lòng điền đầy đủ thông tin');
      setToastVisible(true);
      return;
    }

    // Lưu dữ liệu vào AsyncStorage
    try {
      await AsyncStorage.setItem('LenhSX', lenhSX);
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
                  <AppInput editable={false} label="Kho nhập"></AppInput>
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
                  <AppInput label="SL nhập kho"></AppInput>
                </View>
                <View style={{ flex: 1, marginHorizontal: Spacing.medium }}>
                  <View>
                    <Text style={AppStyles.label}>Tên TP/BTP</Text>
                    <Text style={AppStyles.disable}>{soPhieu || ''}</Text>
                  </View>
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

export default NhapThanhPhamScreen;
