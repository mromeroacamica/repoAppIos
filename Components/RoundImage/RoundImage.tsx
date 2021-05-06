import React, { useState } from 'react';
import {StyleSheet, View,Text,Image} from 'react-native';

export interface Props{
  initials:string,
  imageUrl?:string,
  imageSize?:number
}

const RoundImage: React.FC<Props> = ({initials, imageUrl,imageSize}) => {
  const [hasImage, setHasImage] = useState(true)
  let imageSizeContainerStyle 
  let imageSizeStyle 
  if(imageSize !== undefined){
    imageSizeContainerStyle={
      height: imageSize+8,
      width: imageSize+8,
    }
    imageSizeStyle={
      height: imageSize,
      width: imageSize,
    }
  }
  return (
    <>
      <View style={[styles.roundImageContainer,imageSizeContainerStyle,!hasImage?styles.borderColor:null]}>
        {hasImage && imageUrl !==''?
        <Image style={[styles.imageStyle,imageSizeStyle]} source={{uri:imageUrl,
        cache:'reload'}} onError={()=>{
        setHasImage(false)}}/>
        :
        <Text style={styles.initialsText}>{initials}</Text>
        }
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  roundImageContainer: {
    height: 55,
    width: 55,
    alignItems:'center',
    justifyContent:'center',
    marginRight:10
  },
  imageStyle:{
    height:48,
    width:48,
    borderRadius:100
  },
  borderColor:{
    borderWidth:3,
    borderColor:'blue',
    borderRadius:100
  },
  initialsText:{
    fontSize:18,
    fontWeight:'bold'
  }
  
});

export default RoundImage;
