import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {Colors} from '../../assets/style/Colors';

const CardList = (props) => {
  return (
    <View
      style={[
        styles.card,
        props.propStyles,
        props.disabled ? styles.cardDisabled : null,
      ]}>
      {props.children}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ece8f8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardDisabled: {
    backgroundColor: '#e0e0e0',
  },
});

export default CardList;
