import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ContainerScreen from '../../Components/Container/Container';
import CardList from '../../Components/CardList/CardList';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFileAlt, faFileSignature} from '@fortawesome/free-solid-svg-icons';
import ProcedureServices from '../../services/procedure/ProcedureServices';

const DocumentsDashboard = ({navigation, setDocuments}) => {
  const [countNotSigned, setCountNotSigned] = useState(0);
  const navigateTo = (route) => {
    navigation.navigate(route);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      let isMounted = true;
      async function initDocumentDashboard() {
        const count = await ProcedureServices.getTotalProceduresCount();
        if (isMounted && count.status == 200) {
          setCountNotSigned(count.data.total);
        }
      }
      initDocumentDashboard();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <>
      <ContainerScreen navigation={navigation} setDocuments={setDocuments}>
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => navigateTo('DocumentsNotSigned')}>
            <CardList>
              <View style={styles.iconTextContainer}>
                <FontAwesomeIcon
                  icon={faFileAlt}
                  style={styles.iconStyle}
                  size={38}
                />
                <Text style={styles.text}>Pendientes de firma</Text>
              </View>
              <View style={styles.count}>
                <Text style={styles.countText}>{countNotSigned}</Text>
              </View>
            </CardList>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo('DocumentsSigned')}>
            <CardList>
              <View style={styles.iconTextContainer}>
                <FontAwesomeIcon
                  icon={faFileSignature}
                  style={styles.iconStyle2}
                  size={38}
                />
                <Text style={styles.text}>Firmados</Text>
              </View>
            </CardList>
          </TouchableOpacity>
        </View>
      </ContainerScreen>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingTop: 35,
    paddingHorizontal: 12,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    color: '#3f51b5',
    marginRight: 10,
  },
  iconStyle2: {
    color: '#3f51b5',
    marginRight: 10,
    marginLeft: 5,
  },
  text: {
    fontSize: 20,
    color: 'grey',
  },
  count: {
    width: 30,
    height: 30,
    backgroundColor: '#f0ae42',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: 'white',
  },
});

export default DocumentsDashboard;
