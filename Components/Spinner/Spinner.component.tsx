import React, { RefObject, useRef, useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Animated, Easing 
  } from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';


export interface PinInputProps {
    size:number
}
 
const SpinnerComponent: React.FC<PinInputProps> = ({size}) => {
   let spinValue = new Animated.Value(0);

    // First set up animation 
    Animated.timing(
        spinValue,
      {
        toValue: 10,
        duration: 30000,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: true  // To make use of native driver for performance
      }
    ).start()
    
    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
      inputRange: [0, 10],
      outputRange: ['0deg', '3600deg']
    })
    
    return ( 
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Animated.View style={{transform: [{rotate:spin}]}}>
                <FontAwesomeIcon
                icon={faSpinner}
                style={styles.iconStyle}
                size={size}
                
                />
            </Animated.View>
      </View>
     );
}

const styles = StyleSheet.create({
    iconStyle: {
        color: '#3f51b5',
        marginRight: 10,
      },
})
 
export default SpinnerComponent;
