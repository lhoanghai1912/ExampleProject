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
    khoXuat: ['Kho 1', 'Kho 2', 'Kho 3', 'Kho 4'],
  };
  const dataLabel: Record<string, string[]> = {
    department: ['phòng ban'],
    center: ['vị trí'],
    lenhSX: ['lệnh sản xuất'],
    soMay: ['số máy'],
    congDoan: ['công đoạn'],
    soCa: ['số ca'],
    khoXuat: ['kho xuất'],
  };
  const data = dataField[type] || [];
  const label = dataLabel[type] || [];
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={AppStyles.title}>{`Chọn ${label}`}</Text>
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
