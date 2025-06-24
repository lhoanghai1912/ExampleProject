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
import moment from 'moment';
import CalendarModal from '../../../../../components/Modal/DateTime';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppToast from '../../../../../components/AppToast';
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
  useEffect(() => {
    // Lấy dữ liệu từ AsyncStorage khi màn hình được render
    const loadData = async () => {
      const lenhSXValue = await AsyncStorage.getItem('LenhSX');

      if (lenhSXValue) setLenhSX(lenhSXValue);
    };

    loadData();
  }, []);

  const handleDateSelect = (date: string) => {
    setDocDate(date);
    setModalCalendarVisible(false);
  };

  return (
    <View style={styles.container}>
      <NavBar title="Nhập Thành Phẩm" onPress={() => navigation.goBack()} />
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
                  <AppInput label="Số phiếu" editable={false}></AppInput>
                  <AppInput
                    label="Lệnh sản xuất"
                    value={lenhSX}
                    editable={false}
                  ></AppInput>
                </View>
                <View style={{ flex: 1, marginHorizontal: Spacing.medium }}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalCalendarVisible(true);
                    }}
                  >
                    <AppInput
                      editable={false}
                      label="Ngày nhập kho"
                      value={docDate}
                      onPress={() => {
                        setModalCalendarVisible(true);
                      }}
                    ></AppInput>
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
                  <AppInput label="Mã TP/BTP" editable={false}></AppInput>
                  <AppInput label="Tên TP/BTP" editable={false}></AppInput>
                </View>
                <View style={{ flex: 1, marginHorizontal: Spacing.medium }}>
                  <AppInput label="SL nhập kho"></AppInput>
                  <AppInput label="DVT"></AppInput>
                </View>
              </View>
            </View>
          </View>
          <AppButton
            title={TITLES.accept}
            onPress={() => console.log('Accepted')}
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
