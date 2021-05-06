import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Switch} from 'react-native';
import ContainerScreen from '../../Components/Container/Container';
import CardList from '../../Components/CardList/CardList';
import { color } from 'react-native-reanimated';

export interface Props{
  navigation:any,
  setDocuments:Function
}

const NotificationsComponent: React.FC<Props> = ({navigation, setDocuments}) => {
  const [notificationEnable, setNotificationEnable] = useState(true);
  const toggleSwitch = () => setNotificationEnable(!notificationEnable);
  const clickHandler = () => {
  };
  return (
    <>
      <ContainerScreen navigation={navigation} setDocuments={setDocuments}>
        <View style={styles.secondSection}>
          <Text style={styles.title}>Notificaciones de mensajes</Text>
            <CardList propStyles={styles.card}>
              <View style={styles.toogleWrapper}>
                <Text style={styles.text}>Mostrar Notificaciones</Text>
                <Switch
                  trackColor={{false: 'grey', true: '#6BD55C'}}
                  thumbColor='#fff'
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={notificationEnable}
                />
              </View>
            </CardList>
          <TouchableOpacity onPress={() => clickHandler()}>
            <CardList propStyles={styles.card}>
              <View>
                <Text style={styles.text}>Sonidos</Text>
              </View>
            </CardList>
          </TouchableOpacity>
        </View>
      </ContainerScreen>
    </>
  );
};
const styles = StyleSheet.create({
  title:{
    paddingLeft:15,
    fontSize:20,
    color:'#0007',
    marginBottom:10
  },
  toogleWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%'
  },
  secondSection: {
    flex: 1,
    paddingTop: 30,
  },

  text: {
    fontSize: 18,
    color: 'grey',
  },
  card: {
    marginBottom: 0,
  },
});

export default NotificationsComponent;
