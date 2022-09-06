import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Container, Text, Section, Divider} from '@src/components/elements';
import styles from './styles';
import {CartItem} from '@src/context/cart-context';
import {formatCurrency} from '@src/utils/number-formatter';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {removeFromCart} from '@src/components/store/actions/cartActions';

type OrderSummaryProps = {
  cartItems: CartItem[];
  totalPrice: number;
  shippingFee: number;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  totalPrice,
  shippingFee,
}) => {
  const navigation = useNavigation();

  const [load, setLoad] = React.useState(false);

  const {
    colors: {primary: baseBackgroundColor},
  } = useTheme();

  const _onAddItemButtonPressed = (id) => {
    navigation.navigate('DishDetailsModal', {id});
  };

  const dispatch = useDispatch();

  return (
    <Section title="Order Summary">
      <Container>
        {cartItems.map((cartItem, cartItemIndex) => (
          <View style={styles.menuContainer}>
            <View style={styles.menuInfo}>
              {/* <Text style={styles.quantityText}>{`${cartItemIndex + 1}`}</Text> */}
              <TouchableOpacity
                onPress={() => _onAddItemButtonPressed(cartItem.productId)}>
                <View key={cartItemIndex}>
                  <Text style={styles.mainDishText} isBold>
                    {`(${cartItem.totalQuantity}) ${cartItem.productName}`}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text isBold>{formatCurrency(cartItem.totalPrice)}</Text>
            <TouchableOpacity
              onPress={async () => {
                await dispatch(removeFromCart(cartItem.productId));
                setLoad(!load);
              }}>
              <FontAwesome
                name="remove"
                color={baseBackgroundColor}
                size={20}
              />
            </TouchableOpacity>
          </View>
        ))}
        <Divider />
        <View style={styles.priceContainer}>
          <View style={styles.subTotalContainer}>
            <Text>Subtotal</Text>
            <Text>{formatCurrency(totalPrice)}</Text>
          </View>
          <View style={styles.deliveryFee}>
            <Text>Delivery</Text>
            <Text>{formatCurrency(shippingFee)}</Text>
          </View>
        </View>
      </Container>
    </Section>
  );
};

export default OrderSummary;
