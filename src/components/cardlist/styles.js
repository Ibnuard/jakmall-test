import {StyleSheet} from 'react-native';
import {Colors, Scaler, Size, Typo} from '../../styles';

const styles = StyleSheet.create({
  expandable: {
    marginVertical: 4,
  },

  listContainer: {
    paddingVertical: Size.SIZE_24,
  },

  nestedLoading: {
    height: Scaler.scaleSize(50),
    justifyContent: 'center',
    paddingHorizontal: Size.SIZE_14,
  },

  nestedContainer: {
    paddingVertical: Size.SIZE_8,
    paddingHorizontal: Size.SIZE_14,
    borderTopWidth: 0.5,
    borderTopColor: Colors.COLOR_LIGHT_GRAY,
  },

  buttonContainer: {
    padding: Size.SIZE_8,
  },

  // === TEXT STYLE

  textNested: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_GRAY,
  },
});

export default styles;
