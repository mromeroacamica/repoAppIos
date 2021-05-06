import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ContainerScreen from '../../Components/Container/Container';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEdit,
} from '@fortawesome/free-solid-svg-icons';


export interface Props{
  navigation:any,
  setDocuments:Function
}

const CredentialsComponent: React.FC<Props> = ({navigation, setDocuments}) => {
  const navigateTo = (screen:string) => {
    navigation.navigate(screen);
  };
  return (
    <>
      <ContainerScreen navigation={navigation} setDocuments={setDocuments}>
        <View style={styles.container}>
          <View >
            <TouchableOpacity onPress={() => navigateTo('PasswordConfig')}>
              <View style={styles.lineBottomTop}>
                <View style={styles.cardWrapper}>
                  <View style={styles.textWrapper}>
                    <Text style={styles.inputTitle}>Contraseña</Text>
                    <Text>************</Text>
                  </View>
                  <View>
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={styles.iconStyle}
                      size={25}
                    /> 
                  </View>
                </View>

              </View>
            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity onPress={() => navigateTo('PinConfig')}>
            <View style={[styles.lineBottomBottom,, styles.paddingBottom]}>
                <View style={[styles.cardWrapper]}>
                  <View style={styles.textWrapper}>
                    <Text style={styles.inputTitle}>PIN</Text>
                    <Text>*******</Text>
                  </View>
                  <View>
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={styles.iconStyle}
                      size={25}
                    /> 
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ContainerScreen>
    </>
  );
};
const styles = StyleSheet.create({
  container:{
    paddingHorizontal:10, 
    marginTop:40,
  },
  iconStyle: {
    color: '#3f51b5',
  },
  lineBottomTop:{
    backgroundColor:'white',
    paddingHorizontal:10,
    borderTopLeftRadius:15,
    borderTopRightRadius:15
  },
  lineBottomBottom:{
    backgroundColor:'white',
    paddingHorizontal:10,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'white',
    alignItems:'center',
    paddingTop:10,
    borderBottomColor:'grey',
    borderBottomWidth:1
  },
  paddingBottom:{
    paddingBottom:30
  },
  textWrapper:{},
  inputTitle:{
    color:'grey',
    fontSize:18,
  },
});

export default CredentialsComponent;
