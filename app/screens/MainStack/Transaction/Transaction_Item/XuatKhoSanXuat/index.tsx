import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import NavBar from '../../../../../components/Navbar';
import AppStyles from '../../../../../components/AppStyle';
import { ICONS, IMAGES } from '../../../../../utils/constants';
import { Colors } from '../../../../../utils/color';
import { Spacing } from '../../../../../utils/spacing';
import AppInput from '../../../../../components/AppInput';
import { Fonts } from '../../../../../utils/fontSize';
import AsyncStorage from '@react-native-async-storage/async-storage';

const XuatKhoSanXuatScreen = () => {
  const [lenhSX, setLenhSX] = useState('');
  const [soCa, setSoCa] = useState('');
  const [congDoan, setCongDoan] = useState('');
  const [soMay, setSoMay] = useState('');

  useEffect(() => {
    // Lấy dữ liệu từ AsyncStorage khi màn hình được render
    const loadData = async () => {
      const lenhSXValue = await AsyncStorage.getItem('LenhSX');
      const soCaValue = await AsyncStorage.getItem('SoCa');
      const congDoanValue = await AsyncStorage.getItem('CongDoan');
      const soMayValue = await AsyncStorage.getItem('SoMay');

      if (lenhSXValue) setLenhSX(lenhSXValue);
      if (soCaValue) setSoCa(soCaValue);
      if (congDoanValue) setCongDoan(congDoanValue);
      if (soMayValue) setSoMay(soMayValue);
    };

    loadData();
  }, []);
  return (
    <View style={styles.container}>
      <NavBar
        title="Xuất Kho Sản Xuất"
        onPress={() => console.log('Back button pressed')}
      />
      <View style={[AppStyles.body]}>
        <View
          style={{
            flex: 1,
            marginVertical: Spacing.lagre,
            marginHorizontal: Spacing.medium,
          }}
        >
          <View
            style={{
              flex: 1.5,
              borderColor: Colors.Gray,
              borderWidth: 1,
              marginBottom: Spacing.medium,
              borderRadius: 10,
              paddingVertical: Spacing.medium,
              paddingHorizontal: Spacing.small,
            }}
          >
            <Text style={[AppStyles.text, { fontSize: Fonts.large }]}>
              Thông tin Phiếu
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: Spacing.medium,
              }}
            >
              <View style={{ flex: 1, marginHorizontal: Spacing.medium }}>
                <AppInput label="Số phiếu"></AppInput>
                <AppInput label="Số lô"></AppInput>
                <AppInput label="Lệnh sản xuất" value={lenhSX}></AppInput>
                <AppInput label="Số máy" value={soMay}></AppInput>
              </View>
              <View style={{ flex: 1, marginHorizontal: Spacing.medium }}>
                <AppInput label="Ngày xuất kho"></AppInput>
                <AppInput label="Kho xuất"></AppInput>
                <AppInput label="Số ca" value={soCa}></AppInput>
                <AppInput label="Công đoạn" value={congDoan}></AppInput>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              borderColor: Colors.Gray,
              borderWidth: 1,
              marginBottom: Spacing.medium,
              borderRadius: 10,
              paddingVertical: Spacing.medium,
              paddingHorizontal: Spacing.small,
            }}
          >
            <Text style={[AppStyles.text, { fontSize: Fonts.large }]}>
              Thông tin Vật liệu
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: Spacing.medium,
              }}
            >
              <View style={{ flex: 1, marginHorizontal: Spacing.medium }}>
                <AppInput label="Mã TP/BTP"></AppInput>
                <AppInput label="Tên NVL"></AppInput>
              </View>
              <View style={{ flex: 1, marginHorizontal: Spacing.medium }}>
                <AppInput label="SL thực xuất"></AppInput>
                <AppInput label="DVT"></AppInput>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.Gray,
              padding: 5,
              width: 50,
              height: 50,
              borderRadius: 500,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: 20,
              right: 20,
            }}
          >
            <Image
              source={ICONS.scan}
              style={[AppStyles.icon, { borderRadius: 500 }]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default XuatKhoSanXuatScreen;
