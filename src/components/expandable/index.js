import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from 'react-native';
import {act} from 'react-test-renderer';
import Touchable from '../touchable';
import styles from './styles';

const ExpandableView = ({
  title,
  containerStyle,
  headerStyle,
  contentStyle,
  titleStyle,
  children,
  onHeaderPress,
  index,
  activeIndex,
  onTopPressed,
}) => {
  const [detail, showDetail] = React.useState(false);

  const rotateAnimation = React.useRef(new Animated.Value(1)).current;

  //CONFIG
  const EXPAND_ANIMATION_CONFIG = {
    duration: 400,
    create: {
      type: 'linear',
      property: 'opacity',
      duration: 200,
    },
    update: {
      type: 'spring',
      springDamping: Platform.OS == 'ios' ? 0.9 : 1.8,
    },
    delete: {
      type: 'linear',
      property: 'opacity',
      duration: 100,
    },
  };

  React.useEffect(() => {
    //onTriggered();
    if (activeIndex == index) {
      onOpenChild();
    } else {
      onCloseChild();
    }
  }, [activeIndex]);

  function toggleAnimation() {
    Animated.timing(rotateAnimation, {
      toValue: detail ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  function onOpenChild() {
    LayoutAnimation.configureNext(EXPAND_ANIMATION_CONFIG);
    showDetail(true);
    toggleAnimation();
  }

  function onCloseChild() {
    LayoutAnimation.configureNext(EXPAND_ANIMATION_CONFIG);
    showDetail(false);
    toggleAnimation();
  }

  function renderChild() {
    return detail ? <View style={[contentStyle]}>{children}</View> : null;
  }

  function renderHeader() {
    return (
      <View style={styles.headerParent}>
        <TouchableOpacity
          style={[styles.header, headerStyle]}
          activeOpacity={1}
          onPress={() => (onHeaderPress ? onHeaderPress() : null)}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </TouchableOpacity>
        <Touchable style={styles.topButton} onPress={onTopPressed}>
          <Text style={styles.textTop}>{index == 0 ? 'Top' : 'Go to Top'}</Text>
        </Touchable>
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {renderHeader()}
      {renderChild()}
    </View>
  );
};

export default ExpandableView;
