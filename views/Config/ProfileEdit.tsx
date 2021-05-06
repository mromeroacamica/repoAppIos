import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView, ActivityIndicator, TextInput, Alert} from 'react-native';
import TokenServices from '../../services/token/TokenServices';
import AccountServices from '../../services/account/AccountServices';
import { Colors } from '../../assets/style/Colors';
import SessionService from '../../services/session/SessionService';
import { Picker } from '@react-native-community/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Utils } from '../../Shared/Utils';



export interface Props{
  navigation:any,
  setDocuments:Function
}

const ProfileEdit: React.FC<Props> = ({navigation, setDocuments}) => {
  // Constantes
  const SIN_DEFINIR = 'Sin definir';
  const [initLoaded, setInitLoaded] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [token, setToken]:any = useState('');
  const [genders, setGenders]:Array<any>=useState([]);
  const [accountGender, setAccountGender]:any = useState('');
  const [accountPhone, setAccountPhone]:any = useState('');
  const [accountAltEmail, setAccountAltEmail]:any = useState('')
  const [accountDateBirth, setAccountDateBirth]:any = useState ('')
  useEffect(()=>{
    getGenders()
  },[])

  useEffect(() => {
    let isMounted = true;
    async function initEnvelopes() {
      const token = TokenServices.getToken();
    setToken(token);
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
        setAccountPhone(resp2.data.data.attributes.phone)
    } else {
      token.account.phone = SIN_DEFINIR;
      setAccountPhone('')
    }

    // Legajo
    if (!resp2.data.data.attributes.legajo) {
      token.account.legajo = SIN_DEFINIR;
    }

    // Genero
    if (resp2.data.data.relationships.gender.data != null) {
      token.account.genderId = resp2.data.data.relationships.gender.data.id;
      const gender:any = genders.filter((gender: { id: any; })=>gender.id===resp2.data.data.relationships.gender.data.id)
      if(gender != null){
        // token.account.genderName = gender[0].name;
        setAccountGender(gender[0])
      }
    } else {
      token.account.genderName = SIN_DEFINIR;
      token.account.genderId = '';
      setAccountGender('')
    }
    // Correo Alternativo
    if (resp.data.account.alternativeEmail !== null || token.account.alternativeEmail !== '') {
      setAccountAltEmail(resp.data.account.alternativeEmail)
    }else{
      token.account.alternativeEmail = SIN_DEFINIR;
    }

    // token.account.employeeSince = Utils.normalizeDate(token.account.employeeSince);
    // token.account.birthdate = Utils.normalizeDate(token.account.birthdate);

    // Ajustar el offset del timestamp
    if (resp2.data.data.attributes.birthdate != null) {
      token.account.birthdate = new Date(resp2.data.data.attributes.birthdate);
      token.account.birthdate= Utils.getDateFormat({date:token.account.birthdate,format:'D/M/Y'})
      setAccountDateBirth(token.account.birthdate)
    }else{
      token.account.birthdate = SIN_DEFINIR
    }
    if (resp2.data.data.attributes.employeeSince != null) {
      token.account.employeeSince = SIN_DEFINIR;
      // token.account.employeeSince = new Date(token.account.employeeSince);
      // token.account.employeeSince =Utils.getDateFormat({date:token.account.employeeSince,format:'Y/M/D'})
    }else{
      token.account.employeeSince = SIN_DEFINIR
    }
    token.account.unit = resp.data.unit
    setToken(token)
  }
  const handlePicker = (data:any)=>{
    setAccountGender(data)
  }
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = (date:any) => {
    const opciones = {
      year: 'numeric',
      month: 'numeric',
      day: '2-digit',
    };
    setAccountDateBirth(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };
  const navigateTo = (screen:string) => {
    navigation.navigate(screen);
  };
  const validatePhone = ()=>{
    const regexPhone = /^(\+\(?\d{1,3}\)?\s\d{1,3}\s)?[0-9\-\s]{3,4}[\s\-]?\d{6,7}$/g;
    if (accountPhone.match(regexPhone) == null) {
      Alert.alert('Editar teléfono', 'El formato del teléfono es incorrecto,\n Ej: +54 9 351 4921234', [
        {text: 'OK', onPress: () => console.log('close')},
      ]);
      return false;
    }else{
      return true
    }
  }
  const validateEmail = ()=>{
    const regexEmail = /\w(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (accountAltEmail.match(regexEmail) == null) {
      Alert.alert('Editar correo', 'El formato del correo es incorrecto', [
        {text: 'OK', onPress: () => console.log('close')},
      ]);
      return false;
    }else{
      return true
    }
  }
  const updateAccount = async ()=>{
    setInitLoaded(false)
    const payload = {
      birthdate:null,
      phone:null,
      alternativeEmail:null
    }
    if(accountPhone !== ''){
      if(!validatePhone()){
        setInitLoaded(true)
        return
      }
      payload.phone = accountPhone
    }
    if(accountAltEmail !== ''){
      if(!validateEmail()){
        setInitLoaded(true)
        return
      }
      payload.alternativeEmail = accountAltEmail
    }
    if(accountDateBirth !== ''){
      const date:any = new Date(accountDateBirth)
      payload.birthdate = date
    }

    const res = await AccountServices.updateMyAccount(token.account.id,payload,accountGender.id)
    if (res.status === 200) {
      Alert.alert('Editar perfil', 'Se ha editado el perfil correctamente.', [
        {text: 'Confirmar', onPress: () => navigateTo('Config')},
      ]); 
    } else {
      Alert.alert('Editar perfil', 'No se ha editado el perfil correctamente.', [
        {text: 'Confirmar', onPress: () => navigateTo('Profile')},
      ]);
    }
    setInitLoaded(true)
  }
  return (
    <>
        {initLoaded?
        <View style={styles.profileContainer}>
          <ScrollView style={styles.scrollProfile}>
            <View style={{padding:10}}>
              <Text>Género</Text>
              {accountGender !== ''?
                <View style={styles.pickerContainer}>
                    <Picker
                    selectedValue={accountGender}
                    style={styles.picker}
                    onValueChange={(itemValue) => handlePicker(itemValue)}
                    >
                    {genders.map((gender: any)=>{
                    return(
                        <Picker.Item key={gender.id} label={gender.name} value={gender} />
                    )
                    })}
                    </Picker>
                </View>
            :null}
                <Text style={styles.label}>Teléfono</Text>
                <TextInput
                    style={styles.phoneInput}
                    keyboardType={'phone-pad'}
                    onChangeText={(text) => {
                        setAccountPhone(text)
                    }}
                    
                    value={accountPhone}
                />
                <Text style={styles.label}>Correo alternativo</Text>
                <TextInput
                    style={styles.phoneInput}
                    keyboardType={'email-address'}
                    onChangeText={(text) => {
                      setAccountAltEmail(text)
                    }}
                    
                    value={accountAltEmail}
                />
                <Text style={styles.label}>Fecha nacimiento</Text>
                <View style={styles.datePicker}>
                  <TouchableOpacity onPress={showDatePicker}>
                    <Text>{accountDateBirth !==''? accountDateBirth : 'Seleccionar fecha'}</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={confirmarFecha}
                  onCancel={hideDatePicker}
                  locale="es_ES"
                  headerTextIOS="Elige una Fecha"
                  cancelTextIOS="Cancelar"
                  confirmTextIOS="Confirmar"
                />
            </View>
          </ScrollView>
          <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%', marginTop:10}}>
                <View style={styles.cancelButton}>
                    <TouchableOpacity onPress={()=>navigateTo('Profile')}>
                            <Text>CANCELAR</Text>
                    </TouchableOpacity>
                </View>
            <View style={styles.acceptButton}>
                <TouchableOpacity onPress={()=>updateAccount()}>
                        <Text>ACEPTAR</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
      :
        <View style={{flex:1, justifyContent:'center'}}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      }
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
  pickerContainer:{
    borderWidth:1,
    borderColor:'grey',
    width:'100%',
    marginTop:10, 
    marginBottom:20,
    borderRadius:5
  },
  picker:{
    width:'100%',
    color:'#747474'
  },
  phoneInput:{
    borderWidth:1,
    borderColor:'grey',
    height:48,
    marginBottom:20,
    borderRadius:5,
    padding:10
  },
  datePicker:{
    height:48,
    borderWidth:1,
    borderColor:'grey',
    justifyContent:'center',
    padding:10,
    borderRadius:5
  },
  cancelButton:{
    alignItems:'center',
    justifyContent:'center',
    height:40,
    width:'50%'
},
acceptButton:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Colors.primary,
    height:40,
    width:'50%',
    borderRadius:5
},
label:{
  marginBottom:10
}
});

export default ProfileEdit;
