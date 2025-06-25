import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/color';
import { Spacing } from '../../utils/spacing';
import { Fonts } from '../../utils/fontSize';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 150,
    alignSelf: 'center',
  },
  wrapLogin: {
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.medium,
    marginHorizontal: Spacing.lagre,
    backgroundColor: Colors.white,
    borderColor: Colors.lightGray,
    borderRadius: 20,
  },
  inputText: {
    fontSize: Fonts.large,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
  },
  text: {
    fontSize: Fonts.normal,
    justifyContent: 'center',
    textAlign: 'right',
    color: Colors.primary,
  },
  bodyItem: {
    marginBottom: Spacing.small,
  },
});

export default styles;
