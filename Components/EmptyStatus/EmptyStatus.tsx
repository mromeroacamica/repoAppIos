import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faInbox} from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../../assets/style/Colors';

export interface Props{
    subtitle:string
}

const EmptyStatus: React.FC<Props> = ({subtitle}) => {
  return (
    <>
      <View style={styles.container}>
          <View style={styles.iconTextContainer}>
            <FontAwesomeIcon icon={faInbox} style={styles.iconStyle} size={77} />
            <Text style={styles.title}>Nada por aquí</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
container:{
    flex:1,
    // backgroundColor:'#fff',
    paddingHorizontal:15,
    paddingTop:20,
    paddingBottom:20,
},
iconTextContainer:{
    backgroundColor:'#fff',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
iconStyle:{
    color:Colors.primary
},
title:{
fontSize:30,
fontWeight:'bold'
},
subtitle:{
fontSize:15,
},

  
});

export default EmptyStatus;
