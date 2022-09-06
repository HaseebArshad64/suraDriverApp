import * as React from 'react';
import {ScrollView, Image, Linking, ActivityIndicator} from 'react-native';
import ListRowItem from '@src/components/elements/List/ListRowItem';
import {activityHistoryDetail} from '@src/data/mock-activity-history';
import {Divider, Container, Icon, Button, Text} from '@src/components/elements';
import useThemeColors from '@src/custom-hooks/useThemeColors';
import StepIndicator from 'react-native-step-indicator';
import {StepIndicatorStyles} from 'react-native-step-indicator/lib/typescript/src/types';
import OrderSummary from './OrderSummary';
import styles from './styles';
import {
  getOrdersHistoryProductsAPI,
  markAsComplete,
  serverUrl,
} from '@src/database/backendApi';
import {useNavigation} from '@react-navigation/native';

type ActivityHistoryDetailProps = {};

const ActivityHistoryDetail: React.FC<ActivityHistoryDetailProps> = (props) => {
  const {primary, text, background, secondary} = useThemeColors();
  const [orderProducts, setOrderProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigation = useNavigation();

  const stepIndicatorStyles: StepIndicatorStyles = {
    currentStepIndicatorSize: 35,
    stepStrokeCurrentColor: background,
    separatorFinishedColor: primary,
    separatorUnFinishedColor: secondary,
    stepIndicatorFinishedColor: primary,
    stepIndicatorUnFinishedColor: background,
    stepIndicatorCurrentColor: background,
    stepIndicatorLabelFontSize: 12,
    currentStepIndicatorLabelFontSize: 12,
    stepIndicatorLabelCurrentColor: text,
    stepIndicatorLabelFinishedColor: 'white',
    stepIndicatorLabelUnFinishedColor: text,
    labelColor: text,
    labelAlign: 'flex-start',
    currentStepLabelColor: text,
    separatorStrokeWidth: 2,
  };

  const renderLabel = (params: {position: number; stepStatus: string}) => {
    const {position} = params;
    switch (position) {
      case 0:
        return <Icon name="utensils" isPrimary />;
      case 1:
        return <Icon name="map-marker-alt" isPrimary />;
      default:
        return null;
    }
  };

  const data = props.route.params.data;
  const {id, restaurantName, customerAddress, restaurantImage} = data;

  const labels = [restaurantName, customerAddress];

  const getOrderProducts = async () => {
    const products = await getOrdersHistoryProductsAPI(id);
    setOrderProducts(products);
  };

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
    getOrderProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="orange"
          style={{marginTop: 200}}
        />
      ) : (
        <ScrollView>
          <ListRowItem
            title={restaurantName}
            note={`Booking ID: ${id}`}
            subTitle={`Status: In Progress`}
            leftIcon={
              <Image
                source={{uri: `${serverUrl}${restaurantImage}`}}
                style={styles.icon}
              />
            }
          />
          <Divider />
          <Container style={styles.locationTrackingContainer}>
            <StepIndicator
              customStyles={stepIndicatorStyles}
              labels={labels}
              direction="vertical"
              stepCount={2}
              renderStepIndicator={renderLabel}
            />
          </Container>
          <Divider />
          <OrderSummary data={data} orderDetail={orderProducts} />
          <Container style={styles.footer}>
            <Button
              isFullWidth
              onPress={async () => {
                await Linking.openURL(
                  'https://www.google.com/maps/dir/?api=1&origin&destination=18.7838427,98.9926833',
                );
              }}>
              <Text isWhite>Get Directions To Restaurant</Text>
            </Button>
            <Button
              isFullWidth
              style={{marginTop: 20}}
              onPress={async () => {
                const isMarked = await markAsComplete(id);
                if (isMarked) {
                  navigation.goBack();
                }
              }}>
              <Text isWhite>Mark Order As Complete</Text>
            </Button>
          </Container>
        </ScrollView>
      )}
    </>
  );
};

export default ActivityHistoryDetail;
