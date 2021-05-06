import { Colors } from '../../assets/style/Colors';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

export interface Props{
  navigation:any
}

const PinConfigConfig : React.FC<Props> = ({navigation}) => {
    
    const clickHandler = ()=>{
        navigation.navigate('SetPin')
    }
  
  return (
    <>
    <View style={styles.login}>
        <View style={styles.imageContainer}>
            <Image
            source={require('../../assets/img/pin_logo.png')}
            style={styles.image2}
            />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.titleText}>Configuremos tu PIN</Text>
            <Text style={styles.textDetail}>Tu PIN de seguridad es personal y te lo pediremos al momento de firmar un documento, como un recibo de sueldo.</Text>
        </View>
        <View>
            <TouchableOpacity
            onPress={() => clickHandler()}
            style={styles.botonSubmit}>
            <Text style={styles.textoBotonSubmit}>CONFIGURAR</Text>
            </TouchableOpacity>
        </View>
    </View>
    </>
  );
};
const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    // alignItems:'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  imageContainer:{
      flexDirection:'row',
      width:'100%',
      justifyContent:'center'
  },
  textContainer:{
    // flexDirection:'row',
    width:'100%',
    justifyContent:'flex-start',
    flex:1
  },
  titleText:{
      fontSize:22,
      color:Colors.text,
      fontWeight:'bold',
      textAlign:'center',
      marginTop:15,
      marginBottom:10
  },
  image2: {
    width: 120,
    height: 60,
  },
  textDetail:{
      fontSize:17,
      color: Colors.text,
      textAlign:'center'
  },
  
  botonSubmit: {
    padding: 10,
    height: 45,
    backgroundColor: Colors.primary,
    marginTop: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  textoBotonSubmit: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  
});

export default PinConfigConfig;
