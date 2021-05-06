import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import SessionService from '../../services/session/SessionService';
import ProcedureServices from '../../services/procedure/ProcedureServices'
import { Picker } from '@react-native-community/picker';
import SpinnerComponent from '../../Components/Spinner/Spinner.component';



export interface Props{
  navigation:any,
  route:any
}

const DisconformitySign : React.FC<Props> = ({route,navigation}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const {itemId,conformity,processDefinitionIdentificator}=route.params
    // const [showSpinner, setShowSpinner] = useState(false);
    const [reason, setReason]:any = useState('');
    const [reasonDescription, setReasonDescription] = useState('');
    const [propertyIdDisconformity, setPropertyIdDisconformity] = useState('');
    const [disconformityValues, setDisconformityValues]:any = useState([]);
    const [allowDescription, setAllowDescription] = useState(false);
    useEffect(()=>{
      let isMounted = true;
      async function initDisconformitySign() {
        const user = await SessionService.getTokenInformation()
        if(user.data.account.accountState !== "ACTIVO"){
            Alert.alert('Cuenta Inactiva', 'Tu cuenta se encuentra inactiva.', [
            
                {text: 'Confirmar', onPress: () => navigation.navigate('Documentos')},
              ]);
        }
        const respDisconformityValues = await ProcedureServices.getPropertyOfProcessDefinition(processDefinitionIdentificator)
        setDisconformityValues(respDisconformityValues.data.included)
        setPropertyIdDisconformity(respDisconformityValues.data.data[0].id)
        setAllowDescription(respDisconformityValues.data.data[0].attributes.allowsDescription)
        setIsLoaded(true)
      }
      initDisconformitySign();
      return () => {
        isMounted = false;
      }; 
    },[])
    
      const handlePicker = (data:any)=>{
        setReason(data)
      }
      const signHandler = (conformity:boolean) => {
        navigation.navigate('PinConfirmation', {
          itemId: itemId,
          propertyIdDisconformity: propertyIdDisconformity,
          conformity: 'false',
          reason: reason,
          reasonDescription:reasonDescription
        });
      };

      const checkInput = ()=>{
        if(allowDescription && reason !== '' && reasonDescription !=='' && reasonDescription.length > 10){
          return true
        }else if ( !allowDescription && reason !== ''){
          return true
        }else{
          return false
        }
      }
  
  return (
    <>
    {!isLoaded ?
    <SpinnerComponent size={100}/>
  :
  <ScrollView>
    <View style={styles.container}>
      <View style={{width:'100%'}}>
        <Text>Selecciona un motivo</Text>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
        selectedValue={reason}
        style={styles.picker}
        onValueChange={(itemValue) => handlePicker(itemValue)}
        >
          <Picker.Item key={''} label={'Seleccione un motivo'} value={''} />

        {disconformityValues.map((discValue: any)=>{
          return(
            <Picker.Item key={discValue.id} label={discValue.attributes.value} value={discValue} />
          )
        })}
        </Picker>
      </View>
      {allowDescription?
      <View style={{width:'100%'}}>
          <Text>Ingresar una descripción</Text>
          <TextInput
                  onChangeText={(text)=>{
                      setReasonDescription(text)
                  }} 
                  value={reasonDescription}
                  maxLength={140}
                  style={styles.inputDescription}
                  textAlignVertical={'top'}
                  editable={reason !== ''}
                  multiline={true}
          />
      </View>
      :
      null}
    </View>
  </ScrollView>
    }
    {checkInput()?
    <View>
        <TouchableOpacity
          style={styles.buttonConformity}
          onPress={() => {
            signHandler(true);
          }}>
          <Text style={styles.textConformity}>SIGUIENTE</Text>
        </TouchableOpacity>
    </View>
  :null}
    </>
  );
};
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    alignItems:'center'
  },
  pickerContainer:{
    borderWidth:1,
    borderColor:'grey',
    width:'100%',
    marginTop:10, 
    marginBottom:20
  },
  picker:{
    width:'100%',
    color:'#747474'

  },
  inputDescription:{
      width:'100%',
      height:150,
      backgroundColor:'white',
      borderWidth:1,
      borderColor:'grey',
      marginTop:10
  },
  buttonConformity: {
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    height: 60,
    padding: 10,
    justifyContent:'center'
  },
  textConformity: {
    color: '#fff',
    fontSize: 20,
    // flex: 1,
    flexWrap: 'wrap',
    margin: 0,
  },
});

export default DisconformitySign;
