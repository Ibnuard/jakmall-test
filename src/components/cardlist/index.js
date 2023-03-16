import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import ExpandableView from '../expandable';
import styles from './styles';
import {fetchAPI} from '../../api/apiUtils';
import {GET_NESTED_CATEGORY} from '../../api/api';
import {API_STATES} from '../../utils/constant';
import Touchable from '../touchable';

const CardList = ({
  item,
  index,
  activeIndex,
  onHeaderPress,
  onTopPressed,
  onJokesSelected,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState();
  // === VARIABLE
  const headerTitle = `${index + 1}. ${item}`;

  React.useEffect(() => {
    if (activeIndex == index) {
      getNestedData();
    }
  }, [activeIndex]);

  // == get nested data
  const getNestedData = async () => {
    setIsLoading(true);
    setData();

    // == fetch data
    const {state, data, error} = await fetchAPI(
      GET_NESTED_CATEGORY(item),
      'GET',
    );

    // == handle state
    if (state == API_STATES.SUCCESS) {
      setIsLoading(false);
      setData(data?.jokes);
    } else {
      setIsLoading(false);
      setData([{joke: data?.causedBy[0]}]);
    }
  };

  function RenderNested({item, index, onPress}) {
    return (
      <Touchable style={styles.nestedContainer} onPress={onPress}>
        <Text style={styles.textNested}>{item?.joke}</Text>
      </Touchable>
    );
  }

  return (
    <ExpandableView
      index={index}
      activeIndex={activeIndex}
      onHeaderPress={onHeaderPress}
      containerStyle={styles.expandable}
      onTopPressed={onTopPressed}
      title={headerTitle}>
      {isLoading ? (
        <View style={styles.nestedLoading}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <RenderNested
              item={item}
              index={index}
              onPress={() => onJokesSelected(item?.joke)}
            />
          )}
        />
      )}
    </ExpandableView>
  );
};

export default CardList;
