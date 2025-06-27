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
import { ICONS, IMAGES, TITLES } from '../../../utils/constants';
import AppStyles from '../../../components/AppStyle';
import AppInput from '../../../components/AppInput';
import { Spacing } from '../../../utils/spacing';
import AppButton from '../../../components/AppButton';
import AppToast from '../../../components/AppToast';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../utils/color';
import { Fonts } from '../../../utils/fontSize';
import UserInfoModal from '../../../components/Modal/UserInfo';
import PasswordModal from '../../../components/Modal/Password';

interface Props {
  navigation: any;
  route: any;
}
const UserInfo_Screen: React.FC<Props> = ({ navigation }) => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Fullname, setFullname] = useState('');
  const [Department, setDepartment] = useState('');
  const [Center, setCenter] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const [type, setType] = useState('');

  const { userData } = useSelector((state: any) => state.user);
  useEffect(() => {
    const loadData = async () => {
      setUsername(userData.username), console.log('name1', Username);
      setFullname(userData.fullname), console.log('name1', Username);
      console.log(userData);
    };
    loadData();
  }, []);
  const handlePressModal = (type: string) => {
    setType(type);
    setShowModal(true);
  };
  const handleModalClose = (data: string | null) => {
    setShowModal(false);
    if (type === 'department') {
      setDepartment(data || '');
    } else if (type === 'center') {
      setCenter(data || '');
    }
  };
  const handleSummit = () => {
    setToastMessage('Thông tin đã được cập nhật thành công');
    setToastVisible(true);
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
            <AppInput
              editable={false}
              label="Username"
              placeholder="Username"
              value={Username}
              style={{ opacity: 0.5 }}
              onChangeText={setUsername}
            />

            <AppInput
              label="Fullname"
              placeholder="Fullname"
              value={Fullname}
              onChangeText={setFullname}
            />
            <View>
              <Text style={AppStyles.label}>Department</Text>
              <TouchableOpacity onPress={() => handlePressModal('department')}>
                <Text style={AppStyles.input}>
                  {Department || 'Department'}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={AppStyles.label}>Center</Text>
              <TouchableOpacity onPress={() => handlePressModal('center')}>
                <Text style={AppStyles.input}>{Center || 'Center'} </Text>
              </TouchableOpacity>
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
    color: 'blue',
    textAlign: 'right',
    fontSize: Fonts.normal,
    paddingHorizontal: Spacing.medium,
    marginBottom: Spacing.small,
  },
});

export default UserInfo_Screen;
