import * as React from 'react';
import {Container, Text} from '@src/components/elements';
import {Place, mockRemarkablePlace} from '@src/data/mock-places';
import PlaceListItem from '@src/components/common/PlaceListItem';
import styles from './styles';
import {useSelector} from 'react-redux';
import _ from 'lodash';

type NewestTabProps = {};

const NewestTab: React.FC<NewestTabProps> = () => {
  const products = useSelector((data) => data.auth.products) || {};

  const newData = [];

  _.map(products, (item) => {
    const {hotDeal} = item;
    if (hotDeal) {
      newData.push(item);
    }
  });

  return (
    <>
      {!_.isEmpty(newData) ? (
        <Container style={styles.tabContent}>
          {newData.map((item: Place) => {
            return <PlaceListItem key={item.id} data={item} />;
          })}
        </Container>
      ) : (
        <Text style={{textAlign: 'center', paddingTop: 10, paddingBottom: 20}}>
          No Items In Newest List
        </Text>
      )}
    </>
  );
};

export default NewestTab;
