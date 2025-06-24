import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import styles from './style';
import { Spacing } from '../../../utils/spacing';
import AppButton from '../../AppButton';
import App from '../../../../App';
import Toast from 'react-native-toast-message';
import AppToast from '../../AppToast';

interface CalendarModalProps {
  visible: boolean;
  selectedDate: string;
  onDateSelect: (date: string) => void;
  onClose: () => void;
}
const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  selectedDate,
  onDateSelect,
  onClose,
}) => {
  const [tempSelectedDate, setTempSelectedDate] = useState(selectedDate);

  const handleConfirm = () => {
    onDateSelect(tempSelectedDate);
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed');
        onClose;
      }}
    >
      <View style={[styles.wrapModal, {}]}>
        <Calendar
          onDayPress={day => {
            setTempSelectedDate(day.dateString);
          }}
          markedDates={{
            [tempSelectedDate]: {
              selected: true,
              disableTouchEvent: true,
              dotColor: 'orange',
            },
          }}
        ></Calendar>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: Spacing.medium,
          }}
        >
          <AppButton
            customStyle={[{ paddingHorizontal: Spacing.medium }]}
            title="Hủy bỏ"
            onPress={() => handleCancel()}
          />
          <AppButton
            customStyle={[{ paddingHorizontal: Spacing.medium }]}
            title="Xác nhận"
            onPress={() => handleConfirm()}
          />
        </View>
      </View>
    </Modal>
  );
};
export default CalendarModal;
