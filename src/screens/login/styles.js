import {StyleSheet} from 'react-native';
import {Colors, Scaler, Size, Typo} from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Size.SIZE_24,
    backgroundColor: Colors.COLOR_LIGHT_GRAY,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

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
  },

  // === TEXT STYLE

  textNested: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_GRAY,
  },
});

export default styles;
