import * as React from 'react';
import {Container, List} from '@src/components/elements';
import {mockPlaceList} from '@src/data/mock-places';
import PlaceListItem from '@src/components/common/PlaceListItem';
import styles from './styles';
import {useSelector} from 'react-redux';
import _ from 'lodash';

type PlaceListProps = {};

const PlaceList: React.FC<PlaceListProps> = (props) => {
  const {id} = props.route.params;

  const products = useSelector((data) => data.auth.products) || {};
  const newData = [];

  _.map(products, (item) => {
    const {category} = item;
    if (category === id) {
      newData.push(item);
    }
  });

  return (
    <Container style={styles.root}>
      <List
        data={newData}
        renderItem={({item}) => {
          return <PlaceListItem key={item.id} data={item} />;
        }}
      />
    </Container>
  );
};

export default PlaceList;
