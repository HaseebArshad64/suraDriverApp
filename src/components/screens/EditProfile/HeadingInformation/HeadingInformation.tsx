import * as React from 'react';
import {View, Image} from 'react-native';
import {Text} from '@src/components/elements';
import styles from './styles';
import {useSelector} from 'react-redux';
import {serverUrl} from '@src/database/backendApi';

const HeadingInformation: React.FC = () => {
  const {name, image, address} =
    useSelector((data) => data.auth.currentUser) || {};
  return (
    <View>
      <Image
        source={require('@src/assets/drivers/rider.png')}
        style={styles.coverPhoto}
        resizeMode="cover"
      />
      <View style={styles.informationContainer}>
        <Text isHeadingTitle style={styles.name}>
          {name}
        </Text>
        {/* <Text style={styles.memberPoints}>{address}</Text> */}
      </View>
    </View>
  );
};

export default HeadingInformation;
