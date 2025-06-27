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
  type: string;
  onClose: (data: string | null) => void;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({
  visible,
  type,
  onClose,
}) => {
  // Dữ liệu hiển thị trong modal tùy thuộc vào type
  const dataField: Record<string, string[]> = {
    department: ['Phòng Kinh Doanh', 'Phòng Marketing', 'Phòng IT'],
    center: ['Manager', 'Developer', 'Designer'],
    lenhSX: ['lenhSX1', 'lenhSX2', 'lenhSX3', 'lenhSX4'],
    soMay: ['May 1', 'May 2', 'May 3', 'May 4'],
    congDoan: ['congDoan 1', 'congDoan 2', 'congDoan 3', 'congDoan 4'],
    soCa: ['Ca 1', 'Ca 2', 'Ca 3', 'Ca 4'],
  };
  const data = dataField[type] || [];
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={AppStyles.title}>Chọn {type}</Text>
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
