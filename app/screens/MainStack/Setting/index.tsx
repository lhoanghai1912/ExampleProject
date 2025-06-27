import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavBar from '../../../components/Navbar';
import { TITLES } from '../../../utils/constants';
import AppStyles from '../../../components/AppStyle';
import { Spacing } from '../../../utils/spacing';
import AppButton from '../../../components/AppButton';
import AppToast from '../../../components/AppToast';
import { Colors } from '../../../utils/color';
import UserInfoModal from '../../../components/Modal/UserInfo';
import { Fonts } from '../../../utils/fontSize';
import Toast from 'react-native-toast-message';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: any;
  route: any;
}
const SettingScreen: React.FC<Props> = ({ navigation }) => {
  // const [lenhSX, setLenhSX] = useState('');
  // const [soCa, setSoCa] = useState('');
  // const [congDoan, setCongDoan] = useState('');
  // const [soMay, setSoMay] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [type, setType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedField, setSelectedField] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [fields, setFields] = useState<{ [key: string]: string }>({
    lenhSX: '',
    soCa: '',
    congDoan: '',
    soMay: '',
  });
  // Load dữ liệu từ AsyncStorage khi màn hình được load
  useEffect(() => {
    const loadData = async () => {
      const lenhSX = await AsyncStorage.getItem('LenhSX');
      const soCa = await AsyncStorage.getItem('SoCa');
      const congDoan = await AsyncStorage.getItem('CongDoan');
      const soMay = await AsyncStorage.getItem('SoMay');
      setFields({
        lenhSX: lenhSX || '',
        soCa: soCa || '',
        congDoan: congDoan || '',
        soMay: soMay || '',
      });
    };
    loadData();
  }, []);

  const handlePressModal = (type: string) => {
    setType(type);
    setShowModal(true);
  };
  const [inputStyles, setInputStyles] = useState<{ [key: string]: object }>({
    lenhSX: {},
    soCa: {},
    congDoan: {},
    soMay: {},
  });

  const handleModalClose = (data: string | null) => {
    setShowModal(false);
    if (data) {
      setFields(prev => ({ ...prev, [selectedField]: data }));
    }
  };
  // Cập nhật viền mỗi khi dữ liệu thay đổi
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
  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleSummit = async () => {
    setSubmitted(true);
    let isError = false;
    const updateInputstyle: any = {};

    Object.keys(fields).forEach(field => {
      if (!fields[field]) {
        updateInputstyle[field] = { borderColor: 'red' };
        isError = true;
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
      await AsyncStorage.setItem('LenhSX', fields.lenhSX);
      await AsyncStorage.setItem('SoCa', fields.soCa);
      await AsyncStorage.setItem('CongDoan', fields.congDoan);
      await AsyncStorage.setItem('SoMay', fields.soMay);

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
    <View style={styles.container}>
      <View style={{ backgroundColor: Colors.primary }}>
        <NavBar title={TITLES.user} onPress={handleBackPress} />
      </View>
      <View style={[AppStyles.body]}>
        <View style={styles.wrapBody}>
          <View>
            <Text style={AppStyles.title}>Thiết lập ca làm việc</Text>
            {[
              { label: 'Lệnh sản xuất', field: 'lenhSX' },
              { label: 'Số máy', field: 'soMay' },
              { label: 'Số ca', field: 'soCa' },
              { label: 'Công đoạn', field: 'congDoan' },
            ].map(({ label, field }, index) => (
              <View key={index} style={{ marginBottom: Spacing.medium }}>
                <Text style={AppStyles.label}>{label}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedField(field);
                    handlePressModal(field);
                  }}
                >
                  <Text
                    style={[AppStyles.input, inputStyles[field]]}
                    // editable={false}
                    // onChangeText={value => handleInputChange(field, value)} // Xử lý thay đổi input
                  >
                    {fields[field] || `Chọn ${label}`}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
            <AppButton
              onPress={() => handleSummit()}
              title={TITLES.accept}
              customStyle={[
                {
                  marginHorizontal: Spacing.medium,
                  marginVertical: Spacing.small,
                },
              ]}
            />
          </View>
        </View>
      </View>
      <UserInfoModal
        type={type}
        visible={showModal}
        onClose={handleModalClose}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  wrapBody: {
    // flex: 1,
    borderRadius: 50,
    marginTop: Spacing.lagre,
    paddingVertical: Spacing.lagre,
    paddingHorizontal: Spacing.medium,
    justifyContent: 'space-around',
    // marginHorizontal: Spacing.medium,
    backgroundColor: Colors.Gray,
  },

  changePassword: {
    color: 'blue',
    textAlign: 'right',
    fontSize: Fonts.normal,
    paddingHorizontal: Spacing.medium,
    marginBottom: Spacing.small,
  },
});
export default SettingScreen;
