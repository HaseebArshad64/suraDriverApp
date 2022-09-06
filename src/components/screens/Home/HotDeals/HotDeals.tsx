import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Carousel, Section, Card} from '@src/components/elements';
import {Dimensions} from 'react-native';
import {mockPlaces, Place} from '@src/data/mock-places';
import PlaceCardInfo from '@src/components/common/PlaceCardInfo';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {getOrdersHistoryAPI, serverUrl} from '@src/database/backendApi';

type HotDealsProps = {};

const HotDeals: React.FC<HotDealsProps> = () => {
  const [ordersList, setOrdersList] = React.useState([]);
  const navigation = useNavigation();

  const _onPlaceItemPressed = (id) => {
    navigation.navigate('ActivityHistoryDetailScreen', {id});
  };

  const getOrdersList = async () => {
    const orders = await getOrdersHistoryAPI();
    setOrdersList(orders);
  };

  // const products = useSelector((data) => data.auth.products) || {};

  // const newData = [];

  // console.log('products', products);

  // _.map(products, (item) => {
  //   const {hotDeal} = item;
  //   if (hotDeal) {
  //     newData.push(item);
  //   }
  // });

  const newData = [
    {
      productName: 'chicken M',
      image: 'uploads/1656336703category-5.png',
      price: 12,
      id: 2,
    },
  ];

  console.log('ordersList');
  console.log('ordersList');
  console.log('ordersList', ordersList);

  React.useEffect(() => {
    getOrdersList();
  }, []);

  return (
    <>
      {!_.isEmpty(newData) && (
        <Section title="Orders At the moment">
          <Carousel
            data={ordersList}
            itemWidth={Dimensions.get('window').width}
            renderContent={(item: Place, index, parallaxProps) => {
              const {productName, image, price, id} = item;
              return (
                <Card
                  title={productName}
                  subTitle={`${price} AED`}
                  parallaxProps={parallaxProps}
                  onPress={() => _onPlaceItemPressed(id)}>
                  {/* <PlaceCardInfo data={item} /> */}
                </Card>
              );
            }}
          />
        </Section>
      )}
    </>
  );
};

export default HotDeals;
