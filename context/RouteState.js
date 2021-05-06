import React, {useReducer, useState} from 'react';
import RouteReducer from './RouteReducer';
import RouteContext from './RouteContext';

const RouteState = (props) => {
  //crear state inicial

  const initialState = {
    route: false,
  };
  const [route, setRoute] = useState('documents');

  //useReducer con dispatch para ejectuar las funciones
  const [state, dispatch] = useReducer(RouteReducer, initialState);
  const mostrarConsola = () => {};
  return (
    <RouteContext.Provider
      value={{
        route: state.route,
        setRoute: setRoute,
        route: route,
        mostrarConsola,
      }}>
      {props.children}
    </RouteContext.Provider>
  );
};

export default RouteState;
