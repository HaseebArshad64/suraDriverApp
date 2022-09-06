import * as React from 'react';
import {useTheme, useNavigation} from '@react-navigation/native';
import {Image, View} from 'react-native';
import {Text, Container, Touchable} from '@src/components/elements';
import {mockCategories} from '@src/data/mock-categories';
import styles from './styles';
import {useSelector} from 'react-redux';
import {serverUrl} from '@src/database/backendApi';
import _ from 'lodash';

type PopularCategoriesProps = {};

const PopularCategories: React.FC<PopularCategoriesProps> = () => {
  const navigation = useNavigation();
  const {
    colors: {border},
  } = useTheme();

  const _onButtonCategoryItemPressed = (category) => {
    const {id, name} = category || {};
    return () => {
      navigation.navigate('PlaceListScreen', {title: name, id});
    };
  };

  const categories = useSelector((data) => data.auth.category) || {};

  return (
    <Container style={styles.categoryContainer}>
      {!_.isEmpty(categories) &&
        categories.map((category) => {
          const {id, image, name} = category;
          return (
            <Touchable
              key={id}
              onPress={_onButtonCategoryItemPressed(category)}>
              <View style={[styles.categoryItem, {borderColor: border}]}>
                <Container>
                  <Image
                    style={styles.categoryImage}
                    source={{uri: `${serverUrl}${image}`}}
                  />
                </Container>
                <Container>
                  <Text style={styles.categoryTitle}>{name}</Text>
                </Container>
              </View>
            </Touchable>
          );
        })}
    </Container>
  );
};

export default PopularCategories;
