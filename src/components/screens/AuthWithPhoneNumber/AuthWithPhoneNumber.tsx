import * as React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Text, TextField, Button, Dialog} from '@src/components/elements';
import useThemeColors from '@src/custom-hooks/useThemeColors';
import styles from './styles';
import {StackActions, useNavigation, useTheme} from '@react-navigation/native';
import {loginAPI} from '@src/database/backendApi';

type AuthWithPhoneNumberProps = {};

const AuthWithPhoneNumber: React.FC<AuthWithPhoneNumberProps> = () => {
  const navigation = useNavigation();
  const {card} = useThemeColors();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const _onPhoneNumberFieldChange = (value: string) => {
    setPhoneNumber(value);
  };

  const _hideModal = () => {
    setIsModalVisible(false);
  };

  const _onNextButtonPressed = () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter your phone number!');
      return;
    }
    setIsModalVisible(true);
  };
  const _onConfirmButtonPressed = async () => {
    setIsLoading(true);
    const data = await loginAPI(phoneNumber);
    if (data) {
      navigation.dispatch(StackActions.replace('LoginScreen', {data}));
    } else {
      Alert.alert('Error', 'User does not exists!');
    }
    setIsLoading(false);
    _hideModal();
  };

  const {
    colors: {primary: baseBackgroundColor},
  } = useTheme();

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text isBold isHeadingTitle>
            Enter your phone number
          </Text>
          <Text isSecondary hasMargin>
            Please enter your phone number to use our services
          </Text>
          <TextField
            style={[{backgroundColor: card}, styles.phoneNumberTextField]}
            value={phoneNumber}
            onChangeText={_onPhoneNumberFieldChange}
            hasMargin
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            autoFocus
          />
        </View>
        <Button isFullWidth onPress={_onNextButtonPressed}>
          <Text isBold>Next</Text>
        </Button>
      </ScrollView>
      <Dialog isVisible={isModalVisible} onBackdropPress={_hideModal}>
        <Text isCenter>Login with phone number</Text>
        <Text isHeadingTitle isCenter isBold style={styles.phoneNumberText}>
          {phoneNumber}
        </Text>
        <Text isCenter>Do you want to continue?</Text>
        {isLoading && (
          <ActivityIndicator color={baseBackgroundColor} size="large" />
        )}
        <View style={styles.confirmButtonContainer}>
          <Button isFullWidth onPress={_onConfirmButtonPressed}>
            <Text isBold>Confirm</Text>
          </Button>
        </View>
        <View style={styles.cancelButtonContainer}>
          <Button isFullWidth isTransparent onPress={_hideModal}>
            <Text>Cancel</Text>
          </Button>
        </View>
      </Dialog>
    </SafeAreaView>
  );
};

export default AuthWithPhoneNumber;
