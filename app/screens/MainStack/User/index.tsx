import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Image,
} from 'react-native';
import NavBar from '../../../components/Navbar';
import { IMAGES, TITLES } from '../../../utils/constants';
import AppStyles from '../../../components/AppStyle';
import AppInput from '../../../components/AppInput';
import { Spacing } from '../../../utils/spacing';
import AppButton from '../../../components/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../utils/color';
import { Fonts } from '../../../utils/fontSize';
import UserInfoModal from '../../../components/Modal/UserInfo';
import PasswordModal from '../../../components/Modal/Password';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserData } from '../../../redux/reducers/userSlice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  navigation: any;
  route: any;
}

const UserInfo_Screen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [Username, setUsername] = useState('');
  const [Fullname, setFullname] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showIndex, setShowIndex] = useState<number | null>(null);
  const [fields, setFields] = useState<{ [key: string]: string }>({
    Fullname: '',
    department: '',
    center: '',
  });
  const data = [
    {
      label: 'Phòng ban',
      field: 'department',
      data: ['Phòng Kinh Doanh', 'Phòng Marketing', 'Phòng IT'],
    },
    {
      label: 'Chức vụ',
      field: 'center',
      data: ['Manager', 'Developer', 'Designer'],
    },
  ];
  const { userData } = useSelector((state: any) => state.user);
  useEffect(() => {
    const loadData = async () => {
      setUsername(userData.username);
      setFullname(userData.fullname);
      console.log(userData);
      const department = userData.department;
      const center = userData.center;
      setFields({
        department: department || 'Chọn phòng ban',
        center: center || 'Chọn vị trí',
      });
    };
    loadData();
  }, [AsyncStorage]);

  const [inputStyles, setInputStyles] = useState<{ [key: string]: object }>({
    department: {},
    center: {},
  });

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
  const handleSummit = async () => {
    setSubmitted(true);
    let isError = false;
    let isError1 = false;
    const updateInputstyle: any = {};

    Object.keys(fields).forEach(field => {
      if (
        fields[field] === 'Chọn phòng ban' ||
        fields[field] === 'Chọn vị trí'
      ) {
        isError = true;
        updateInputstyle[field] = { borderColor: 'red' };
      } else if (!Fullname) {
        isError1 = true;

        updateInputstyle[Fullname] = { borderColor: 'red' };
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
    } else if (isError1) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: `Vui lòng điền họ tên`,
        visibilityTime: 1500,
        autoHide: true,
      });
    } else {
      dispatch(
        setUserData({
          userData: {
            ...userData, // Giữ lại tất cả các trường cũ trong userData
            fullname: Fullname, // Chỉ cập nhật fullname
            department: fields.department,
            center: fields.center,
          },
        }),
      );

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
        <View>
          <NavBar title={TITLES.user} onPress={() => navigation.goBack()} />
        </View>
        <View style={[AppStyles.body]}>
          <View style={styles.wrapBody}>
            <TouchableOpacity>
              <Image
                source={IMAGES.avtar}
                style={[
                  AppStyles.avartar,
                  { alignSelf: 'center', width: 200, height: 200 },
                ]}
              />
            </TouchableOpacity>
            <View>
              <View>
                <Text style={AppStyles.label}>User Name</Text>
                <Text style={AppStyles.disable}>{Username}</Text>
              </View>
              <AppInput
                label="Fullname"
                placeholder="Fullname"
                value={Fullname}
                onChangeText={setFullname}
                style={inputStyles[Fullname]}
              />
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
              <TouchableOpacity onPress={() => setShowPasswordModal(true)}>
                <Text style={styles.changePassword}> Đổi mật khẩu</Text>
              </TouchableOpacity>
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
        <PasswordModal
          visible={showPasswordModal}
          onClose={() => {
            setShowPasswordModal(false);
          }}
        />
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
    borderRadius: 50,
    marginTop: Spacing.large,
    paddingVertical: Spacing.large,
    paddingHorizontal: Spacing.medium,
    borderColor: Colors.white,
    borderWidth: 2,
  },

  changePassword: {
    color: Colors.primary,
    textAlign: 'right',
    fontSize: Fonts.normal,
    paddingHorizontal: Spacing.medium,
    marginBottom: Spacing.medium,
    textDecorationLine: 'underline',
  },
});

export default UserInfo_Screen;
