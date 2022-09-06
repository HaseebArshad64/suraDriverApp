import * as React from 'react';
import {Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Container, Text, Touchable} from '@src/components/elements';
import {Place} from '@src/data/mock-places';
import styles from './styles';
import PlaceCardInfo from '../PlaceCardInfo';
import {serverUrl} from '@src/database/backendApi';

type PlaceListItemProps = {
  data: Place;
};

const PlaceListItem: React.FC<PlaceListItemProps> = ({data}) => {
  const {restaurantImage, restaurantName, orderPrice, id} = data;
  const navigation = useNavigation();

  const _onPlaceItemPressed = (data) => {
    navigation.navigate('ActivityHistoryDetailScreen', {data});
  };

  return (
    <Touchable onPress={() => _onPlaceItemPressed(data)}>
      <Container style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: `${serverUrl}${restaurantImage}`}}
        />
        <View style={styles.placeInfoContainer}>
          <View style={styles.placeInfo}>
            <Text style={styles.placeTitle}>{restaurantName}</Text>
            <Text style={styles.placeSubTitle}>{`${orderPrice} AED`}</Text>
          </View>
          {/* <PlaceCardInfo data={data} /> */}
        </View>
      </Container>
    </Touchable>
  );
};

export default PlaceListItem;
