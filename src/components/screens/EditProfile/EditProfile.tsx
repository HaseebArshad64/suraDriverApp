import * as React from 'react';
import {ScrollView} from 'react-native';
import HeadingInformation from './HeadingInformation';
import ContactInformationForm from './ContactInformationForm';
import LinkedAccounts from './LinkedAccounts';

const EditProfile: React.FC = () => {
  return (
    <ScrollView>
      <HeadingInformation />
      <ContactInformationForm />
    </ScrollView>
  );
};

export default EditProfile;
