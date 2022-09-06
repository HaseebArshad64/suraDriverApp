import * as React from 'react';
import {
  Animated,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';
import {Text, Button} from '@src/components/elements';
import {mockDishDetails, Dish} from '@src/data/mock-places';
import CartContext from '@src/context/cart-context';
import HeadingInformation from './HeadingInformation';
import SideDishes from './SideDishes';
import AddToBasketForm from './AddToBasketForm';
import {formatCurrency} from '@src/utils/number-formatter';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {serverUrl} from '@src/database/backendApi';
import {addToCart} from '@src/components/store/actions/cartActions';

type DishDetailsProps = {};

export const DishDetails: React.FC<DishDetailsProps> = (props) => {
  const {id} = props.route.params;

  const productDetails =
    useSelector((data) => {
      const {products} = data.auth;
      return _.filter(products, (item) => {
        const {id: productId} = item;
        if (productId === id) {
          return item;
        }
      })[0];
    }) || {};

  const {
    category,
    id: productId,
    description,
    image,
    price,
    productName,
  } = productDetails;

  const [totalPrice, setTotalPrice] = React.useState(parseFloat(price));
  const [selectedSideDishes, setSelectedSideDishes] = React.useState<Dish[]>(
    [],
  );
  const [totalQuantity, setTotalQuantity] = React.useState(1);
  const [scrollY] = React.useState(new Animated.Value(0));
  const {
    colors: {background},
  } = useTheme();
  const {goBack} = useNavigation();
  const {updateCartItems} = React.useContext(CartContext);

  const addSideDishToBasket = React.useCallback(
    (dish: Dish) => {
      const existedDishIndex = selectedSideDishes.find(
        (item: Dish) => item.id === dish.id,
      );
      if (existedDishIndex) {
        setSelectedSideDishes(
          selectedSideDishes.filter((item: Dish) => item.id !== dish.id),
        );
        setTotalPrice(totalPrice - parseFloat(existedDishIndex.price));
      } else {
        setSelectedSideDishes([...selectedSideDishes, dish]);
        setTotalPrice(totalPrice + parseFloat(dish.price));
      }
    },
    [selectedSideDishes, totalPrice],
  );

  const updateTotalDishAmount = React.useCallback(
    (amount: number) => {
      const totalSelectedDishPrice = selectedSideDishes.reduce(
        (prevValue, currentValue) => prevValue + parseFloat(currentValue.price),
        0,
      );
      setTotalQuantity(amount);
      setTotalPrice(parseFloat(price) * amount + totalSelectedDishPrice);
    },
    [selectedSideDishes],
  );

  const dispatch = useDispatch();

  const product = {
    productId,
    category,
    description,
    productName,
    totalQuantity,
    totalPrice,
  };

  const onAddToBasketButtonPressed = () => {
    dispatch(addToCart(product));
    goBack();
  };

  const coverTranslateY = scrollY.interpolate({
    inputRange: [-4, 0, 10],
    outputRange: [-2, 0, 3],
  });

  const coverScale = scrollY.interpolate({
    inputRange: [-200, 0],
    outputRange: [2, 1],
    extrapolateRight: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [150, 250],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.rootContainer}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          enabled>
          <Animated.ScrollView
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: scrollY,
                    },
                  },
                },
              ],
              {
                useNativeDriver: true,
              },
            )}>
            <Animated.View
              style={[
                styles.coverPhotoContainer,
                {
                  transform: [
                    {
                      translateY: coverTranslateY,
                    },
                  ],
                },
              ]}>
              <Animated.Image
                source={{uri: `${serverUrl}${image}`} || {}}
                style={[
                  styles.coverPhoto,
                  {
                    transform: [
                      {
                        scale: coverScale,
                      },
                    ],
                  },
                ]}
              />
            </Animated.View>
            <HeadingInformation data={productDetails} />
            {/* <SideDishes
              data={mockDishDetails}
              addSideDishToBasket={addSideDishToBasket}
            /> */}
            <AddToBasketForm updateTotalDishAmount={updateTotalDishAmount} />
          </Animated.ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.addToBasketButtonContainer}>
          <Button
            childrenContainerStyle={styles.addToBasketButton}
            onPress={onAddToBasketButtonPressed}>
            <Text style={styles.addToBasketButtonText}>
              Add to Basket - {formatCurrency(price)}
            </Text>
          </Button>
        </View>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerOpacity,
              backgroundColor: background,
            },
          ]}>
          <Text style={styles.headerTitle}>{mockDishDetails.title}</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default DishDetails;
