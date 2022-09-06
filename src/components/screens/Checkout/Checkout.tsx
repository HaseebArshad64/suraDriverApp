import * as React from 'react';
import {ScrollView, View} from 'react-native';
import DeliveryInformation from './DeliveryInformation';
import OrderSummary from './OrderSummary';
import PaymentMethod from './PaymentMethod';
import styles from './styles';
import PlaceOrder from './PlaceOrder';
import DishesAlsoOrdered from './DishesAlsoOrdered';
import CartContext from '@src/context/cart-context';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {Text} from '@src/components/elements';

type BasketProps = {};

const shippingFee = 5;

const Basket: React.FC<BasketProps> = () => {
  const [address, setAddress] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const {cart} = useSelector((data) => data.cart) || {};

  let price = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart.length > 0) {
      price = price + cart[i].totalPrice;
    }
  }

  return (
    <View style={styles.rootContainer}>
      {!_.isEmpty(cart) ? (
        <>
          <ScrollView
            contentInset={{
              bottom: 25,
            }}>
            <DeliveryInformation
              address={address}
              setAddress={setAddress}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
            <OrderSummary
              cartItems={cart}
              totalPrice={price}
              shippingFee={shippingFee}
            />
            {/* <DishesAlsoOrdered /> */}
            <PaymentMethod />
          </ScrollView>
          <PlaceOrder
            address={address}
            phoneNumber={phoneNumber}
            cart={cart}
            totalPrice={price}
            shippingFee={5}
          />
        </>
      ) : (
        <>
          <Text style={{textAlign: 'center', paddingTop: 10}} isBold>
            No Items In Cart
          </Text>
        </>
      )}
    </View>
  );
};

export default Basket;
