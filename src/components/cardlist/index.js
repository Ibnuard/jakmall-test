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
import Button from '../button';

const CardList = ({
  item,
  index,
  activeIndex,
  onHeaderPress,
  onTopPressed,
  onJokesSelected,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [addMoreLoading, setAddMoreLoading] = React.useState(false);
  const [jokes, setJokes] = React.useState();
  // === VARIABLE
  const headerTitle = `${index + 1}. ${item}`;

  React.useEffect(() => {
    if (activeIndex == index) {
      getNestedData();
    }
  }, [activeIndex]);

  // == get nested data
  const getNestedData = async nested => {
    !nested ? setIsLoading(true) : setAddMoreLoading(true);
    !nested ? setJokes() : null;

    // == fetch data
    const {state, data, error} = await fetchAPI(
      GET_NESTED_CATEGORY(item),
      'GET',
    );

    // == handle state
    if (state == API_STATES.SUCCESS) {
      nested ? setAddMoreLoading(false) : setIsLoading(false);
      nested ? setJokes([...jokes, ...data.jokes]) : setJokes(data?.jokes);
    } else {
      nested ? setAddMoreLoading(false) : setIsLoading(false);
      nested
        ? setJokes([
            ...jokes,
            {joke: data?.causedBy[0]},
            {joke: data?.causedBy[0]},
          ])
        : setJokes([{joke: data?.causedBy[0]}, {joke: data?.causedBy[0]}]);
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
        <>
          <FlatList
            data={jokes}
            renderItem={({item, index}) => (
              <RenderNested
                key={item + index}
                item={item}
                index={index}
                onPress={() => onJokesSelected(item?.joke)}
              />
            )}
          />
          {jokes?.length < 6 ? (
            <View style={styles.buttonContainer}>
              <Button
                isLoading={addMoreLoading}
                title="Add more data"
                onPress={() => getNestedData(true)}
              />
            </View>
          ) : null}
        </>
      )}
    </ExpandableView>
  );
};

export default CardList;
