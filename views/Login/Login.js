import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  Platform,
} from 'react-native';
import UserLogin from './UserLogin';
import PasswordLogin from './PasswordLogin';
import TenantService from '../../services/tenant/TenantService';
import SessionService from '../../services/session/SessionService';
import TokenServices from '../../services/token/TokenServices';
import Colors from '../../assets/style/Colors';

const Login = ({navigation}) => {
  const [imageLoad, setImageLoad] = useState(true);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [userEntered, setUserEntered] = useState(false);
  const [tenant, setTenant] = useState('');
  const [tenantId, setTenantId] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setImageLoad(false);
    }, 1500);
  }, []);
  const submitUser = async (user) => {
    setUser(user);
    const res = await TenantService.getTenants(user);
    if (res === false) {
      this.notifyService.showError('Error en la conexión', MessageTypes.ERROR);
      return;
    }
    if (res.length > 1) {
      //agregar las vistas para mas de un tenant
      return;
    } else if (res.length === 1) {
      // setUserEntered(true);
      setTenant(res[0].tenantName);
      setTenantId(res[0].id);
      SessionService.setTenant(res[0].tenantName);
      navigation.navigate('Password', {userName: user});
    } else {
      navigation.navigate('Password', {userName: user});
      setUserEntered(true);
    }
  };

  return (
    <>
      {/* <Container> */}
      {imageLoad ? (
        <ImageBackground
          source={require('../../assets/img/background.png')}
          style={styles.imageBackground}>
          <View>
            <Image
              source={require('../../assets/img/logo.png')}
              style={styles.image}
            />
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.login}>
          <UserLogin submitUser={submitUser} setUserEntered={setUserEntered} />
        </View>
      )}
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
  imageBackground: {
    resizeMode: 'cover',
    justifyContent: 'center',
    flex: 1,
    padding: '10%',
  },
  image: {
    width: 300,
    height: 80,
  },
});

export default Login;
