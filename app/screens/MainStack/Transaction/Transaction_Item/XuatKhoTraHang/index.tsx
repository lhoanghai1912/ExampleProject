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

interface Props {
  navigation: any;
  route: any;
}
const XuatKhoTraHangScreen: React.FC<Props> = ({ navigation }) => {
  const [lenhSX, setLenhSX] = useState('');
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
      const lenhSXValue = await AsyncStorage.getItem('LenhSX');

      if (lenhSXValue) setLenhSX(lenhSXValue);
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
  return (
    <View style={styles.container}>
      <NavBar title="Trả lại NVL " onPress={() => navigation.goBack()} />
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
                position: 'absolute',
                top: Spacing.small,
                right: Spacing.small,
                zIndex: 1,
              }}
            >
              <Image
                source={ICONS.scan}
                style={[AppStyles.icon, { borderRadius: 500 }]}
              />
            </TouchableOpacity>
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
                    editable={false}
                    value={lenhSX}
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
                  <AppInput label="Mã TP/BTP" editable={false}></AppInput>
                  <AppInput label="Tên NVL" editable={false}></AppInput>
                  <AppInput label="Số lô" editable={false}></AppInput>
                </View>
                <View style={{ flex: 1, marginHorizontal: Spacing.medium }}>
                  <AppInput label="SL đã xuất"></AppInput>
                  <AppInput label="SL thực trả"></AppInput>
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
  );
};

export default XuatKhoTraHangScreen;
