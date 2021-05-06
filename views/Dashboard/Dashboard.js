import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground, Text, Image} from 'react-native';
import ContainerScreen from '../../Components/Container/Container';

const Dashboard = ({navigation, setDocuments}) => {
  return (
    <>
      <ContainerScreen navigation={navigation} setDocuments={setDocuments}>
        <Text>Hola</Text>
      </ContainerScreen>
    </>
  );
};

export default Dashboard;
