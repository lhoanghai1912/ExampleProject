import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ICONS, IMAGES } from '../utils/constants';
import AppStyles from './AppStyle';
import { Fonts } from '../utils/fontSize';
import { Colors } from '../utils/color';
import { Spacing } from '../utils/spacing';
import { navigate } from '../navigation/RootNavigator';
import { Screen } from 'react-native-screens';
import { Screen_Name } from '../navigation/ScreenName';

const NavBar = ({ title, onPress }: any) => {
  return (
    <View style={styles.navBar}>
      <View style={[AppStyles.iconGroup, { position: 'relative' }]}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={ICONS.back}
            style={[AppStyles.icon, { marginLeft: 5 }]}
          ></Image>
        </TouchableOpacity>
      </View>
      <Text style={styles.navTitle}>{title}</Text>
      <TouchableOpacity onPress={onPress}></TouchableOpacity>
      <View style={[AppStyles.iconGroup, { position: 'relative' }]}>
        <TouchableOpacity
          onPress={() => {
            navigate(Screen_Name.Setting_Screen);
          }}
        >
          <Image source={ICONS.setting} style={AppStyles.icon}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate(Screen_Name.User_Screen);
          }}
        >
          <Image source={ICONS.info} style={AppStyles.icon}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.small,
    backgroundColor: Colors.primary,
    paddingTop: 50,
  },
  navTitle: {
    fontSize: Fonts.xxlarge,
    color: Colors.white,
    paddingLeft: 90,
  },
});

export default NavBar;
