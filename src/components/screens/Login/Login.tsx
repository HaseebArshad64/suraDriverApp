import * as React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Text, TextField, Button} from '@src/components/elements';
import useThemeColors from '@src/custom-hooks/useThemeColors';
import styles from './styles';
import AuthContext from '@src/context/auth-context';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  getCategoryAPI,
  getOrdersAPI,
  imageUrl,
  serverUrl,
} from '@src/database/backendApi';
import {useDispatch} from 'react-redux';
import {
  setRestaurantCategory,
  setRestaurantProducts,
  startPhoneLogin,
} from '@src/components/store/actions/authActions';

export interface userDetailsProps {
  route: {
    params: {
      data: {
        address: string;
        id: number;
        name: string;
        password: string;
        phone: string;
        status: boolean;
        image: string;
      };
    };
  };
}

const Login: React.FC<userDetailsProps> = (
  props: userDetailsProps,
): JSX.Element => {
  const dispatch = useDispatch();
  const {
    colors: {primary: baseBackgroundColor},
  } = useTheme();
  const {data} = props.route.params;
  const {name, password: backendPassword, image, id} = data;
  const navigation = useNavigation();
  const {signIn} = React.useContext(AuthContext);
  const {card} = useThemeColors();
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const _onPasswordFieldChange = (value: string) => {
    setPassword(value);
  };

  const _onNextButtonPressed = async () => {
    setIsLoading(true);
    if (!password) {
      Alert.alert('Error', 'Please enter your password!');
      return;
    }
    if (password === backendPassword) {
      const orders = await getOrdersAPI(id);
      dispatch(startPhoneLogin(data));
      dispatch(setRestaurantProducts(orders));
      signIn();
    } else {
      Alert.alert('Error', 'Please Input Correct Password!');
    }
    setIsLoading(false);
    return;
  };
  const _onForgotPasswordButtonPressed = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Image
            source={require('@src/assets/drivers/rider.png')}
            style={styles.avatar}
          />
          <Text isBold isHeadingTitle>
            Welcome, {name}!
          </Text>
          <Text isSecondary hasMargin>
            Please enter your password to use our services
          </Text>
          <TextField
            autoFocus
            style={[{backgroundColor: card}, styles.passwordTextField]}
            value={password}
            onChangeText={_onPasswordFieldChange}
            hasMargin
            placeholder="Enter your password"
            secureTextEntry={true}
          />
        </View>
        {isLoading && (
          <ActivityIndicator
            color={baseBackgroundColor}
            size="large"
            style={{paddingBottom: 25}}
          />
        )}
        <Button isFullWidth onPress={_onNextButtonPressed}>
          <Text isBold>Next</Text>
        </Button>
        {/* <Button
          isFullWidth
          isTransparent
          onPress={_onForgotPasswordButtonPressed}
          style={styles.forgotPasswordButton}>
          <Text>Forgot Password</Text>
        </Button> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
