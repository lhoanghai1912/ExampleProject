import { StyleSheet } from 'react-native';
import { Fonts } from '../utils/fontSize';
import { Colors } from '../utils/color';
import { Spacing } from '../utils/spacing';

const AppStyles = StyleSheet.create({
  header: { flex: 0.7 },
  body: { flex: 3 },
  footer: { flex: 0.3 },

  title: {
    fontSize: Fonts.xlarge,
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
    width: 60,
    flexDirection: 'row',
    position: 'absolute',
    resizeMode: 'contain',
    justifyContent: 'space-between',
    right: 0,
    top: '20%',
  },

  buttonGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.medium,
  },

  scrollView: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
  },
  scrollContent: {
    paddingBottom: Spacing.lagre, // Đảm bảo có đủ không gian khi cuộn
  },
});

export default AppStyles;
