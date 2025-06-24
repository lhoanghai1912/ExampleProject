import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TextInputProps,
  StyleProp,
  TextStyle,
  Image,
  TouchableOpacity,
} from 'react-native';
import AppStyles from './AppStyle';
import { ICONS } from '../utils/constants';
import { Spacing } from '../utils/spacing';
import { Fonts } from '../utils/fontSize';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  style?: StyleProp<TextStyle>;
}

const AppInput: React.FC<AppInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
  label,
  error,
  editable,
  ...props
}) => {
  const [isShow, setIsShow] = useState(false);
  const handleShowHide = async () => {
    setIsShow(!isShow);
  };
  const handleClear = async () => {
    onChangeText?.('');
  };
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        editable={editable}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isShow}
        keyboardType={keyboardType}
        style={[styles.input, style, error && styles.errorBorder]}
        placeholderTextColor="#999"
        {...props}
      />
      {editable &&
        (secureTextEntry ? (
          <View style={AppStyles.iconGroup}>
            <TouchableOpacity onPress={handleShowHide}>
              <Image
                source={isShow ? ICONS.show : ICONS.hide}
                style={[AppStyles.icon, { display: value ? 'flex' : 'none' }]}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClear}>
              <Image
                source={ICONS.clear}
                style={[AppStyles.icon, { display: value ? 'flex' : 'none' }]}
              ></Image>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={AppStyles.iconGroup}>
            <TouchableOpacity onPress={handleClear}>
              <Image
                source={ICONS.clear}
                style={[AppStyles.icon, { display: value ? 'flex' : 'none' }]}
              ></Image>
            </TouchableOpacity>
          </View>
        ))}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.medium,
    width: '100%',
  },
  label: {
    fontSize: Fonts.large,
    marginBottom: Spacing.small,
    color: '#333',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: Spacing.medium,
    fontSize: Fonts.normal,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  errorBorder: {
    borderColor: '#ff5a5f',
  },
  errorText: {
    color: '#ff5a5f',
    fontSize: Fonts.small,
    marginTop: Spacing.small,
  },
});

export default AppInput;
