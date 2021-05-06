import React, {useState, useContext, useEffect, useMemo} from 'react';
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native';
import Login from './views/Login/Login';
import PasswordLogin from './views/Login/PasswordLogin';
import ForgotPassword from './views/Login/ForgotPassword';
import PinConfig from './views/Login/PinConfig';
import SetPin from './views/Login/SetPin';
import ConfirmPassword from './views/Login/ConfirmPassword';
import Dashboard from './views/Dashboard/Dashboard';
import DocumentsDashboard from './views/Documents/DocumentsDashboard';
import DocumentsNotSigned from './views/Documents/DocumentsNotSigned';
import DocumentsSigned from './views/Documents/DocumentsSigned';
import DocumentViewer from './views/Documents/DocumentViewer';
import DisconformitySign from './views/Documents/DisconformitySign';
import PinConfirmation from './views/Documents/PinConfirmation';
import ScreenHeader from './Components/ScreenHeader/ScreenHeader';
import NotificationBell from './Components/notificationBell/notificationBell';
import ConfigComponent from './views/Config/ConfigComponent';
import HelpComponent from './views/Config/HelpComponent';
import CredentialsComponent from './views/Config/CredentialsComponent';
import PasswordConfig from './views/Config/PasswordConfig';
import PinConfigConfig from './views/Config/PinConfig';
import SetPinConfig from './views/Config/SetPin';
import ConfirmPasswordConfig from './views/Config/ConfirmPassword';
import ProfileComponent from './views/Config/ProfileComponent';
import ProfileEdit from './views/Config/ProfileEdit';
import NotificationsComponent from './views/Config/NotificationsComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from './assets/style/Colors';
import LogoHeader from './Components/LogoHeader/LogoHeader';

//React navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//importar state de context
import RouteContext from './context/RouteContext';
import TokenServices from './services/token/TokenServices';
import PinConfigServices from './services/pin-config/PinConfigServices';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const [token, setToken] = useState();
  const headerStyle = {
    backgroundColor: '#3f51b5',
  };
  const {route, setRoute} = useContext(RouteContext);
  useEffect(() => {
    const tokenGet = TokenServices.getToken();
    setToken(tokenGet);
    TokenServices.token.attach((value) => {
      setToken({...value});
    });
    return () => {
      TokenServices.token.detach(setToken);
    };
  }, []);
  const DocumentsStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Documentos"
        screenOptions={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#3f51b5',
          },
        }}>
        <Stack.Screen
          options={{
            title: <ScreenHeader fontIcon="faFileAlt" title="Documentos" />,
            headerRight: () => <NotificationBell />,
          }}
          name="Documentos">
          {(props) => <DocumentsDashboard {...props} />}
        </Stack.Screen>
        <Stack.Screen
          options={{
            title: (
              <View>
                <Text style={styles.subtitleText}>Documentos</Text>
                <Text style={styles.titleText}>/Pendientes de firma</Text>
              </View>
            ),
            headerRight: () => <NotificationBell />,
          }}
          name="DocumentsNotSigned"
          component={DocumentsNotSigned}
        />
        <Stack.Screen
          options={{
            title: (
              <View>
                <Text style={styles.subtitleText}>Documentos</Text>
                <Text style={styles.titleText}>/Firmados</Text>
              </View>
            ),
            headerRight: () => <NotificationBell />,
          }}
          name="DocumentsSigned"
          component={DocumentsSigned}
        />
        <Stack.Screen
          component={DocumentViewer}
          options={({route}) => ({
            title: route.params.otherParam,
            headerRight: () => <NotificationBell />,
          })}
          name="DocumentViewer"
        />
        <Stack.Screen
          component={PinConfirmation}
          options={({route}) => ({
            title: 'Firmar',
            headerRight: () => <NotificationBell />,
          })}
          name="PinConfirmation"
        />
        <Stack.Screen
          component={DisconformitySign}
          options={({route}) => ({
            title: 'Firmar disconforme',
            headerRight: () => <NotificationBell />,
          })}
          name="DisconformitySign"
        />
      </Stack.Navigator>
    );
  };
  const ConfigStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Config"
        screenOptions={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#3f51b5',
          },
        }}>
        <Stack.Screen
          options={{
            title: <ScreenHeader fontIcon="faCog" title="Configuración" />,
            headerRight: () => <NotificationBell />,
          }}
          name="Config"
          component={ConfigComponent}
        />
        <Stack.Screen
          options={{
            title: (
              <View>
                <Text style={styles.subtitleText}>Configuración</Text>
                <Text style={styles.titleText}>/Ayuda</Text>
              </View>
            ),
            headerRight: () => <NotificationBell />,
          }}
          name="Help"
          component={HelpComponent}
        />
        <Stack.Screen
          options={{
            title: (
              <View>
                <Text style={styles.subtitleText}>Configuración</Text>
                <Text style={styles.titleText}>/Credenciales</Text>
              </View>
            ),
            headerRight: () => <NotificationBell />,
          }}
          name="Credentials"
          component={CredentialsComponent}
        />
        <Stack.Screen
          options={{
            title: (
              <View>
                <Text style={styles.subtitleText}>Credenciales</Text>
                <Text style={styles.titleText}>/Contraseña</Text>
              </View>
            ),
            headerRight: () => <NotificationBell />,
          }}
          name="PasswordConfig"
          component={PasswordConfig}
        />
        <Stack.Screen
          options={{
            title: (
              <View>
                <Text style={styles.subtitleText}>Configuración</Text>
                <Text style={styles.titleText}>/Perfil</Text>
              </View>
            ),
            headerRight: () => <NotificationBell />,
          }}
          name="Profile"
          component={ProfileComponent}
        />
        <Stack.Screen
          options={{
            title: (
              <View>
                <Text style={styles.subtitleText}>Perfil</Text>
                <Text style={styles.titleText}>/Editar</Text>
              </View>
            ),
            headerRight: () => <NotificationBell />,
          }}
          name="ProfileEdit"
          component={ProfileEdit}
        />
        <Stack.Screen
          options={{
            title: (
              <View>
                <Text style={styles.subtitleText}>Configuración</Text>
                <Text style={styles.titleText}>/Notificaciones</Text>
              </View>
            ),
            headerRight: () => <NotificationBell />,
          }}
          name="Notifications"
          component={NotificationsComponent}
        />
        <Stack.Screen
          component={PinConfigConfig}
          options={({route}) => ({
            title: 'Configurar PIN',
            headerTitleAlign: 'center',
          })}
          name="PinConfig"
        />
        <Stack.Screen
          component={SetPinConfig}
          options={({route}) => ({
            title: 'Configurar PIN',
            headerTitleAlign: 'center',
          })}
          name="SetPin"
        />
        <Stack.Screen
          component={ConfirmPasswordConfig}
          options={({route}) => ({
            title: 'Confirmar contraseña',
            headerTitleAlign: 'center',
          })}
          name="ConfirmPassword"
        />
      </Stack.Navigator>
    );
  };
  const LogInStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTintColor: Colors.text,
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}>
        <Stack.Screen
          component={Login}
          options={({route}) => ({
            title: <LogoHeader />,
            headerTitleAlign: 'center',
          })}
          name="Login"
        />
        <Stack.Screen
          component={ForgotPassword}
          options={({route}) => ({
            title: 'Olvidé mi contraseña',
            headerTitleAlign: 'center',
          })}
          name="ForgotPassword"
        />
        <Stack.Screen
          component={PinConfig}
          options={({route}) => ({
            title: 'Configurar PIN',
            headerTitleAlign: 'center',
          })}
          name="PinConfig"
        />
        <Stack.Screen
          component={SetPin}
          options={({route}) => ({
            title: 'Configurar PIN',
            headerTitleAlign: 'center',
          })}
          name="SetPin"
        />
        <Stack.Screen
          component={ConfirmPassword}
          options={({route}) => ({
            title: 'Confirmar contraseña',
            headerTitleAlign: 'center',
          })}
          name="ConfirmPassword"
        />
        <Stack.Screen
          options={({route}) => ({
            title: <LogoHeader />,
            headerTitleAlign: 'center',
          })}
          name="Password">
          {(props) => <PasswordLogin {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  };
  const mainNavigation = () => {
    return (
      <Tab.Navigator
        initialRouteName={'Documents'}
        tabBar={() => null}
        backBehavior={'initialRoute'}>
        <Tab.Screen name="Documents" component={DocumentsStack} />
        <Tab.Screen name="Config" component={ConfigStack} />
      </Tab.Navigator>
    );
  };
  return (
    <>
      <NavigationContainer>
        {token == null || token == '' || !PinConfigServices.canActivate()
          ? LogInStack()
          : mainNavigation()}
      </NavigationContainer>
    </>
  );
};
const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: 'white',
    fontSize: 14,
  },
});

export default Navigation;
