import { StyleSheet } from 'react-native';
import { Colors } from '../../../utils/color';
import { Spacing } from '../../../utils/spacing';
import { Fonts } from '../../../utils/fontSize';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: Spacing.small,
    marginBottom: Spacing.small,
    marginHorizontal: Spacing.lagre,
    height: 50,
  },
  modalContent: {
    marginHorizontal: Spacing.medium,
    padding: Spacing.medium,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  modalTitle: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: Spacing.medium,
  },

  buttonText: {
    color: Colors.white,
    fontSize: Fonts.normal,
    textAlign: 'center',
  },
});
export default styles;
