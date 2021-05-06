import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform, Alert, PermissionsAndroid} from 'react-native';
import ProcedureServices from '../../services/procedure/ProcedureServices'
import PhotoView from 'react-native-photo-view-ex'; 
import RNFetchBlob from 'rn-fetch-blob';
import config from '../../config/env/environment';
import SessionService from '../../services/session/SessionService';
import Share from 'react-native-share'

export interface Props{
  navigation:any,
  route:any
  setDocuments:any
}

const DocumentViewer: React.FC<Props> = ({route, navigation}) => {
  const {itemId, otherParam,processDefinitionIdentificator,signed} = route.params;
  const [uri, setUri] = useState('');
  const [hasDisconformity, setHasDisconformity] = useState(false);
  const signHandler = (conformity:boolean) => {
    if(conformity){
      navigation.navigate('PinConfirmation', {
        itemId: itemId,
        documentType: otherParam,
        conformity: conformity?'true':'false',
      });
    }else{
      navigation.navigate('DisconformitySign', {
        itemId: itemId,
        documentType: otherParam,
        conformity: conformity?'true':'false',
        processDefinitionIdentificator:processDefinitionIdentificator
      });
    }
  };
  
  const onShare = async ()=>{
    const type = 'application/pdf' 
    const currentUser = SessionService.getCurrentUser()
    const fileUrl = `${config.baseUrl}/api/document-downloads/${itemId[0]}?token=${currentUser.token}`;
    if(Platform.OS === 'ios'){
    let filePath = null;
    let file_url_length = fileUrl.length;
    const dirs = RNFetchBlob.fs.dirs.DocumentDir
    const configOptions = {
      fileCache: true,
      path:dirs + `/${otherParam}.pdf`
    };
    RNFetchBlob.config(configOptions)
      .fetch('GET', fileUrl)
      .then(async resp => {
        filePath = resp.path();
        let options = {
          type: type,
          url: filePath, // (Platform.OS === 'android' ? 'file://' + filePath)
          title:'Compartir documento',
          message:'Compartir'
        };
        await Share.open(options);
        // remove the image or pdf from device's storage
        // await RNFS.unlink(filePath);
    });

    }else{
    let filePath:any = null;
    let file_url_length = fileUrl.length;
    const configOptions = { fileCache: true };
    RNFetchBlob.config(configOptions)
    .fetch('GET', fileUrl)
    .then(resp => {
      filePath = resp.path();
      return resp.readFile('base64');
    })
    .then(async base64Data => {
      base64Data = `data:${type};base64,` + base64Data;
      await Share.open({ url: base64Data, title:'Compartir documento', message:'Compartir' });
      // remove the image or pdf from device's storage
      // await RNFS.unlink(filePath);
    });
    }
  }
  useEffect(()=>{
    let isMounted = true
    async function initEnvelopes(){
      const res = await ProcedureServices.getImageUrl(itemId,true)
      let respDisconformityValues
      if(!signed){
        respDisconformityValues = await ProcedureServices.getPropertyOfProcessDefinition(processDefinitionIdentificator)
      }
      if(isMounted){
        if(!signed && respDisconformityValues.data.data[0]){
         setHasDisconformity(true)   
        }
        setUri(res)
      }
    }
    initEnvelopes()
    return () => {
      isMounted = false;
    };
    
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.documentViewerContainer}>
        {uri===''?null:
          <PhotoView
              style={{ flex: 1, width: '100%', height: '100%' }}
              source={{ uri: uri }} // you can supply any URL as well
              minimumZoomScale={1} // max value can be 1
              maximumZoomScale={5} // max value can be 3
          />
        }
      </View>
      <View style={styles.buttonContainer}>
      {hasDisconformity?
        <TouchableOpacity
          style={styles.buttonDisconformity}
          onPress={() => {
            signHandler(false);
          }}>
          <Text style={styles.textDisconformity}>Firma</Text>
          <Text style={styles.textDisconformity}>Disconforme</Text>
        </TouchableOpacity>
           :null 
          }
          {!signed ?
        <TouchableOpacity
          style={styles.buttonConformity}
          onPress={() => {
            signHandler(true);
          }}>
          <Text style={styles.textConformity}>Firma</Text>
          <Text style={styles.textConformity}>Conforme</Text>
        </TouchableOpacity>
        :null}
        {signed ?
        <TouchableOpacity
          style={styles.buttonDownload}
          onPress={() => {
            onShare();
          }}>
          <Text style={styles.textConformity}>DESCARGAR</Text>
        </TouchableOpacity>
        :null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  },
  documentViewerContainer: {
    backgroundColor: 'white',
    flexGrow: 1,
    alignItems:'center'
  },
  container: {flexGrow:1},
  buttonDisconformity: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#ece8f8',
    height: 70,
    padding: 10,
  },
  buttonConformity: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    height: 70,
    padding: 10,
  },
  textDisconformity: {
    color: '#3f51b5',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    margin: 0,
  },
  textConformity: {
    color: '#fff',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    margin: 0,
  },
  buttonDownload: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    height: 50,
    padding: 10,
  },
  
});

export default DocumentViewer;
