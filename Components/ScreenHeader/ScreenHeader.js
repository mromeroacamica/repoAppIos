import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFileAlt, faBell, faCog} from '@fortawesome/free-solid-svg-icons';

const ScreenHeader = ({fontIcon, title}) => {
  let icon;
  switch (fontIcon) {
    case 'faFileAlt':
      icon = faFileAlt;
      break;
    case 'faBell':
      icon = faBell;
      break;
    case 'faCog':
      icon = faCog;
      break;
    default:
      icon = faFileAlt;
      break;
  }
  return (
    <>
      <View style={styles.topHeader}>
        <View style={styles.headerContainer}>
          <FontAwesomeIcon icon={icon} style={styles.iconStyle} size={33} />
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    color: 'white',
    marginRight: 10,
  },
  text: {
    fontSize: 22,
    color: 'white',
  },
  topHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ScreenHeader;
