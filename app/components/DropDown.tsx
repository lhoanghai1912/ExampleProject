// src/components/CustomDropdown.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Spacing } from '../utils/spacing';
import { Colors } from '../utils/color';
import { Fonts } from '../utils/fontSize';
import AppStyles from './AppStyle';
import AppInput from './AppInput';
import AppButton from './AppButton';

interface Props {
  label: string;
  placeHolder: string;
  options: string[];
  value: string;
  onClose: () => void;
  onSubmit: (val: string) => void;
}

const CustomDropdown: React.FC<Props> = ({
  label,
  placeHolder,
  options,
  value,
  onClose,
  onSubmit,
}) => {
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSubmit = () => {
    onSubmit(selectedValue);
    onClose();
    setVisible(false);
  };

  const handleCancel = () => {
    setSelectedValue(value); // Reset to initial value
    onClose();
    setVisible(false);
  };

  const renderItem = ({ item }: any) => {
    const isSelecting = selectedValue === item;
    return (
      <TouchableOpacity
        style={[
          styles.option,
          {
            backgroundColor: isSelecting ? Colors.primary : Colors.white,
          },
        ]}
        onPress={() => {
          setSelectedValue(item);
        }}
      >
        <Text style={[AppStyles.text]}>{item}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.inputWrap}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <AppInput
          label={label}
          placeholder={placeHolder}
          value={value}
          editable={false}
        />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
            <View style={[AppStyles.buttonGroup]}>
              <AppButton
                customStyle={[{ width: '40%' }]}
                onPress={handleCancel}
                title="Hủy"
              ></AppButton>
              <AppButton
                customStyle={[{ width: '40%' }]}
                onPress={handleSubmit}
                title="Xác nhận"
              ></AppButton>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  inputWrap: {
    marginBottom: Spacing.medium,
    marginHorizontal: Spacing.medium,
  },
  textLable: {
    fontSize: Fonts.xlarge,
    marginBottom: Spacing.small,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 10,
    padding: Spacing.medium,
    fontSize: Fonts.normal,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 40,
  },
  dropdown: {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: Spacing.small,
    maxHeight: 500,
    elevation: 55,
    paddingBottom: Spacing.medium,
  },
  option: {
    paddingVertical: Spacing.small,
    marginTop: Spacing.medium,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.black,
    alignItems: 'center',
  },
});
