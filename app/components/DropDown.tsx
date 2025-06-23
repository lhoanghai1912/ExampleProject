// src/components/CustomDropdown.tsx
import React, { useState } from 'react';
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

interface Props {
  label: string;
  placeHolder: string;
  options: string[];
  value: string;
  onSelect: (val: string) => void;
}

const CustomDropdown: React.FC<Props> = ({
  label,
  placeHolder,
  options,
  value,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (val: string) => {
    onSelect(val);
    setVisible(false);
  };

  return (
    <View style={styles.inputWrap}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        {/* <TextInput
          style={styles.input}
          placeholder={placeHolder}
          value={value}
          editable={false}
          pointerEvents="none"
        /> */}
        {/* <AppInput
          label={label}
          placeholder={placeHolder}
          value={value}
          editable={false}
          // pointerEvents="none"
        /> */}
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={AppStyles.text}>{item}</Text>
                </TouchableOpacity>
              )}
            />
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
