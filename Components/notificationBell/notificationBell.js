import React from 'react';
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell} from '@fortawesome/free-solid-svg-icons';

const NotificationBell = () => {
  return (
    <View>
      <FontAwesomeIcon icon={faBell} style={styles.iconStyle} size={25} />
    </View>
  );
};
const styles = StyleSheet.create({
  iconStyle: {
    color: 'white',
    marginRight: 10,
  },
});

export default NotificationBell;
