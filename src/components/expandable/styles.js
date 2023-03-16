import {StyleSheet} from 'react-native';
import {Colors, Scaler, Size, Typo} from '../../styles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.COLOR_WHITE,
    borderRadius: 8,
  },

  headerParent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Size.SIZE_14,
  },

  divider: {
    height: 0.5,
    width: '100%',
  },

  child: {
    padding: Size.SIZE_14,
  },

  childContent: {
    paddingVertical: Size.SIZE_16,
  },

  topButton: {
    paddingHorizontal: Size.SIZE_14,
  },

  // == text

  title: {
    ...Typo.TextNormalRegular,
  },

  caption: {
    ...Typo.TextSmallRegular,
  },

  textTop: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_ACCENT,
  },
});

export default styles;
