import * as React from 'react';
import {Container, Text} from '@src/components/elements';
import {Dish} from '@src/data/mock-places';
import styles from './styles';

type HeadingInformationProps = {
  data: Dish;
};

const HeadingInformation: React.FC<HeadingInformationProps> = ({data}) => {
  const {description, image, price, productName} = data;
  return (
    <Container style={styles.headingContainer}>
      <Container style={styles.titleContainer}>
        <Text style={styles.title}>{productName}</Text>
        <Text isPrimary style={styles.title}>
          AED {price}
        </Text>
      </Container>
      <Text style={styles.description}>{description}</Text>
    </Container>
  );
};

export default HeadingInformation;
