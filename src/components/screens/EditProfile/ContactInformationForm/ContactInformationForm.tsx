import * as React from 'react';
import {Container, TextField, Text, Button} from '@src/components/elements';
import styles from './styles';
import {useSelector} from 'react-redux';

const ContactInformationForm: React.FC = () => {
  const {name, phone, address} =
    useSelector((data) => data.auth.currentUser) || {};
  return (
    <Container style={styles.container}>
      <TextField defaultValue={name} textContentType="name" hasMargin />
      <TextField
        defaultValue={phone}
        textContentType="telephoneNumber"
        hasMargin
      />
      {/* <TextField
        defaultValue={address}
        textContentType="addressCityAndState"
        hasMargin
      /> */}
      <Text isSecondary style={styles.note}>
        Please contact admin in order to update your profile details
      </Text>
      {/* <Button>
        <Text isWhite isBold>
          Save
        </Text>
      </Button> */}
    </Container>
  );
};
export default ContactInformationForm;
