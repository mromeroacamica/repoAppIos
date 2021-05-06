import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import TenantService from '../../services/tenant/TenantService';
import {Colors} from '../../assets/style/Colors';

const UserLogin = ({submitUser}) => {
  const [user, saveUser] = useState('');
  const [wrongUser, setWrongUser] = useState(false);
  const regex = /\w(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const validateUser = async () => {
    const isValid = regex.test(user);
    if (isValid) {
      submitUser(user);
    } else {
      setWrongUser(true);
    }
  };
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Iniciar sesión</Text>
        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          keyboardType={'email-address'}
          onChangeText={(text) => {
            const textToLowercase = text.toLowerCase();
            saveUser(textToLowercase);
          }}
        />
      </View>
      {wrongUser ? (
        <View>
          <Text>Ingresar el correo electrónico correctamente.</Text>
        </View>
      ) : null}
      <View>
        <TouchableOpacity
          onPress={() => validateUser()}
          style={styles.botonSubmit}>
          <Text style={styles.textoBotonSubmit}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    // backgroundColor: 'blue',
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

export default UserLogin;
