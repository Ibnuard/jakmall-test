import {useFocusEffect} from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  StatusBar,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {GET_CATEGORY} from '../../api/api';
import {fetchAPI} from '../../api/apiUtils';
import {CardList, Modal} from '../../components';
import {Colors} from '../../styles';
import {API_STATES} from '../../utils/constant';
import {setOnTop} from '../../utils/utils';
import styles from './styles';

const LoginScreen = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [categories, setCategories] = React.useState();
  const [selectedCategory, setSelectedCategory] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedJokes, setSelectedJokes] = React.useState();

  // == handle sata on load
  useFocusEffect(
    React.useCallback(() => {
      getCategoriesList();

      return () => null;
    }, []),
  );

  // == onRefresh
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setSelectedCategory(null);
    setSelectedJokes(null);
    getCategoriesList(true);
  }, []);

  // == GET CATEGORIES LIST FROM API
  const getCategoriesList = async hideLoading => {
    !hideLoading ? setIsLoading(true) : null;
    const {state, data, error} = await fetchAPI(GET_CATEGORY, 'GET');

    // == HANDLE STATE
    if (state == API_STATES.SUCCESS) {
      setIsLoading(false);
      setRefreshing(false);
      setCategories(data?.categories);
    } else {
      console.log(error);
    }
  };

  const onTopPressed = selected => {
    const data = setOnTop(categories, selected);
    setCategories(data);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.COLOR_WHITE}
        barStyle={'dark-content'}
      />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={categories}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item, index}) => (
            <CardList
              item={item}
              index={index}
              activeIndex={selectedCategory}
              onTopPressed={() => onTopPressed(index)}
              onJokesSelected={joke => {
                setSelectedJokes(joke);
                setVisible(true);
              }}
              onHeaderPress={() =>
                setSelectedCategory(index == selectedCategory ? null : index)
              }
            />
          )}
        />
      )}

      <Modal
        visible={visible}
        type={'popup'}
        message={selectedJokes}
        onPress={() => setVisible(false)}
      />
    </View>
  );
};

export default LoginScreen;
