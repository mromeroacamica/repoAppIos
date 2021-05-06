import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';

const LogoHeader = () => {
  return <View style={styles.imageContainer}>
  <Image
    source={require('../../assets/img/logo.png')}
    style={styles.image2}
  />
</View>;
};
const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: Platform.OS === 'ios' ? 40 : 20,
      },
      image2: {
        width: 120,
        height: 30,
      },
});

export default LogoHeader;
