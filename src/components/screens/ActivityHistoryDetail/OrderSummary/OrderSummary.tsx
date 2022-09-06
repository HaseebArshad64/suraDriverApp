import * as React from 'react';
import {View} from 'react-native';
import {Container, Text, Section, Divider} from '@src/components/elements';
import styles from './styles';
import {formatCurrency} from '@src/utils/number-formatter';
import {OrderDetail} from '@src/data/mock-activity-history';

type OrderSummaryProps = {
  orderDetail: any[];
};

const OrderSummary: React.FC<OrderSummaryProps> = (props: any) => {
  const {orderDetail, data} = props;
  const {orderPrice} = data;
  return (
    <Section title="Order Summary">
      <Container>
        {orderDetail &&
          orderDetail.map((item, index) => {
            const {productName, quantity, price} = item;
            return (
              <View key={index} style={styles.menuContainer}>
                <View style={styles.menuInfo}>
                  <View>
                    <Text style={styles.mainDishText} isBold>
                      ({quantity}) {productName}
                    </Text>
                  </View>
                </View>
                <Text isBold>{formatCurrency(price)}</Text>
              </View>
            );
          })}
        <Divider />
        <View style={styles.priceContainer}>
          <View style={styles.subTotalContainer}>
            <Text>Subtotal</Text>
            <Text>{formatCurrency(orderPrice)}</Text>
          </View>
          <View style={styles.deliveryFee}>
            <Text>Delivery:</Text>
            <Text>{formatCurrency(0)}</Text>
          </View>
          <View style={styles.deliveryFee}>
            <Text>Total</Text>
            <Text>{formatCurrency(orderPrice)}</Text>
          </View>
        </View>
      </Container>
    </Section>
  );
};

export default OrderSummary;
