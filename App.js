import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native';
import TokenServices from './services/token/TokenServices';
import AppLoader from './config/appLoader/AppLoader';

//importar state de context
import RouteState from './context/RouteState';
import Navigation from './Navigation';

const App = () => {
  const [initLoaded, setInitLoaded] = useState(false);
  useEffect(() => {
    let isMounted = true;
    async function initEnvelopes() {
      const res = await TokenServices.init();
      if (isMounted) {
        setInitLoaded(true);
      }
    }
    initEnvelopes();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {initLoaded ? (
        <RouteState>
          <Navigation />
        </RouteState>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
