import {StyleSheet} from 'react-native';
import {Typo} from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // == text
  textSplash: {
    ...Typo.TextNormalBold,
  },
});

export default styles;
