import { StyleSheet } from 'react-native';
import { Fonts } from '../utils/fontSize';
import { Colors } from '../utils/color';
import { Spacing } from '../utils/spacing';

const AppStyles = StyleSheet.create({
  header: { flex: 0.7 },
  body: { flex: 2 },
  footer: { flex: 0.7 },

  title: {
    fontSize: Fonts.xxlarge,
    color: Colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: Spacing.medium,
  },

  text: {
    fontSize: Fonts.normal,
  },

  icon: { width: 25, height: 25, marginHorizontal: 5 },

  iconGroup: {
    flexDirection: 'row',
    position: 'absolute',
    resizeMode: 'contain',
    justifyContent: 'space-between',
    right: 0,
    top: '20%',
  },
});

export default AppStyles;
