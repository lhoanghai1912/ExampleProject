import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppStyles from '../../AppStyle';
import AppButton from '../../AppButton';
import AppInput from '../../AppInput';
import { Spacing } from '../../../utils/spacing';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, updatePassword } from '../../../redux/reducers/userSlice';

interface PasswordModalProps {
  visible: boolean;
  onClose: () => void;
}
const PasswordModal: React.FC<PasswordModalProps> = ({ visible, onClose }) => {
  const { userData } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inputStyles, setInputStyles] = useState({
    password: {},
    newPassword: {},
    confirmPassword: {},
  });
  useEffect(() => {
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }, [onClose]);
  const handleSubmit = () => {
    if (password !== userData.password) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: `Mật khẩu không đúng`,
        visibilityTime: 3000,
        autoHide: true,
      });
      setInputStyles({
        password: { borderColor: 'red', borderWidth: 1 },
        newPassword: {},
        confirmPassword: {},
      });
      return;
    } else if (newPassword != confirmPassword) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: `Mật khẩu và xác nhận mật khẩu không trùng khớp`,
        visibilityTime: 3000,
        autoHide: true,
      });
      setInputStyles({
        password: {},
        newPassword: { borderColor: 'red', borderWidth: 1 },
        confirmPassword: { borderColor: 'red', borderWidth: 1 },
      });
      return;
    }
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Success',
      text2: `Thành công`,
      visibilityTime: 3000,
      autoHide: true,
    });
    dispatch(updatePassword(newPassword)); // Dùng dispatch để gọi action cập nhật mật khẩu
    setInputStyles({ password: {}, newPassword: {}, confirmPassword: {} });
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={AppStyles.title}>Đổi mật khẩu</Text>
          <View>
            <AppInput
              label="Mật khẩu cũ"
              placeholder="Nhập mật khẩu cũ"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={inputStyles.password}
            />
            <AppInput
              label="Mật khẩu mới"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={true}
              style={inputStyles.newPassword}
            />
            <AppInput
              label="Xác nhận mật khẩu mới"
              placeholder="Nhập mật khẩu mới"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
              style={inputStyles.confirmPassword}
            />
          </View>
          <View style={AppStyles.buttonGroup}>
            <AppButton title="Hủy bỏ" onPress={onClose}></AppButton>
            <AppButton
              disabled={!(password && newPassword && confirmPassword)}
              title="Xác nhận"
              onPress={() => handleSubmit()}
            ></AppButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    paddingHorizontal: Spacing.medium,
    marginHorizontal: Spacing.medium,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
});

export default PasswordModal;
