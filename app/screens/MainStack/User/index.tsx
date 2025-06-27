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

interface Props {
  navigation: any;
  route: any;
}
const UserInfo_Screen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [Username, setUsername] = useState('');
  const [Fullname, setFullname] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [type, setType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedField, setSelectedField] = useState('');

  const [fields, setFields] = useState<{ [key: string]: string }>({
    Fullname: '',
    department: '',
    center: '',
  });
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
  const handlePressModal = (type: string) => {
    setType(type);
    setShowModal(true);
  };
  const [inputStyles, setInputStyles] = useState<{ [key: string]: object }>({
    department: {},
    center: {},
  });

  const handleModalClose = (data: string | null) => {
    setShowModal(false);
    if (data) {
      setFields(prev => ({ ...prev, [selectedField]: data }));
    }
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
        text2: `Vui lòng họ tên`,
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
    <View style={styles.container}>
      <View style={{ backgroundColor: Colors.primary }}>
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
            {[
              { label: 'Phòng ban', field: 'department' },
              { label: 'Chức vụ', field: 'center' },
            ].map(({ label, field }, index) => (
              <View key={index} style={{ marginBottom: Spacing.small }}>
                <Text style={AppStyles.label}>{label}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedField(field);
                    handlePressModal(field);
                  }}
                >
                  <Text style={[AppStyles.input, inputStyles[field]]}>
                    {fields[field]}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
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
      <UserInfoModal
        type={type}
        visible={showModal}
        onClose={handleModalClose}
      />
      <PasswordModal
        visible={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
        }}
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
    color: 'navy',
    textAlign: 'right',
    fontSize: Fonts.normal,
    paddingHorizontal: Spacing.medium,
    marginBottom: Spacing.medium,
  },
});

export default UserInfo_Screen;
