import React, {useContext} from 'react';
import {View, StyleSheet, Platform, Text, TouchableOpacity} from 'react-native';
import RouteContext from '../../context/RouteContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFileAlt,
  faCalendarAlt,
  faFileInvoiceDollar,
  faComments,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import {CommonActions} from '@react-navigation/routers';

const ContainerScreen = (props) => {
  const {route, setRoute} = useContext(RouteContext);
  const setDocuments = props.setDocuments;
  const navigateTo = (route) => {
    props.navigation.dispatch(
      CommonActions.reset({index: 0, routes: [{name: route}]}),
    );
  };
  return (
    <>
      <View style={styles.container}>{props.children}</View>
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigateTo('Documents');
          }}
          style={styles.botonSubmit}>
          <View style={styles.iconTextContainer}>
            <FontAwesomeIcon
              icon={faFileAlt}
              style={styles.iconStyle}
              size={22}
            />
            <Text style={styles.text}>Documentos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRoute('licencias')}
          style={styles.botonSubmit}
          disabled={true}>
          <View style={styles.iconTextContainer}>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              style={styles.iconDisableStyle}
              size={22}
            />
            <Text style={styles.text}>Licencias</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRoute('documents')}
          style={styles.botonSubmit}
          disabled={true}>
          <View style={styles.iconTextContainer}>
            <FontAwesomeIcon
              icon={faFileInvoiceDollar}
              style={styles.iconDisableStyle}
              size={22}
            />
            <Text style={styles.text}>Gastos y Viáticos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRoute('documents')}
          style={styles.botonSubmit}
          disabled={true}>
          <View style={styles.iconTextContainer}>
            <FontAwesomeIcon
              icon={faComments}
              style={styles.iconDisableStyle}
              size={22}
            />
            <Text style={styles.text}>Consultas</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigateTo('Config');
          }}
          style={styles.botonSubmit}>
          <View style={styles.iconTextContainer}>
            <FontAwesomeIcon icon={faCog} style={styles.iconStyle} size={22} />
            <Text style={styles.text}>Configuración</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    backgroundColor: '#ece8f8',
  },
  footerContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  iconTextContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    color: '#3f51b5',
  },
  iconDisableStyle: {
    color: '#7b85cc',
  },
  text: {
    color: '#3f51b5',
    fontSize: 10,
  },
});

export default ContainerScreen;
