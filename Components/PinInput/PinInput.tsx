import React, { RefObject, useRef, useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Platform,
  } from 'react-native';
import { Colors } from '../../assets/style/Colors';

export interface PinInputProps {
    visiblePassword:boolean
    setPinPassword:any
}
 
const PinInput: React.FC<PinInputProps> = ({visiblePassword,setPinPassword}) => {
    const [first, setFirst]= useState('')
    const [second, setSecond]= useState('')
    const [third, setThrid]= useState('')
    const [fourth, setFourth]= useState('')
    const [firstFocus, setFirstFocus]= useState(false)
    const [secondFocus, setSecondFocus]= useState(false)
    const [thirdFocus, setThirdFocus]= useState(false)
    const [fourthFocus, setFourthFocus]= useState(false)


    const firstInput = useRef<TextInput>(null)
    const secondInput = useRef<TextInput>(null)
    const thirdInput = useRef<TextInput>(null)
    const fourthInput = useRef<TextInput>(null)

    const changeHandler =(text:string,nextInput:RefObject<TextInput>, prevInput:RefObject<TextInput>)=>{
        if(text===''){
        }else{
            
            nextInput.current?.focus()
        }
    }

    useEffect(()=>{
        if(first != '' && second != '' && third !='' && fourth !=''){
            let pin:string =''
            pin = first+second+third+fourth
            setPinPassword(pin)
        }else{
            setPinPassword('')
        }
    },[fourth])


    return ( 
    <View style={styles.inputWrapper}>
        <TextInput
        secureTextEntry={!visiblePassword}
        textAlign={'center'}
        ref={firstInput}
        style={[firstFocus?styles.inputFocus:styles.input,!visiblePassword?styles.notVisiblePassword:styles.visiblePassword]}
        keyboardType={'number-pad'}
        onFocus={()=>setFirstFocus(true)}
        onBlur={()=>setFirstFocus(false)}
        onChangeText={(text) => {
            const cleanNumber = text.replace(/[^0-9]/g, "");
            setFirst(cleanNumber) 
            changeHandler(cleanNumber,secondInput,firstInput)
        }}
        
        value={first}
        maxLength={1}
        />
        <TextInput
        secureTextEntry={!visiblePassword}
        textAlign={'center'}
        ref={secondInput}
          style={[secondFocus?styles.inputFocus:styles.input,!visiblePassword?styles.notVisiblePassword:styles.visiblePassword]}
          keyboardType={'number-pad'}
          onFocus={()=>setSecondFocus(true)}
        onBlur={()=>setSecondFocus(false)}
          onChangeText={(text) => {
            const cleanNumber = text.replace(/[^0-9]/g, "");
            setSecond(cleanNumber);  changeHandler(cleanNumber,thirdInput,firstInput)
        }}
        value={second}
        maxLength={1}
        onKeyPress={({nativeEvent})=>{
            if(nativeEvent.key == 'Backspace'){
                if(second == ''){
                    setFirst('')
                    firstInput.current?.focus()      
                }
            }
        }}
        />
        <TextInput
        secureTextEntry={!visiblePassword}
        textAlign={'center'}
        ref={thirdInput}
          style={[thirdFocus?styles.inputFocus:styles.input,!visiblePassword?styles.notVisiblePassword:styles.visiblePassword]}
          keyboardType={'number-pad'}
          onFocus={()=>setThirdFocus(true)}
        onBlur={()=>setThirdFocus(false)}
          onChangeText={(text) => {
            const cleanNumber = text.replace(/[^0-9]/g, "");
            setThrid(cleanNumber) ; changeHandler(cleanNumber,fourthInput,secondInput)
        }}
        value={third}
        maxLength={1}
        onKeyPress={({nativeEvent})=>{
            if(nativeEvent.key == 'Backspace'){
                if(third==''){
                    setSecond('')
                    secondInput.current?.focus()      
                }
            }
        }}
        />
        <TextInput
        secureTextEntry={!visiblePassword}
        textAlign={'center'}
        ref={fourthInput}
          style={[fourthFocus?styles.inputFocus:styles.input,!visiblePassword?styles.notVisiblePassword:styles.visiblePassword]}
          keyboardType={'number-pad'}
          onFocus={()=>setFourthFocus(true)}
        onBlur={()=>setFourthFocus(false)}
          onChangeText={(text) => {
            const cleanNumber = text.replace(/[^0-9]/g, "");
            setFourth(cleanNumber) ; changeHandler(cleanNumber,fourthInput,thirdInput)
        }}
        value={fourth}
        maxLength={1}
        onKeyPress={({nativeEvent})=>{
            if(nativeEvent.key == 'Backspace'){
                    if(fourth == ''){
                        setThrid('')
                        thirdInput.current?.focus()      
                    }
            }
        }}
        />
    </View>
     );
}

const styles = StyleSheet.create({
    input:{
        marginRight: 10,
        height: Platform.OS === 'ios' ? 65 : 55,
        width: '20%',
        borderColor: '#e1e1e1',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 8,
        marginBottom: 10,
        
    },
    inputFocus:{
        marginRight: 10,
        height: Platform.OS === 'ios' ? 65 : 55,
        width: '20%',
        borderColor: Colors.primary,
        borderWidth: 3,
        borderStyle: 'solid',
        borderRadius: 8,
        marginBottom: 10,
    },
    inputWrapper:{
        flexDirection:'row',
        justifyContent:'center',
        width:'100%'
    },
    notVisiblePassword:{
        color:Colors.primary,
        fontSize:30,
    },
    visiblePassword:{
        fontSize:18,
        color:'black'
    }

})
 
export default PinInput;
