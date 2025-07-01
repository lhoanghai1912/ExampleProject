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
import LinearGradient from 'react-native-linear-gradient';

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
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showIndex, setShowIndex] = useState<number | null>(null);

  const data = [
    {
      label: 'Lệnh sản xuất',
      field: 'lenhSX',
      data: ['lenhSX1', 'lenhSX2', 'lenhSX3', 'lenhSX4'],
    },
    {
      label: 'Số máy',
      field: 'soMay',
      data: ['May 1', 'May 2', 'May 3', 'May 4'],
    },
    { label: 'Số ca', field: 'soCa', data: ['Ca 1', 'Ca 2', 'Ca 3', 'Ca 4'] },
    {
      label: 'Công đoạn',
      field: 'congDoan',
      data: ['congDoan 1', 'congDoan 2', 'congDoan 3', 'congDoan 4'],
    },
  ];
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

  const [inputStyles, setInputStyles] = useState<{ [key: string]: object }>({
    lenhSX: {},
    soCa: {},
    congDoan: {},
    soMay: {},
  });

  // Cập nhật viền mỗi kh dữ liệu thay đổi
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
    <LinearGradient
      colors={[Colors.primary, '#ffffff']}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={{ backgroundColor: Colors.primary }}>
          <NavBar title={TITLES.settings} onPress={handleBackPress} />
        </View>
        <View style={[AppStyles.body]}>
          <View style={styles.wrapBody}>
            <View>
              <Text style={AppStyles.title}>Thiết lập ca làm việc</Text>
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
                        style={[AppStyles.input, inputStyles[dropdown.field]]}
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
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapBody: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 50,
    marginTop: Spacing.large,
    paddingVertical: Spacing.large,
    paddingHorizontal: Spacing.medium,
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
