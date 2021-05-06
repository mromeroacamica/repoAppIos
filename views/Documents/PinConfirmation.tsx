import { Colors } from '../../assets/style/Colors';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import PinInput from '../../Components/PinInput/PinInput'
import SignServices from '../../services/sign/sign.services'
import SpinnerComponent from '../../Components/Spinner/Spinner.component';
import DocumentsSigned from './DocumentsSigned';


export interface Props{
  navigation:any,
  route:any,
}

const PinConfirmation : React.FC<Props> = ({route,navigation}) => {
  const {itemId,conformity,propertyIdDisconformity,reason,reasonDescription}=route.params
    const [showPin, setShowPin] = useState(false)
    const [pinPassword, setPinPassword] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);
    let documentsSigned = 0; 

    const submitPin=async ()=>{
      setShowSpinner(true)
      const certificate=await SignServices.getCertFile()
      const certPem = await SignServices.getCertPem(pinPassword,certificate)
      if(!certPem){
        Alert.alert('PIN', 'Se ingresó PIN equivocado.', [
          {text: 'OK', onPress: () => setShowSpinner(false)}
        ])
      }
      let documentHash
      let documentHashSigned
      let endSign
      if(certPem){
        for(let item of itemId){
          documentHash = await SignServices.getDocumentHash(item,certPem.pem,conformity,propertyIdDisconformity,reason,reasonDescription,'8192', 'SHA256')
          if (documentHash){
            const documentHashJson = documentHash.json()
            documentHashSigned= await SignServices.signHash(pinPassword,documentHashJson.hash,certificate)
  
            if(documentHashSigned){
              endSign = await SignServices.endSign(item,documentHashSigned,documentHashJson.token)
              documentsSigned ++
            }
          }
        }
        setShowSpinner(false)
        if(documentsSigned>0){
          Alert.alert('Se firmo correctamente', `Se ha firmado correctamente ${documentsSigned} documento${documentsSigned>1?'.':'s.'}`, [
              
            {text: 'OK', onPress: () => navigation.navigate('DocumentsNotSigned')},
          ]);
        }else{
          Alert.alert('Error', 'No se ha firmado correctamente el/los documento/s.', [
              
            {text: 'OK', onPress: () => navigation.navigate('DocumentsNotSigned')},
          ]);
        }
      }
    }

  
  return (
    <>
    {showSpinner?
    <SpinnerComponent size={100}/>
    :
    <View style={styles.login}>
        <Text style={styles.titleText}>Ingresa tu PIN de 4 digitos</Text>
        <View style={styles.inputContainer}>
            <PinInput visiblePassword={showPin} setPinPassword={setPinPassword}/>
            <View style={styles.buttonShowContainer}>
              <TouchableOpacity onPress={()=>setShowPin(!showPin)}>
                <Text style={styles.textShow}>Mostrar</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View>
            <TouchableOpacity
            disabled={pinPassword == ''}
            onPress={() => submitPin()}
            style={[styles.buttonSubmit,pinPassword==''?styles.buttonDisabled:null]}>
            <Text style={styles.textoButtonSubmit}>FIRMAR</Text>
            </TouchableOpacity>
        </View>
    </View>
    }
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
  titleText:{
    fontSize:22,
    color:Colors.text,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:15,
    marginBottom:10
},
  textDetail:{
      fontSize:12,
      textAlign:'center',
      color: Colors.text,
      marginBottom:40
  },
  inputContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
  },
  buttonShowContainer:{
    width:'100%',
    alignItems:'center',
  },
  textShow:{
    color:Colors.primary,
    textAlign:'center'
  },
  
  label: {
    fontSize: 15,
    marginTop: 0,
    marginLeft: 15,
    backgroundColor: 'white',
    padding: 10,
    zIndex: 3,
  },
  
  buttonSubmit: {
    padding: 10,
    height: 45,
    backgroundColor: Colors.primary,
    marginTop: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonDisabled:{
    backgroundColor:'#7b85cc'
  },
  textoButtonSubmit: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  
  
});

export default PinConfirmation;
