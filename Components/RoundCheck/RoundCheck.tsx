import React from 'react';
import {StyleSheet, View,} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../../assets/style/Colors';

export interface Props{
}

const RoundCheck: React.FC<Props> = () => {
  return (
    <>
      <View style={[styles.roundImageContainer,styles.borderColor]}>
        <FontAwesomeIcon icon={faCheck} style={styles.iconStyle} size={27} />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  roundImageContainer: {
    height: 47,
    width: 47,
    alignItems:'center',
    justifyContent:'center',
    marginRight:10,
    backgroundColor:Colors.primary
  },
  borderColor:{
    borderRadius:100
  },
  iconStyle:{
    color:'#fff'
  }
  
});

export default RoundCheck;
