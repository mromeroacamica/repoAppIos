import { Colors } from '../../assets/style/Colors';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import AccountServices from '../../services/account/AccountServices'

export interface Props{
  navigation:any
}

const ForgotPassword : React.FC<Props> = ({navigation}) => {
    const [email, setEmail]= useState('')

    const sendEmail=async (email:string)=>{
       const res= await AccountServices.forgotPassword(email.trim())
       if (res.status == 200){
           showAlert()
       }
    }
    const showAlert = () => {
        Alert.alert('Envio correo electrónico', 'Se ha enviado el correo electrónico correctamente.', [
          
          {text: 'Confirmar', onPress: () => navigation.navigate('Password')},
        ]);
      };
  
  return (
    <>
    <View style={styles.login}>
    <Text style={styles.textDetail}>Ingresa tu correo electrónico y te enviaremos un link para que vuelvas a establecer tu contraseña</Text>
    <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => sendEmail(email)}
          style={styles.botonSubmit}>
          <Text style={styles.textoBotonSubmit}>ENVIAR</Text>
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
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  textDetail:{
      fontSize:17,
      color: Colors.text
  },
  inputContainer: {
    flexDirection: 'column',
    // backgroundColor: 'blue',
    flex: 1,
    alignItems: 'flex-start',
  },
  
  label: {
    fontSize: 15,
    marginTop: 0,
    marginLeft: 15,
    backgroundColor: 'white',
    padding: 10,
    zIndex: 3,
  },
  input: {
    marginTop: -18,
    height: Platform.OS === 'ios' ? 65 : 55,
    width: '100%',
    borderColor: '#e1e1e1',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 8,
    marginBottom: 10,
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

export default ForgotPassword;
