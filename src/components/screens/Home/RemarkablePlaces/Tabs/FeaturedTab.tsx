import * as React from 'react';
import {Container, Text} from '@src/components/elements';
import {Place, mockRemarkablePlace} from '@src/data/mock-places';
import PlaceListItem from '@src/components/common/PlaceListItem';
import styles from './styles';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {ActivityIndicator, FlatList} from 'react-native';
import {getOrdersHistoryAPI} from '@src/database/backendApi';
import {useNavigation} from '@react-navigation/native';

type FeaturedTabProps = {};

const FeaturedTab: React.FC<FeaturedTabProps> = () => {
  const navigation = useNavigation();
  const [ordersList, setOrdersList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefresh, setIsRefreshing] = React.useState(false);

  const getOrdersList = async () => {
    const orders = await getOrdersHistoryAPI();
    setOrdersList(orders);
    setIsRefreshing(false);
  };

  navigation.addListener('focus', async () => {
    setIsRefreshing(true);
    setIsLoading(true);
    getOrdersList();
    setTimeout(() => setIsLoading(false), 3000);
  });

  React.useEffect(() => {
    getOrdersList();
    setInterval(() => getOrdersList(), 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="orange"
          style={{marginTop: 180}}
        />
      ) : !_.isEmpty(ordersList) ? (
        <FlatList
          refreshing={isRefresh}
          onRefresh={() => {
            setIsRefreshing(true);
            getOrdersList();
          }}
          data={ordersList}
          renderItem={({item}) => {
            return <PlaceListItem key={item.id} data={item} />;
          }}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={{textAlign: 'center', paddingTop: 10, paddingBottom: 20}}>
          No Orders Available At the moment
        </Text>
      )}
    </>
  );
};

export default FeaturedTab;
