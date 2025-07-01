import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/color';
import { Spacing } from '../../utils/spacing';
import { Fonts } from '../../utils/fontSize';

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: Spacing.large,
  },
  wrapLogin: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: Colors.white,
    padding: Spacing.large,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: Fonts.xlarge,
    fontWeight: '600',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: Spacing.large,
  },
  inputText: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.small,
    fontSize: Fonts.normal,
    marginBottom: Spacing.medium,
  },
  forgotWrapper: {
    alignItems: 'flex-end',
    marginBottom: Spacing.medium,
  },
  forgotText: {
    fontSize: Fonts.normal,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  loginButton: {
    borderRadius: 12,
  },
});

export default styles;
