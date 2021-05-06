import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView,TouchableOpacity, ActivityIndicator} from 'react-native';
import ContainerScreen from '../../Components/Container/Container';
import RoundImage from '../../Components/RoundImage/RoundImage';
import TokenServices from '../../services/token/TokenServices';
import AccountServices from '../../services/account/AccountServices';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../../assets/style/Colors';
import SessionService from '../../services/session/SessionService';
import { Utils } from '../../Shared/Utils';


export interface Props{
  navigation:any,
  setDocuments:Function
}

const ProfileComponent: React.FC<Props> = ({navigation, setDocuments}) => {
  // Constantes
  const SIN_DEFINIR = 'Sin definir';
  const [initLoaded, setInitLoaded] = useState(false);
  const [token, setToken]:any = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [initials, setInitials] = useState('');
  const [genders, setGenders]:Array<any>=useState([]);
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      getGenders()

    })
  },[])

  useEffect(() => {
    let isMounted = true;
    async function initEnvelopes() {
      const token = TokenServices.getToken();
    setToken(token);
    setInitials(
      token.account.lastName.slice(0, 1) + token.account.firstName.slice(0, 1),
    );
    setPhotoUrl(AccountServices.getAccountPhotoURL(token.account.id,64));
    
    await getUserInformation()
      if (isMounted) {
        setInitLoaded(true);
      }
    }
    initEnvelopes();
    return () => {
      isMounted = false;
    };
    
  }, [genders]);
  const getGenders=async()=> {
    const gendersResponse = await AccountServices.getAllGenders();
    const gendersMap = gendersResponse.data.data.map((gender:any) => {
      return { id: gender.id, name: gender.attributes.name };
    });
    setGenders(gendersMap)
  }
  const getUserInformation =async()=> {
    const token = TokenServices.getToken();
    const resp = await SessionService.getTokenInformation();
    const resp2 = await AccountServices.getAccount(token.account.id)
    if (resp.status !== 200 || resp2.status !==200 ) {
      navigation.navigate('Config')
    }

    // Telefono
    if (resp2.data.data.attributes.phone != null) {
      token.account.phone = resp2.data.data.attributes.phone
    } else {
      token.account.phone = SIN_DEFINIR;
    }

    // Legajo
    if (!resp2.data.data.attributes.legajo) {
      token.account.legajo = SIN_DEFINIR;
    }

    // Genero
    if (resp2.data.data.relationships.gender.data != null) {
      token.account.genderId = resp2.data.data.relationships.gender.data.id;
      const gender:any = genders.filter((gender: { id: any; })=>gender.id===resp2.data.data.relationships.gender.data.id)
      if(gender !== null){
        token.account.genderName = gender[0].name;
      }
    } else {
      token.account.genderName = SIN_DEFINIR;
      token.account.genderId = '';
    }

    // Correo Alternativo
    if (resp.data.account.alternativeEmail !== null || token.account.alternativeEmail !== '') {
    token.account.alternativeEmail = resp.data.account.alternativeEmail
    }else{
      token.account.alternativeEmail = SIN_DEFINIR;
    }

    // Ajustar el offset del timestamp
    if (resp2.data.data.attributes.birthdate != null) {
      token.account.birthdate = new Date(resp2.data.data.attributes.birthdate);
      token.account.birthdate= Utils.getDateFormat({date:token.account.birthdate,format:'Y/M/D'})
    }else{
      token.account.birthdate = SIN_DEFINIR
    }
    if (resp2.data.data.attributes.employeeSince != null) {
      token.account.employeeSince = new Date(resp2.data.data.attributes.employeeSince);
      token.account.employeeSince= Utils.getDateFormat({date:token.account.employeeSince,format:'Y/M/D'})
    }else{
      token.account.employeeSince = SIN_DEFINIR
    }
    token.account.unit = resp.data.unit
    setToken(token)
  }
  return (
    <>
      <ContainerScreen navigation={navigation} setDocuments={setDocuments}>
        {initLoaded?
        <View style={styles.profileContainer}>
          <ScrollView style={styles.scrollProfile}>
            <View style={{padding:10}}>
              <View style={styles.pictureNameIconContainer}>
                <View style={styles.iconTextContainer}>
                    <RoundImage imageUrl={photoUrl} initials={initials} imageSize={64} />
                    {token !== '' && (
                      <Text style={styles.text}>
                        {token.account.firstName} {token.account.lastName}
                      </Text>
                    )}
                </View>
                <View>
                  <TouchableOpacity onPress={()=>navigation.navigate('ProfileEdit')}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={styles.iconStyle}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.personalDataText}>DATOS PERSONALES</Text>
              <Text style={styles.titleText}>Nombre</Text>
              <Text style={styles.bodyText}>{token.account.firstName}</Text>
              <Text style={styles.titleText}>Apellido</Text>
              <Text style={styles.bodyText}>{token.account.lastName}</Text>
              <Text style={styles.titleText}>Género</Text>
              <Text style={styles.bodyText}>{token.account.genderName}</Text>
              <Text style={styles.titleText}>Correo</Text>
              <Text style={styles.bodyText}>{token.account.email}</Text>
              <Text style={styles.titleText}>Fecha de Nacimiento</Text>
              <Text style={styles.bodyText}>{token.account.birthdate}</Text>
              <Text style={styles.titleText}>CUIL</Text>
              <Text style={styles.bodyText}>{token.account.cuilCuit}</Text>
              <Text style={styles.titleText}>Teléfono</Text>
              <Text style={styles.bodyText}>{token.account.phone}</Text>
              <Text style={styles.titleText}>Correo alternativo</Text>
              <Text style={styles.bodyText}>{token.account.alternativeEmail}</Text>
              <Text style={styles.personalDataText}>DATOS LABORALES</Text>
              <Text style={styles.titleText}>Unidad organizacional</Text>
              <Text style={styles.bodyText}>{token.account.unit.name}</Text>
              <Text style={styles.titleText}>Legajo</Text>
              <Text style={styles.bodyText}>{token.account.legajo}</Text>
              <Text style={styles.titleText}>Fecha de ingreso</Text>
              <Text style={styles.bodyText}>{token.account.employeeSince}</Text>
            </View>
          </ScrollView>
        </View>
      :
      <View style={{flex:1, justifyContent:'center'}}>
      <ActivityIndicator size="large" color={Colors.primary} />
      </View>
      }
      </ContainerScreen>
    </>
  );
};
const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    flex: 1,
    paddingTop:30,
    paddingHorizontal:15,
    paddingBottom:8,
  },
  scrollProfile:{
    backgroundColor:'white',
    width:'100%',
    borderRadius: 5,
    
  },
  pictureNameIconContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  titleText: {
    fontSize: 18,
    alignItems: 'flex-start',
    color:'grey'
  },
  bodyText: {
    fontSize:15,
    borderBottomColor:Colors.background,
    borderBottomWidth:2,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 26,
    color: 'grey',
  },
  iconStyle: {
    color: '#3f51b5',
    marginRight: 10,
  },
  personalDataText:{
    marginTop:10,
    color:Colors.primary,
    fontSize:18,
    fontWeight:'bold'
  },
});

export default ProfileComponent;
