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
import SessionService from '../../services/session/SessionService'

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
faEye
} from '@fortawesome/free-solid-svg-icons';
import TokenServices from '../../services/token/TokenServices';


export interface Props{
  route:any,
  navigation:any,
}

const ConfirmPassword : React.FC<Props> = ({route, navigation}) => {
  const {pinPassword} = route.params;
  const [visiblePassword, setVisiblePasssword] = useState(false);
  const [password, savePassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false);

  const submitPinUpdate = async (password:any) => {
      const currentUser = SessionService.getCurrentUser()
      const accountId = currentUser.account.id
    const res = await AccountServices.updatePIN(accountId,password,pinPassword );
    if (res){
        const token=TokenServices.getToken()
        token.account.hasValidElectronicCertificate=true
        await TokenServices.setToken(token)
    }
    
  };
  const validatePassword = () => {
    if (password == '') {
      setWrongPassword(true);
    } else {
        submitPinUpdate(password);
    }
  };
  return (
    <>
    <View style={styles.login}>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Ingresa tu contraseña</Text>
        <Text style={styles.label}>Ingresa tu contraseña</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            secureTextEntry={!visiblePassword}
            style={styles.input}
            onChangeText={(text) => {
              savePassword(text.trim());
            }}
          />
          <TouchableOpacity
            onPress={() => setVisiblePasssword(!visiblePassword)}
            style={styles.tooglePassword}>
            <FontAwesomeIcon
              icon={faEye}
              style={styles.tooglePasswordText}
              size={22}
            />
          </TouchableOpacity>
        </View>
        {wrongPassword ? (
          <Text>Ingrese correctamente su contraseña</Text>
        ) : null}
      </View>
      <View>
        <TouchableOpacity
          onPress={() => validatePassword()}
          style={styles.botonSubmit}>
          <Text style={styles.textoBotonSubmit}>ACEPTAR</Text>
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
  userText: {
    color: 'grey',
  },
  inputContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
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
    marginTop: -20,
    height: Platform.OS === 'ios' ? 65 : 55,
    width: '85%',
    borderColor: '#e1e1e1',
    borderWidth: 2,
    borderStyle: 'solid',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius:8,
    marginBottom: 10,
  },
  passwordInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  tooglePassword: {
    backgroundColor: 'white',
    width: '15%',
    marginTop: -20,
    height: Platform.OS === 'ios' ? 65 : 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#e1e1e1',
    borderWidth: 2,
    borderStyle: 'solid',
    borderTopRightRadius: 8,
    borderBottomRightRadius:8,
    marginBottom: 10,
  },
  tooglePasswordText: {
    color: Colors.text,
  },
  buttonForgotPw:{
    backgroundColor:'white'
  },
  textoForgotPw:{
    fontSize:13,
    color:Colors.primary,
    backgroundColor:'white'
  },
  botonSubmit: {
    padding: 10,
    height: 45,
    backgroundColor: Colors.primary,
    marginTop: 20,
    borderRadius: 8,
    justifyContent:'center'
  },
  textoBotonSubmit: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});

export default ConfirmPassword;
