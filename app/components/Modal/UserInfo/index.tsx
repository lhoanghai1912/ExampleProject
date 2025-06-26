// src/components/ModalComponent.tsx
import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  AppState,
} from 'react-native';

import styles from './style';
import AppButton from '../../AppButton';
import AppStyles from '../../AppStyle';

interface UserInfoModalProps {
  visible: boolean;
  type: number;
  onClose: (data: string | null) => void;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({
  visible,
  type,
  onClose,
}) => {
  // Dữ liệu hiển thị trong modal tùy thuộc vào type
  const departments = ['Phòng Kinh Doanh', 'Phòng Marketing', 'Phòng IT'];
  const positions = ['Manager', 'Developer', 'Designer'];

  // Chọn dữ liệu dựa trên type
  const data = type === 1 ? departments : positions;

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={AppStyles.title}>
            Chọn {type === 1 ? 'Phòng Ban' : 'Vị Trí'}
          </Text>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => onClose(item)}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default UserInfoModal;
