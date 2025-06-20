import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/color';
import { Spacing } from '../../utils/spacing';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  wrapLogin: {
    padding: 30,
    marginHorizontal: Spacing.lagre,
    backgroundColor: Colors.white,
    borderColor: Colors.lightGray,
    borderRadius: 20,
  },
  inputText: {
    borderColor: Colors.lightGray,
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    marginBottom: Spacing.medium,
  },
  bodyItem: {
    marginBottom: Spacing.medium,
  },
});

export default styles;
