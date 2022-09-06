import * as React from 'react';
import {
  Container,
  Icon,
  Divider,
  SearchBar,
  Button,
  Text,
} from '@src/components/elements';
import {
  ScrollView,
  Image,
  View,
  Alert,
  AlertButton,
  I18nManager,
  Linking,
} from 'react-native';
import ListRowItem from '@src/components/elements/List/ListRowItem';
import {profile} from '@src/data/mock-profile';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '@src/context/auth-context';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '@src/components/store/actions/authActions';
import {serverUrl} from '@src/database/backendApi';
import {getStoreURL} from '@src/utils/store-info';

type AccountProps = {};

const Account: React.FC<AccountProps> = () => {
  const navigation = useNavigation();
  const {signOut} = React.useContext(AuthContext);
  const chevronIconName = I18nManager.isRTL ? 'chevron-left' : 'chevron-right';
  const dispatch = useDispatch();

  const alertButtons: AlertButton[] = [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {text: 'OK', onPress: () => dispatch(logoutUser())},
  ];

  const onLogoutButtonPressed = () => {
    Alert.alert('Confirm', 'Are you sure you want to logout?', alertButtons);
  };
  const {name, image} = useSelector((data) => data.auth.currentUser) || {};

  return (
    <ScrollView>
      {/* <SearchBar /> */}
      <Divider />
      <Container>
        <ListRowItem
          title={name}
          subTitle="Edit Profile"
          onPress={() => navigation.navigate('EditProfileScreen')}
          leftIcon={
            <Image
              source={require('@src/assets/drivers/rider.png')}
              style={styles.profileAvatar}
            />
          }
          rightIcon={<Icon name={chevronIconName} />}
        />
      </Container>
      <Container style={styles.accountMenuItemContainer}>
        {/* <Divider />
        <Divider />
        <ListRowItem
          title="Order History"
          onPress={() => navigation.navigate('OrderHistoryScreen')}
          rightIcon={<Icon name={chevronIconName} />}
        />
        <Divider /> */}
        {/* <ListRowItem
          title="Restaurant Address"
          onPress={() => navigation.navigate('SavedAddressesScreen')}
          rightIcon={<Icon name={chevronIconName} />}
        /> */}
        {/* <Divider /> */}
        <ListRowItem
          title="Settings"
          onPress={() => navigation.navigate('SettingsScreen')}
          rightIcon={<Icon name={chevronIconName} />}
        />
        <Divider />
        {/* <ListRowItem
          title="Share Feedback"
          rightIcon={<Icon name={chevronIconName} />}
          onPress={() => Linking.openURL(getStoreURL())}
        /> */}
      </Container>
      <View style={styles.buttonContainer}>
        <Button isFullWidth isTransparent onPress={onLogoutButtonPressed}>
          <Text isBold isPrimary>
            Logout
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default Account;
